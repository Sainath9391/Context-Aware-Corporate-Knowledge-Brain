const SopChunk = require("../models/SopChunk");
const { getEmbedding } = require("../config/embedding");
const { askLLM } = require("../config/ollama");

exports.chat = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question)
      return res.status(400).json({ msg: "Question required" });

    console.time("⏱ Total Chat Time");

    // =========================
    // 1️⃣ Embed question (FAST)
    // =========================
    console.time("Embedding");
    const queryEmbedding = await getEmbedding(question);
    console.timeEnd("Embedding");


    // =========================
    // 2️⃣ Vector Search
    // =========================
    console.time("Vector Search");

    let chunks = await SopChunk.aggregate([
      {
        $vectorSearch: {
          index: "vector_index",
          path: "embedding",
          queryVector: queryEmbedding,
          numCandidates: 30,
          limit: 2
        }
      },
      {
        $project: {
          text: 1,
          source_pdf: 1,
          page: 1
        }
      }
    ]);

    console.timeEnd("Vector Search");


    // =========================
    // 🔥 HYBRID FALLBACK (KEYWORD SEARCH)
    // =========================
    // Fixes short queries like:
    // "Project name?"
    // "Refund policy?"
    // "Leave count?"

    if (!chunks.length) {
      console.log("⚠️ Vector returned 0 → using keyword fallback");

      chunks = await SopChunk.find({
        text: { $regex: question, $options: "i" }
      })
        .limit(2)
        .select("text source_pdf page");
    }


    // =========================
    // 🔒 STRICT SAFETY
    // =========================
    if (!chunks.length) {
      return res.json({
        answer: "I don't know based on the provided SOP documents.",
        sources: []
      });
    }


    // =========================
    // 3️⃣ Build SMALL context
    // =========================
    const context = chunks
      .map(
        (c, i) =>
          `[Source ${i + 1}] (${c.source_pdf} - page ${c.page})\n${c.text.trim()}`
      )
      .join("\n\n");


    // =========================
    // 4️⃣ STRICT GROUNDING PROMPT
    // =========================
    const prompt = `
You are an enterprise SOP assistant.

STRICT RULES:
- Answer ONLY using the given CONTEXT
- answer from related keyword from the provided SOP documents
- Cite like [Source 1]

CONTEXT:
${context}

QUESTION:
${question}

ANSWER:
`;


    // =========================
    // 5️⃣ Ask Ollama (FAST)
    // =========================
    console.time("LLM");
    const answer = await askLLM(prompt);
    console.timeEnd("LLM");

    console.timeEnd("⏱ Total Chat Time");


    res.json({
      answer: answer.trim(),
      sources: chunks
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Chat failed" });
  }
};

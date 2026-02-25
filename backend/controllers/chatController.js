const SopChunk = require("../models/SopChunk");
const { getEmbedding } = require("../config/embedding");
const { askLLM } = require("../config/llm");

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

Return your response STRICTLY in valid JSON format like this:
{
  "interpretation": "",
  "answer": "",
  "documentDetails": {
    "section": "",
    "sourceFile": "",
    "page": ""
  },
  "keywords": [],
  "confidence": 0
}

All fields MUST be filled.
If unknown, use "N/A".


{
  "status": "notfound"
}

CONTEXT:
${context}

QUESTION:
${question}
`;


    // =========================
    // 5️⃣ Ask Ollama (FAST)
    // =========================
    console.time("LLM");
const rawResponse = await askLLM(prompt);

let parsed;

try {
  parsed = JSON.parse(rawResponse);
} catch (e) {
  console.log("⚠️ Failed JSON parse, fallback");

  parsed = {
    interpretation: "Response auto-structured",
    answer: rawResponse,
    documentDetails: {
      section: "Context Extract",
      sourceFile: chunks[0]?.source_pdf || "Unknown File",
      page: chunks[0]?.page || "N/A"
    },
    keywords: [],
    confidence: 60
  };
}
parsed.documentDetails = {
  section:
    parsed.documentDetails?.section || "Context Extract",
  sourceFile:
    parsed.documentDetails?.sourceFile ||
    chunks[0]?.source_pdf ||
    "Unknown File",
  page:
    parsed.documentDetails?.page ||
    chunks[0]?.page ||
    "N/A"
};

parsed.keywords = parsed.keywords || [];
parsed.confidence = parsed.confidence || 80;

console.timeEnd("LLM");

    console.timeEnd("⏱ Total Chat Time");


   if (parsed.status === "notfound") {
  return res.json({
    status: "notfound",
    confidence: 15
  });
}

res.json({
  status: "found",
  interpretation: parsed.interpretation,
  answer: parsed.answer,
  documentDetails: parsed.documentDetails,
  keywords: parsed.keywords || [],
  confidence: parsed.confidence || 80,
  sources: chunks
});

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Chat failed" });
  }
};

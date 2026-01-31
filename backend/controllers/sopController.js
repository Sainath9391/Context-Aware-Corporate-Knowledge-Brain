const SopChunk = require("../models/SopChunk"); // ✅ fixed path
const { extractText, chunkText } = require("../utils/fileProcessor");
const { getEmbedding } = require("../config/embedding");


// =================================================
// UPLOAD FILE (PDF / DOCX / TXT)
// =================================================
exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const text = await extractText(file);
    const chunks = chunkText(text);

    for (let chunk of chunks) {
      const embedding = await getEmbedding(chunk);

      await SopChunk.create({
        text: chunk,
        embedding,
        page: 0,
        source_pdf: file.originalname
      });
    }

    res.json({ msg: "File processed & stored successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Processing failed" });
  }
};



// =================================================
// LIST FILES
// =================================================
exports.listFiles = async (req, res) => {
  try {
    const files = await SopChunk.distinct("source_pdf");
    res.json(files);
  } catch {
    res.status(500).json({ msg: "Failed" });
  }
};



// =================================================
// DELETE FILE
// =================================================
exports.deleteFile = async (req, res) => {
  try {
    await SopChunk.deleteMany({
      source_pdf: req.params.name
    });

    res.json({ msg: "Deleted successfully" });
  } catch {
    res.status(500).json({ msg: "Failed" });
  }
};

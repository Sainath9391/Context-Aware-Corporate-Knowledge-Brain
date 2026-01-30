const SopChunk = require("../models/SopChunk");
const { extractText, chunkText } = require("../utils/pdfProcessor");
const { getEmbedding } = require("../config/embedding");


exports.uploadPDF = async (req, res) => {
  try {
    const file = req.file;

    const text = await extractText(file.buffer);
    const chunks = chunkText(text);

    for (let chunk of chunks) {
      const embedding = await getEmbedding(chunk);

      await SopChunk.create({
        text: chunk,
        embedding,
        page: 0, // improve later
        source_pdf: file.originalname
      });
    }

    res.json({ msg: "PDF processed & stored successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// ================= LIST PDFs =================
exports.listPDFs = async (req, res) => {
  try {
    const pdfs = await SopChunk.aggregate([
      {
        $group: {
          _id: "$source_pdf",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          name: "$_id",
          chunks: "$count",
          _id: 0
        }
      }
    ]);

    res.json(pdfs);

  } catch (err) {
    res.status(500).json(err);
  }
};


// ================= DELETE PDF =================
exports.deletePDF = async (req, res) => {
  try {
    const name = req.params.name;

    await SopChunk.deleteMany({ source_pdf: name });

    res.json({ msg: "Deleted successfully" });

  } catch (err) {
    res.status(500).json(err);
  }
};

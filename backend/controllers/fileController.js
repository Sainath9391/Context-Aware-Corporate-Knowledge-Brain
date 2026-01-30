const SopChunk = require("../models/SopChunk");

exports.getFiles = async (req, res) => {
  try {
    // get unique file names
    const files = await SopChunk.distinct("source_pdf");

    res.json({
      files
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch files" });
  }
};

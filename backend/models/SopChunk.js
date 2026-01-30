const mongoose = require("mongoose");

const sopChunkSchema = new mongoose.Schema({
  text: String,
  embedding: [Number],   // vector
  page: Number,
  source_pdf: String
});

module.exports = mongoose.model("SopChunk", sopChunkSchema);

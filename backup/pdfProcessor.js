const pdf = require("pdf-parse");   // <- simple

exports.extractText = async (buffer) => {
  const data = await pdf(buffer);
  return data.text;
};

exports.chunkText = (text, size = 1000, overlap = 100) => {
  const chunks = [];

  for (let i = 0; i < text.length; i += size - overlap) {
    chunks.push(text.slice(i, i + size));
  }
console.log(text.slice(0, 1000));

  return chunks;
};

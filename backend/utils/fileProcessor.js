const pdf = require("pdf-parse");
const mammoth = require("mammoth");
const XLSX = require("xlsx");


// =================================================
// TEXT EXTRACTOR (Universal)
// Supports: PDF, DOCX, TXT, CSV, XLS, XLSX
// =================================================
exports.extractText = async (file) => {
  const type = file.mimetype;

  // ================= PDF =================
  if (type === "application/pdf") {
    const data = await pdf(file.buffer);
    return data.text;
  }


  // ================= DOCX =================
  if (
    type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({
      buffer: file.buffer
    });
    return result.value;
  }


  // ================= TXT =================
  if (type === "text/plain") {
    return file.buffer.toString();
  }


  // ================= CSV =================
  // CSV is plain text → simplest
  if (
    type === "text/csv" ||
    type === "application/csv"
  ) {
    return file.buffer.toString();
  }


  // ================= XLS / XLSX =================
  // parse spreadsheet → convert rows to text
  if (
    type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || // xlsx
    type === "application/vnd.ms-excel" // xls
  ) {
    const workbook = XLSX.read(file.buffer, { type: "buffer" });

    let text = "";

    workbook.SheetNames.forEach((name) => {
      const sheet = workbook.Sheets[name];

      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      rows.forEach((row) => {
        text += row.join(" ") + "\n";
      });
    });

    return text;
  }


  // ================= UNSUPPORTED =================
  throw new Error(`Unsupported file type: ${type}`);
};



// =================================================
// CHUNKER (for embeddings)
// =================================================
exports.chunkText = (text, size = 1000, overlap = 100) => {
  const chunks = [];

  for (let i = 0; i < text.length; i += size - overlap) {
    chunks.push(text.slice(i, i + size));
  }

  return chunks;
};

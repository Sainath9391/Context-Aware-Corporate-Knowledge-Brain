import { useEffect, useState } from "react";
import Card from "../../components/Card";
import {
  uploadPDF,
  listPDFs,
  deletePDF
} from "../../services/sopApi";

export default function PdfManager() {
  const [file, setFile] = useState(null);
  const [pdfs, setPdfs] = useState([]);
  const [search, setSearch] = useState("");

  const loadPDFs = async () => {
    const data = await listPDFs();
    setPdfs(data);
  };

  useEffect(() => {
    loadPDFs();
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    await uploadPDF(file);
    setFile(null);
    loadPDFs();
  };

  const handleDelete = async (name) => {
    await deletePDF(name);
    loadPDFs();
  };

  const filtered = pdfs.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="workspace">

      <h2 className="workspace-title">Admin Control Panel ⚙️</h2>

      {/* Upload Card */}
      <Card title="Upload SOP PDF">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={handleUpload}>Upload</button>
      </Card>


      {/* List Card */}
      <Card title={
        <>Stored PDFs <span className="badge">{pdfs.length}</span></>
      }>

        <input
          placeholder="Search pdf..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: 12 }}
        />

        <ul className="pdf-list">
          {filtered.map((p, i) => (
            <li key={i}>
              <span>{p.name}</span>
              <button onClick={() => handleDelete(p.name)}>
                Delete
              </button>
            </li>
          ))}
        </ul>

      </Card>

    </div>
  );
}

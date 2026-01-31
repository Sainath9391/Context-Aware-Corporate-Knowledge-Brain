import { useEffect, useState } from "react";
import Card from "../../components/Card";
import {
  uploadFile,
  getFiles
} from "../../services/chatApi";

export default function PdfManager() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // Load files
  // =========================
  const loadFiles = async () => {
    try {
      const data = await getFiles();
      setFiles(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  // =========================
  // Upload file
  // =========================
  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);

      await uploadFile(file);

      setFile(null);
      loadFiles();

      alert("Uploaded successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Delete file
  // =========================
  const handleDelete = async (name) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5000/api/files/${name}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      loadFiles();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = files.filter((f) =>
    f.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="workspace">

      <h2 className="workspace-title">Admin Control Panel ⚙️</h2>

      {/* ================= Upload Card ================= */}
      <Card title="Upload SOP File">

        <input
          type="file"
          accept=".pdf,.docx,.txt,.xls,.xlsx,.csv"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>

      </Card>


      {/* ================= List Card ================= */}
      <Card
        title={
          <>Stored Files <span className="badge">{files.length}</span></>
        }
      >

        <input
          placeholder="Search file..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: 12 }}
        />

        <ul className="pdf-list">
          {filtered.map((name, i) => (
            <li key={i}>
              <span>📄 {name}</span>
              <button onClick={() => handleDelete(name)}>
                Delete
              </button>
            </li>
          ))}
        </ul>

      </Card>

    </div>
  );
}

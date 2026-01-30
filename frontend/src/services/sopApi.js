const BASE = "http://localhost:5000/api/sop";

const token = () => localStorage.getItem("token");

export const uploadPDF = async (file) => {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${BASE}/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token()}` },
    body: form
  });

  return res.json();
};

export const listPDFs = async () => {
  const res = await fetch(`${BASE}/list`, {
    headers: { Authorization: `Bearer ${token()}` }
  });

  return res.json();
};

export const deletePDF = async (name) => {
  const res = await fetch(`${BASE}/${name}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token()}` }
  });

  return res.json();
};

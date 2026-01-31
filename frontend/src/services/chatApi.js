const API = "http://localhost:5000/api";

const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}${url}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options.headers
    }
  });

  if (!res.ok) throw new Error("API failed");

  return res.json();
};

export const getFiles = () => authFetch("/files");

export const askChat = (question) =>
  authFetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });

export const uploadFile = async (file) => {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch("http://localhost:5000/api/upload", {  // 🔥 hardcoded
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: form
  });

  if (!res.ok) throw new Error("Upload failed");

  return res.json();
};


//{
  /*}
const API = "http://localhost:5000/api";

const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  console.log("TOKEN BEING SENT:", token); // debug

  const res = await fetch(`${API}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
 //  REQUIRED
      ...options.headers,
    },
  });

  if (!res.ok) {
    const txt = await res.text();
    console.error("API ERROR:", txt);
    throw new Error("Request failed");
  }

  return res.json();
};

// ================= FILES =================
export const getFiles = () => authFetch("/files");

// ================= CHAT =================
export const askChat = (question) =>
  authFetch("/chat", {
    method: "POST",
    body: JSON.stringify({ question }),
  });
*/
//}
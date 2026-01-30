const API = "http://localhost:5000/api";

const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  console.log("TOKEN BEING SENT:", token); // debug

  const res = await fetch(`${API}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
 // 🔥 REQUIRED
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

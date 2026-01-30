const API_BASE = "http://localhost:5000/api";

// ================= COMMON FETCH =================
const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!res.ok) throw new Error("Request failed");

  return res.json();
};

// ================= AUTH =================
export const signupUser = (data) =>
  authFetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const loginUser = (data) =>
  authFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

// ================= FILES =================
export const getFiles = () =>
  authFetch("/files");

export const deleteFile = (id) =>
  authFetch(`/files/${id}`, {
    method: "DELETE",
  });

// ================= CHAT =================
export const askChat = (question) =>
  authFetch("/chat", {
    method: "POST",
    body: JSON.stringify({ question }),
  });

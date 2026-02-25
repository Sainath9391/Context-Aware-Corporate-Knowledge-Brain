const fetch = require("node-fetch");

// Detect environment
const USE_CLOUDFLARE = process.env.USE_CLOUDFLARE === "true";


// ================= OLLAMA (LOCAL) =================
const askOllama = async (prompt) => {
  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3",
      prompt,
      stream: false
    })
  });

  const data = await res.json();
  return data.response;
};


// ================= CLOUDFLARE AI =================
const askCloudflare = async (prompt) => {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CF_API_TOKEN}`
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are a corporate SOP assistant." },
          { role: "user", content: prompt }
        ]
      })
    }
  );

  const data = await res.json();

  return data.result.response;
};


// ================= EXPORT =================
exports.askLLM = async (prompt) => {
  if (USE_CLOUDFLARE) {
    console.log("🌍 Using Cloudflare AI");
    return askCloudflare(prompt);
  } else {
    console.log("🖥 Using Local Ollama");
    return askOllama(prompt);
  }
};
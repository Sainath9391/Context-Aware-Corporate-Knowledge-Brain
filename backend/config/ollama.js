const { Ollama } = require("ollama");

const ollama = new Ollama({
  host: "http://127.0.0.1:11434"
});

exports.askLLM = async (prompt) => {
  const response = await ollama.chat({
    model: "tinyllama",   // 🔥 ULTRA FAST
    messages: [
      { role: "user", content: prompt }
    ],
    options: {
      temperature: 0.1,
      num_predict: 120,   // 🔥 smaller output = faster
    }
  });

  return response.message.content;
};

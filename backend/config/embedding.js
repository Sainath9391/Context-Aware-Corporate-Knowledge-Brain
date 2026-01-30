// ✅ PURE LOCAL EMBEDDING (NO API, NO LIMITS)

let embedder = null;

async function loadModel() {
  if (!embedder) {
    const { pipeline } = await import("@xenova/transformers");

    embedder = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );

    console.log("✅ Local embedding model loaded");
  }
}

exports.getEmbedding = async (text) => {
  await loadModel();

  const output = await embedder(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
};

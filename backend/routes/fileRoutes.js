const router = require("express").Router();
const auth = require("../middleware/auth");
const SopChunk = require("../models/SopChunk");

router.get("/", auth, async (req, res) => {

  try {
    const files = await SopChunk.distinct("source_pdf");
    res.json(files);
  } catch {
    res.status(500).json({ msg: "Failed" });
  }
});

module.exports = router;

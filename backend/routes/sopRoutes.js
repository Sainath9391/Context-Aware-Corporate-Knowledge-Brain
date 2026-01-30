const router = require("express").Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const {
  uploadPDF,
  listPDFs,
  deletePDF
} = require("../controllers/sopController");

router.post("/upload", auth, upload.single("file"), uploadPDF);

router.get("/list", auth, listPDFs);

router.delete("/:name", auth, deletePDF);


module.exports = router;

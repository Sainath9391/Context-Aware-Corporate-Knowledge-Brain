const router = require("express").Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  uploadFile,
  listFiles,
  deleteFile
} = require("../controllers/sopController");

// 🔥 ADD THIS (missing route)
router.post("/upload", auth, upload.single("file"), uploadFile);

// existing routes
router.get("/files", auth, listFiles);
router.delete("/files/:name", auth, deleteFile);

module.exports = router;

//
//{
  /*
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
  */
 //}
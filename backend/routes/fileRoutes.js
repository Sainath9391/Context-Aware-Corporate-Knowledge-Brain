 const router = require("express").Router();
const auth = require("../middleware/auth");
const { listFiles, deleteFile } = require("../controllers/sopController");

router.get("/files", auth, listFiles);
router.delete("/files/:name", auth, deleteFile);

module.exports = router;
   
//  {
      /* const router = require("express").Router();
const multer = require("multer");
const auth = require("../middleware/auth");

const {
  uploadFile,
  listFiles,
  deleteFile
} = require("../controllers/sopController");

const upload = multer();

// GET files
router.get("/files", auth, listFiles);

// UPLOAD
router.post("/upload", auth, upload.single("file"), uploadFile);

// DELETE
router.delete("/files/:name", auth, deleteFile);

module.exports = router;
*/
//}
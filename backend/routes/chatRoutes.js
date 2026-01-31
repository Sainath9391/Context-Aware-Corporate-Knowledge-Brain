const router = require("express").Router();
const auth = require("../middleware/auth");
const { chat } = require("../controllers/chatController");

router.post("/chat", auth, chat);

module.exports = router;

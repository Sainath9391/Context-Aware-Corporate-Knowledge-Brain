const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const sopRoutes = require("./routes/sopRoutes"); // upload
const fileRoutes = require("./routes/fileRoutes"); // files list
const chatRoutes = require("./routes/chatRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(console.error);


// 🔥 ONE PREFIX ONLY
app.use("/api/auth", authRoutes);
app.use("/api", sopRoutes);
app.use("/api", fileRoutes);
app.use("/api", chatRoutes);


app.listen(process.env.PORT || 5000, () =>
  console.log(`🚀 Server running on ${process.env.PORT || 5000}`)
);

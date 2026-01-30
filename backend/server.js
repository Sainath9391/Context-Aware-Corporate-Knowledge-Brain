const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const sopRoutes = require("./routes/sopRoutes");
const chatRoutes = require("./routes/chatRoutes");
const fileRoutes = require("./routes/fileRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());


// ✅ CONNECT FIRST
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));


// ✅ ROUTES (clean paths)
app.use("/api/auth", authRoutes);
app.use("/api/sop", sopRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/chat", chatRoutes);


app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on ${process.env.PORT}`)
);

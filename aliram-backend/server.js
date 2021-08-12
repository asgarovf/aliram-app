const express = require("express");
const app = express();
const cors = require("cors");
const postRouter = require("./routes/posts");
const commentRouter = require("./routes/comments");
const connectDB = require("./utils/db");
app.use(cors());
app.use(express.json());

const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

require("dotenv").config();

connectDB();

app.use("/api/posts/", postRouter);
app.use("/api/comments/", commentRouter);

server.listen(5000, () => {
  console.log("SERVER RUNNING AT 5000");
});

io.on("connection", (socket) => {
  console.log("User connected " + socket.id);

  socket.on("message", (data) => {
    socket.broadcast.emit("message", data);
  });

  socket.on("post", (data) => {
    socket.broadcast.emit("post", data);
  });
});

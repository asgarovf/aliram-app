const express = require("express");
const app = express();
const cors = require("cors");
const postRouter = require("./routes/posts");

app.use(cors());

app.use("/api/posts/", postRouter);

app.listen(5000, () => {
  console.log("SERVER RUNNING AT 5000");
});

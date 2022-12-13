const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { postRouter } = require("./routes/post.route");
const { authentication } = require("./middlewares/auth");
require("dotenv").config();

const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello authentication!");
});

// user routes
app.use("/user", userRouter);

app.use("/posts",authentication, postRouter);


app.listen(port, async () => {
  try {
    await connection;
    console.log(`Listning on port http://localhost:${port}`);
  } catch (error) {
    console.log("Server not connected.");
  }
});

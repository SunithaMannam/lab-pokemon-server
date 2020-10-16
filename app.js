require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");



//Router definition
const indexRouter = require("./routes/index.route");
const userRouter = require("./routes/user.route");
const pokemonRouter = require("./routes/pokemon.route");

require("./configs/db.config");
const app = express();
// CORS configuration
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
  }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/pokemon", pokemonRouter);

module.exports = app;

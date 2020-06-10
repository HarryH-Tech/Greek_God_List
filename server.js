const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
require("dotenv").config();
const path = require("path");

// Express Routes
const godRoutes = require("./routes/god");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

//DB Connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//   })
//   .then(() => console.log("DB Connected"));

mongoose
  .connect(process.env.MONGODB_URI || process.env.MONGO_URI)
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

const app = express();

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(expressValidator());

app.use(express.static(path.join(__dirname, "client", "build")));

//routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", godRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// PORT
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

// app.use(function (error, req, res, next) {
//   console.error(error.message);
//   if (!error.statusCode) error.statusCode = 500;
//   res.status(error.statusCode).send(error.message);
// });

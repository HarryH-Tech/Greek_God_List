let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
require("dotenv").config();

const userRoutes = require("./routes/user");

// Express Route
const godRoute = require("./routes/god.route");

//  DB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

const app = express();

//routes middleware
app.use("/api", userRoutes);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/gods", godRoute);

// PORT
const port = 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

// 404 Error
// app.use((req, res, next) => {
//   next(createError(404));
// });

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

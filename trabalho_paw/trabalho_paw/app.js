var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyparser = require("body-parser");
var cors = require("cors");
var multer  = require('multer');


var mongoose = require("mongoose");

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var patrimoniosRouter = require("./routes/patrimonios");
var patrimonioEmployeeRouter = require("./routes/patrimonioEmployee");
var eventsRouter = require("./routes/events");
var eventsEmployeeRouter = require("./routes/eventsEmployee");
var ticketsRouter = require("./routes/tickets");
var ticketsEmployeeRouter = require("./routes/ticketsEmployee");

/// REST routes ///
var patrimoniosRESTRouter = require("./routes/patrimoniosREST");
var eventsRESTRouter = require("./routes/eventsREST");
var ticketsRESTRouter = require("./routes/ticketsREST");
var usersRESTRouter = require("./routes/usersREST");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });


const { log } = require("console");

mongoose
  .connect("mongodb+srv://paw:pawpaw12345@cluster0.t2hfbcw.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => console.log("Connected Successfully"))

  .catch((err) => {
    console.error(err);
  });

var app = express();

app.use(upload.single('file'));

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/tmp",express.static("./tmp"));

app.use("/", indexRouter);
app.use("/login", usersRouter);

app.use("/events", eventsRouter);
app.use("/eventsEmployee", eventsEmployeeRouter);
app.use("/patrimonios", patrimoniosRouter);
app.use("/patrimonioEmployee", patrimonioEmployeeRouter);
app.use("/tickets", ticketsRouter);
app.use("/ticketsEmployee", ticketsEmployeeRouter);

/// ROTAS PARA A REST API ///
app.use("/api/v1/patrimonios", patrimoniosRESTRouter);
app.use("/api/v1/events", eventsRESTRouter);
app.use("/api/v1/tickets", ticketsRESTRouter);
app.use("/api/v1/auth", usersRESTRouter);
app.use('/api/v1/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

console.log("Listening in http://localhost:3000/");

module.exports = app;

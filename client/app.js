var createError = require("http-errors");
var express = require("express");
const Handlebars = require("express-handlebars");
var path = require("path");
var logger = require("morgan");
const sassMiddleware = require("node-sass-middleware");
var mainrouter = require("./routes/index");

var app = express();
app.engine(
  "hbs",
  Handlebars.engine({
    layoutsDir: path.join(__dirname, "/views/layouts"),
    partialsDir: path.join(__dirname, "/views/partials"),
    extname: "hbs",
    helpers: {
      json: function (context) {
        return JSON.stringify(context).replace(/"/g, "&quot;");
      },
    },
  })
);

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "hbs");

app.use(logger("dev"));

app.use(
  sassMiddleware({
    src: path.join(__dirname, "/scss"),
    dest: path.join(__dirname, "/public"),
    debug: true,
    outputStyle: "compressed",
  })
);

app.use(
  "/stylesheet",
  express.static(path.join(__dirname, "/public/stylesheet"))
);
app.use("/assets", express.static(path.join(__dirname, "../static/images")));
app.use("/scripts", express.static(path.join(__dirname, "/scripts")));

app.use("", mainrouter);

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

module.exports = app;

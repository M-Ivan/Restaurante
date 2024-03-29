const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const config = require("./config");
const cors = require("cors");
const app = express();

app.use(cors());

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const dishRouter = require("./routes/dishRouter");
const promoRouter = require("./routes/promoRouter");
const leaderRouter = require("./routes/leaderRouter");
const uploadRouter = require("./routes/uploadRouter");
const commentRouter = require("./routes/commentRouter");
const favoriteRouter = require("./routes/favoritesRouter");

const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URL ||
    "mongodb+srv://m-ivan:password123Ivan@reactstaurante.5zs8w.mongodb.net/reactstaurant?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

//app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
//app.use(express.static(path.join(path.resolve(), "/frontend/build")));
//app.get("*", (req, res) =>
//  res.sendFile(path.join(path.resolve(), "frontend", "build", "index.html"))
//);

// Secure traffic only
// app.all("*", (req, res, next) => {
//  if (req.secure) {
//    return next();
//  } else {
//    res.redirect(
//      307,
//      "https://" + req.hostname + ":" + app.get("secPort") + req.url
//    );
//  }
//});}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser('12345-67890-09876-54321'));

app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/api/users", usersRouter);

app.use("/api/dishes", dishRouter);
app.use("/api/promotions", promoRouter);
app.use("/api/leaders", leaderRouter);
app.use("/api/uploads", uploadRouter);
app.use("/api/favorites", favoriteRouter);
app.use("/api/comments", commentRouter);

const directory = path.resolve();
// URL FIXER
app.use(
  "/backend/uploads",
  express.static(path.join(directory, "/backend/uploads"))
);

// Esto es lo que permite "fusionar" (alojar en la misma URL)
// al server con el cliente, lo que deja con las rutas
// /api/ a todo lo que es backend.
// Se encuentra deshabilitado porque se espera que esto se
// descargue para correr localmente, pero si se quiere simular
// un deploy real solo es necesario borrar los // de abajo.

// app.use(express.static(path.join(directory, "/frontend/build")));
//     app.get("*", (req, res) =>
//    res.sendFile(path.join(directory, "/frontend/build/index.html"))
//    );

// 404
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // set locals
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Pagina de error
  res.status(err.status || 500);
  res.render("error");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.use(
    "/backend/uploads",
    express.static(path.join(directory, "/backend/uploads"))
  );
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Servidor en puerto", port);
  console.log("Rutas en dir", directory);
});

module.exports = app;

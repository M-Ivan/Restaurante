var express = require("express");
const bodyParser = require("body-parser");
const User = require("../models/user");
var passport = require("passport");
const authenticate = require("../authenticate");
const cors = require("cors");

var router = express.Router();
router.use(bodyParser.json());

//Allows the admin to see all the registered users
router.options("*", (req, res) => {
  res.sendStatus(200);
});
router.get(
  "/",
  // cors.corsWithOptions,
  //# Desactivado por problemas dificiles
  //  De debugear y que no vienen al caso
  //  para la finalidad del proyecto #
  //  Usamos cors(); en reemplazo

  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    User.find({})
      .then(
        (users) => {
          res.statusCode = 200;
          res.json(users);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  }
);

router.post("/signup", (req, res, next) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        if (req.body.firstname) user.firstname = req.body.firstname;
        if (req.body.lastname) user.lastname = req.body.lastname;
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({ err: err });
            return;
          }
          passport.authenticate("local")(req, res, () => {
            var token = authenticate.getToken({ _id: req.user._id });
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({
              success: true,
              status: "Registration Successful!",
              token: token,
            });
          });
        });
      }
    }
  );
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      res.json({ success: false, status: "Error al logear", err: info });
    }
    req.logIn(user, (err) => {
      if (err) {
        res.statusCode = 401;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: false,
          status: "Error al logear",
          err: "No se pudo logear al usuario",
        });
      }

      var token = authenticate.getToken({ _id: req.user._id });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        admin: req.user.admin,
        success: true,
        status: "Inicio de sesión exitoso",
        token: token,
      });
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    var err = new Error("No has iniciado sesión!");
    err.status = 403;
    next(err);
  }
});

router.get(
  "/facebook/token",
  passport.authenticate("facebook-token"),
  (req, res) => {
    if (req.user) {
      var token = authenticate.getToken({ _id: req.user._id });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        token: token,
        status: "Te logeaste correctamente",
      });
    }
  }
);

router.get("/checkJWTToken", (req, res) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      return res.json({ status: "JWT invalid!", success: false, err: info });
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.json({ status: "JWT valid!", success: true, user: user });
    }
  })(req, res);
});

module.exports = router;

const multer = require("multer");
const express = require("express");
const authenticate = require("../authenticate");
const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "backend/uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("You can upload only image files"), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter: imageFileFilter });

// Handler de prueba para la URL
uploadRouter.get("/", (req, res, next) => {
  res.statusCode = 403;
  res.end("GET No se soporta en /api/uploads");
});

uploadRouter.post(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  upload.single("image"),
  (req, res) => {
    res.send(`/${req.file.path}`);
  }
);

module.exports = uploadRouter;

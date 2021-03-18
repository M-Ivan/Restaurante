const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authenticate = require("../authenticate");
const Dishes = require("../models/dishes");
const cors = require("cors");
const expressAsyncHandler = require("express-async-handler");

const dishRouter = express.Router();

dishRouter.use(cors());
dishRouter.use(bodyParser.json());

dishRouter
  .route("/")
  .options((req, res) => {
    res.sendStatus(200);
  })

  .get(
    expressAsyncHandler(async (req, res, next) => {
      const dishes = await Dishes.find(req.query).populate("comments.author");
      if (dishes) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.send(dishes);
      } else {
        res.status(404).send({ message: "No hay platos" });
      }
    })
  );

dishRouter.post(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  expressAsyncHandler(async (req, res) => {
    const dish = new Dishes({
      name: "ejemplo " + Date.now(),
      image: "/public/images/uploadImage.png",
      price: 0,
      category: "category",
      description: "descripcion",
      featured: false,
    });
    const createdDish = await dish.save();
    res.send({ message: "Plato creado", dish: createdDish });
  })
);

dishRouter.delete(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    Dishes.deleteMany({})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");

          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  }
);

dishRouter.route("/:id").options((req, res) => {
  res.sendStatus(200);
});

dishRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const dish = await Dishes.findById(req.params.id).populate(
      "comments.author"
    );
    if (dish) {
      res.send(dish);
    } else {
      res.status(404).send({ message: "Plato no encontrado" });
    }
  })
);

dishRouter.post(
  "/:id",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    res.statusCode = 403;
    res.end(
      "POST operation not supported on /dishes/:DishId" + req.params.dishId
    );
  }
);

dishRouter.put(
  "/:id",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  expressAsyncHandler(async (req, res) => {
    const dish = await Dishes.findById(req.params.id);
    if (dish) {
      dish.name = req.body.name;
      dish.price = req.body.price;
      dish.image = req.body.image;
      dish.category = req.body.category;
      dish.label = req.body.brand;
      dish.description = req.body.description;
      const updatedDish = await dish.save();
      res.send({ message: "Plato actualizado", dish: updatedDish });
    } else {
      res.status(404).send({ message: "Plato no encontrado" });
    }
  })
);

// .delete(
//   authenticate.verifyUser,
//   authenticate.verifyAdmin,
//   (req, res, next) => {
//     Dishes.findByIdAndDelete(req.params.dishId)
//      .then(
//         (resp) => {
//           res.statusCode = 200;
//           res.setHeader("Content-Type", "application/json");
//
//           res.json(resp);
//         },
//         (err) => next(err)
//       )
//       .catch((err) => next(err));
//   }
// );
dishRouter.delete(
  "/:id",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  expressAsyncHandler(async (req, res) => {
    const dish = await Dishes.findById(req.params.id);
    if (dish) {
      const deleteDish = await dish.remove();
      res.send({ message: "Plato eliminado", dish: deleteDish });
    } else {
      res.status(404).send({ message: "Plato no encontrado" });
    }
  })
);
module.exports = dishRouter;

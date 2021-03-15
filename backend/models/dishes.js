const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);

var dishSchema = new Schema(
  {
    name: {
      type: String,
      default: Date.now(),
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
    },
    label: {
      type: String,
    },
    price: {
      type: Number,
      min: 0,
      default: null,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

var Dishes = mongoose.model("Dish", dishSchema);

module.exports = Dishes;

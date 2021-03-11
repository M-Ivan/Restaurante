const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

var dishSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    price: {
      type: Currency,
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

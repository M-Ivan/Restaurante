//IMPORTING MODULES
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;



//DEFINING THE SCHEMA
var promoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

//CONVERTING THE SCHEMA TO A VARIABLE TROUGHT THE model() METHOD
var Promotions = mongoose.model("Promotions", promoSchema);


//EXPORTING THE VAR
module.exports = Promotions;
//IMPORTING MODULES
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


//DEFINING THE SCHEMA
var leadersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false
    }
});



//CONVERTING THE SCHEMA TO A VARIABLE TROUGHT THE model() METHOD
var Leaders = mongoose.model("leaders", leadersSchema);


//EXPORTING THE VAR
module.exports = Leaders;
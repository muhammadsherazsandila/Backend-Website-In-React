const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema({
    productName : String,
    productPrice : Number,
    panelColor : String,
    textColor : String,
    productPic : Buffer
})

module.exports = mongoose.model("product" , workoutSchema);
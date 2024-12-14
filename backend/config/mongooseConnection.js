const mongoose = require("mongoose");
const debug = require("debug")("developement : mongoose");
require("dotenv").config();
mongoose.connect(`${process.env.DB_URI}`)
.then(()=>{
    debug("Conected To MongoDB")
})
.catch((error)=>{
    debug("Failed To Connect To MongoDb" , error)
})

module.exports = mongoose.connection
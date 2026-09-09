const mongoose = require("mongoose");

const weatherSchema= new 
mongoose.Schema({
    city:String,
    temperature:Number,
    humidity:Number,
    description:String
});

const Weather = mongoose.model("weather",weatherSchema);

module.exports =Weather;
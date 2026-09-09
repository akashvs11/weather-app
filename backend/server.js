require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Weather = require("./models/weather");
const cors = require("cors");
const app = express();
app.use(cors());
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB is connected"))
.catch((err)=>console.log("mongoDB connection error:",err));
app.listen(5000);

const apiKey = process.env.API_KEY;



app.get("/weather",async(req,res)=>{
    const city = req.query.city;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

const response = await fetch(url);
const data = await response.json();
if(!response.ok || Number (data.cod)!==200){
    return res.status(response.ok ? 404:response.status).json({
        message:"AREA NOT FOUND"
    });
}
await Weather.create({
    city:data.name,
    temperature:data.main.temp,
    humidity:data.main.humidity,
    description:data.weather[0].description


})
res.json(data)
});
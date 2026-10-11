import { useState } from 'react'

import './App.css'


function App() {

  const [city, setcity] = useState("");
  const [weather,setweather] = useState(null);
  const [error,seterrror] = useState("");
  
     
 
  const searchWeather = async()=>{
seterrror("")

const response=
      await fetch(`https://weather-app-ec5v.onrender.com/weather?city=${city}`)
      const data = await response.json();
      console.log(response.ok,response.status,data);
      if(!response.ok){
        seterrror(data.message);
        setweather(null);
        return;
      }
      setweather(data)
    
  }
  const backgrounds = {
    Clear :"/clear.jpeg",
    Clouds: "/cloudy.jpeg",
    Rain:"/rainy.jpeg",
    Thunderstorm: "/storm.jpeg",
    Snow:"/cloudy.jpeg"
  }
const background = weather ? backgrounds[weather.weather[0].main]:"/sunny.jpeg";
  return (
    <div className="app" 
    style={{backgroundImage: `url(${background})`}}>
    <input value={city} onChange={(e)=>setcity(e.target.value)}/>
    <button onClick={searchWeather}>search</button>
    {error && <p>{error}</p>}
    {weather &&
    <div className='weather-card'>
    <h1>{weather.main.temp}`C</h1>
    {weather &&<h2>"{weather.name}"</h2>}
    {weather &&<h2>{weather.weather[0].description}</h2>}
    <p>humidity:
      {weather?.main?.humidity}%
    </p>
    <p>wind speed: {weather?.wind?.speed}</p>
    <p>feels: {weather?.main?.feels_like}`C</p>
    <p>visiblity: {weather?.visibility/1000}km</p>
    <p>rain possibility: {weather?.rain?.["1h"]|| 0}</p>
    <p>sunrise: {weather?.sys?.sunrise?new Date(weather.sys.sunrise * 1000).toLocaleTimeString():"N/A"}</p>
      <p>sunset: {weather?.sys?.sunset?new Date(weather.sys.sunset * 1000).toLocaleTimeString():"N/A"}</p>
</div>}
    </div>
  )
}

export default App

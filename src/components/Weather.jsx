import React, { useEffect, useState, useRef } from "react";
import search from "../Assets/search.png";
import cloud from "../Assets/cloud.png";
import clear from "../Assets/clear.png";
import drizzle from "../Assets/drizzle.png";
import humidity from "../Assets/humidity.png";
import rain from "../Assets/rain.png";
import snow from "../Assets/snow.png";
import wind from "../Assets/wind.png";
import "./Weather.css";

import { motion } from "framer-motion";
function Weather() {
  const API_KEY = process.env.API_KEY;
  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();
  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "010d": snow,
    "010n": snow,
    "013d": wind,
    "013n": wind,
  };

  async function fetchAPI(city) {
    if (city === "") {
      alert("enter a city name");
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&&units=metric&appid=${API_KEY}`;
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      const icon = allIcons[result.weather[0].icon] || clear;
      setWeatherData({
        humidity: result.main.humidity,
        windSpeed: result.wind.speed,
        temp: Math.floor(result.main.temp),
        place: result.name,
        icon: icon,
      });
    } catch (error) {
      console.log(error, "there is an error  Enter a city name");
    }
  }
  useEffect(() => {
    fetchAPI();
  }, []);
  const searchWeatherData = () => {
    fetchAPI(inputRef.current.value);
  };

  return (
    <div className="weather">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="search-bar"
      >
        <input ref={inputRef} type="text" placeholder="search" />
        <img onClick={searchWeatherData} src={search} />
      </motion.div>

      {weatherData ? (
        <motion.div whileHover={{ scale: 0.9 }} whileTap={{ scale: 1.1 }}>
          <img src={weatherData.icon} className="weather-icon" />
          <p className="temp"> {weatherData.temp} °C</p>
          <p className="place">{weatherData.place}</p>
        </motion.div>
      ) : (
        <></>
      )}
      <div></div>
      <div className="weather-list">
        <div className="weather-data">
          <img src={wind} />
          <p>{weatherData.windSpeed}</p>
          <span>windSpeed</span>
        </div>

        <div className="weather-data">
          <img src={humidity} />
          <p>{weatherData.humidity}</p>
          <span>humidity</span>
        </div>
      </div>
    </div>
  );
}

export default Weather;

import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import "./Weather.css";
import WeatherInfo from "./WeatherInfo";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  const loading = useRef(false);

  function handleResponse(response) {
    loading.current = false;

    setWeatherData({
      ready: true,
      temperature: Math.round(response.data.main.temp),
      city: response.data.name,
      wind: Math.round(response.data.wind.speed * 3.6),
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      date: new Date(response.data.dt * 1000),
      iconUrl: "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function search() {
    loading.current = true;
    const apiKey = "f8c936db9cec49b0a939c31814fb3e34";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  useEffect(() => {}, [props.defaultCity]);

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city"
                className="form-control"
                autoFocus="on"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>
        <WeatherInfo weatherData={weatherData} />
      </div>
    );
  } else {
    if (!loading.current) {
      search();
    }
  }
  return "Loading";
}

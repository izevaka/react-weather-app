import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Weather.css";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({
    ready: false,
    loading: false,
  });
  const [city, setCity] = useState(props.defaultCity);
  const apiKey = "f8c936db9cec49b0a939c31814fb3e34";
  const units = "metric";

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      loading: false,
      temperature: response.data.main.temp,
      city: response.data.name,
      wind: Math.round(response.data.wind.speed * 3.6),
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      date: new Date(response.data.dt * 1000),
      feelsLike: Math.round(response.data.main.feels_like),
      iconUrl: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      icon: response.data.weather[0].icon,
      coordinates: response.data.coord,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function search() {
    setWeatherData({
      ready: false,
      loading: true,
    });

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
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
        <WeatherInfo data={weatherData} />
        <WeatherForecast
          coords={weatherData.coordinates}
          units={units}
          apiKey={apiKey}
        />
      </div>
    );
  } else {
    if (!weatherData.loading) {
      search();
    }
  }
  return "Loading";
}

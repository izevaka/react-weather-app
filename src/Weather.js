import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import "./Weather.css";
import FormattedDate from "./FormattedDate";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
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

  useEffect(() => {
    if (!loading.current) {
      loading.current = true;
      const apiKey = "f8c936db9cec49b0a939c31814fb3e34";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.defaultCity}&appid=${apiKey}&units=metric`;
      axios.get(apiUrl).then(handleResponse);
    }
  }, [props.defaultCity]);

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city"
                className="form-control"
                autoFocus="on"
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
        <h1>{weatherData.city}</h1>
        <ul>
          <li>
            <FormattedDate date={weatherData.date} />
          </li>
          <li className="text-capitalize">{weatherData.description}</li>
        </ul>
        <div className="row mt-3">
          <div className="col-6 temp-unit">
            <img alt="cloudy" src={weatherData.iconUrl}></img>{" "}
            <span className="temperature">{weatherData.temperature}</span>
            <span className="unit">°C</span>
          </div>
          <div className="col-6">
            <ul>
              <li>Humidiy: {weatherData.humidity}%</li>
              <li>Wind: {weatherData.wind} km/h</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  return "Loading";
}

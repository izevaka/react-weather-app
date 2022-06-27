import WeatherIcon from "./WeatherIcon";
import "./WeatherForecast.css";
import axios from "axios";
import { useState } from "react";

export default function WeatherForecast(props) {
  const lat = props.coordinates.lat;
  const lon = props.coordinates.lon;
  const [forecast, setForecast] = useState([]);

  function handleResponse(response) {
    console.log(response.data);
    setForecast([]);
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${props.apiKey}&units=${props.units}`;
  // axios.get(apiUrl).then(handleResponse);
  console.log("weather forecast render");

  return (
    <div className="WeatherForecast">
      <div className="row">
        {forecast.map((day, index) => {
          return (
            <div className="col">
              <div className="day">Thu </div>
              <WeatherIcon code="01d" />
              <div className="temperatures">
                <span className="max">19°</span>
                <span className="min">10°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

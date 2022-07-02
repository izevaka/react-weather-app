import { useState, useEffect } from "react";
import WeatherForecastDay from "./WeatherForecastDay";
import "./WeatherForecast.css";
import axios from "axios";

export default function WeatherForecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  function handleResponse(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }

  useEffect(() => {
    setLoaded(false);
  }, [props.coords]);

  if (loaded) {
    return (
      <div className="WeatherForecast">
        <div className="row mt-3">
          {forecast.slice(1, 7).map((day, index) => {
            return (
              <div key={index} className="col">
                <WeatherForecastDay data={day} />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    let apiKey = props.apiKey;
    let longitude = props.coords.lon;
    let latitude = props.coords.lat;
    let units = props.units;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(handleResponse);

    return null;
  }
}

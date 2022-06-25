import FormattedDate from "./FormattedDate";

export default function WeatherInfo(props) {
  return (
    <div className="WeatherInfo">
      <h1>{props.weatherData.city}</h1>
      <ul>
        <li>
          <FormattedDate date={props.weatherData.date} />
        </li>
        <li className="text-capitalize">{props.weatherData.description}</li>
      </ul>
      <div className="row mt-3">
        <div className="col-6 temp-unit">
          <img alt="cloudy" src={props.weatherData.iconUrl}></img>{" "}
          <span className="temperature">{props.weatherData.temperature}</span>
          <span className="unit">°C</span>
        </div>
        <div className="col-6">
          <ul>
            <li>Humidiy: {props.weatherData.humidity}%</li>
            <li>Wind: {props.weatherData.wind} km/h</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

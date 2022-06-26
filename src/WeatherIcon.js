import { AnimatedWeatherIcon } from "animated-weather-icon";
import { useRef, useLayoutEffect } from "react";

export default function WeatherIcon(props) {
  const renderDiv = useRef();

  //Mapping from https://openweathermap.org/weather-conditions#How-to-get-icon-URL
  //To https://www.npmjs.com/package/animated-weather-icon

  useLayoutEffect(() => {
    const codeMapping = {
      "01d": { type: "Clear", time: "Day" },
      "01n": { type: "Clear", time: "Night" },
      "02d": { type: "Broken Clouds", time: "Day" },
      "02n": { type: "Broken Clouds", time: "Night" },
      "03d": { type: "Broken Clouds", time: "Day" },
      "03n": { type: "Broken Clouds", time: "Day" },
      "04d": { type: "Cloudy", time: "Day" },
      "04n": { type: "Cloudy", time: "Night" },
      "09d": { type: "Drizzle Showers", time: "Day" },
      "09n": { type: "Drizzle Showers", time: "Night" },
      "10d": { type: "Rain", time: "Day" },
      "10n": { type: "Rain", time: "Night" },
      "11d": { type: "Thunder Storm", time: "Day" },
      "11n": { type: "Thunder Storm", time: "Night" },
      "13d": { type: "Snow", time: "Day" },
      "13n": { type: "Snow", time: "Night" },
      "50d": { type: "Fog", time: "Day" },
      "50n": { type: "Fog", time: "Night" },
    };
    if (renderDiv.current) {
      console.log("weather code", props.code);
      renderDiv.current.innerHTML = "";
      const icon = new AnimatedWeatherIcon(renderDiv.current);
      const mapping = codeMapping[props.code];
      icon.setType(mapping.type, mapping.time);
    }
  }, [props.code]);

  return <span className="icon" ref={renderDiv}></span>;
}

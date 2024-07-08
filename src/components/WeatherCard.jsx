import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Moderate from "../assets/moderate.mp4";
import Heavy from "../assets/heavy rain.mp4";
import Light from "../assets/light.mp4";
import Cloud from "../assets/overcast.mp4";
import Fewer from "../assets/fewer.mp4";
import Scatter from "../assets/scatter.mp4";
import Clear from "../assets/clear.mp4";

const WeatherCard = ({
  Time,
  Temperature,
  Feels,
  Min,
  Max,
  Pressure,
  Humidity,
  Weather,
  Clouds,
  Wind,
  Icon,
}) => {
  const today = new Date().toISOString().slice(0, 10);
  const isToday = Time.includes(today);
  const getWeatherVideo = (weather) => {
    if (weather === "light rain") {
      return Light;
    } else if (weather === "moderate rain") {
      return Moderate;
    } else if (weather === "heavy intensity rain") {
      return Heavy;
    } else if (weather === "overcast clouds") {
      return Cloud;
    } else if (weather === "few clouds") {
      return Fewer;
    } else if (weather === "scattered clouds") {
      return Scatter;
    } else if (weather === "broken clouds") {
      return Scatter;
    } else {
      return Clear;
    }
  };
  const weatherVideo = getWeatherVideo(Weather);

  return (
    <div className="m-2">
      <Card sx={{ minWidth: 350 }}>
        <CardMedia sx={{ height: 140 }}>
          <video
            src={weatherVideo}
            title="Weather"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            autoPlay={isToday}
            loop
          />
        </CardMedia>
        <CardContent>
          <h3 className="julius text-center text-3xl">
            {Math.floor(Temperature - 273)}°C
          </h3>
          <h4 className="julius">
            {Weather.charAt(0).toUpperCase() + Weather.slice(1)}
          </h4>
          <div className="flex flex-col justify-around">
            <div className="flex flex-row justify-around text-xl">
              <h4 className="text-left text-blue-500">
                {Math.floor(Max - 273)}°C
              </h4>
              <h4 className="text-right text-red-500">
                {Math.floor(Min - 273)}°C
              </h4>
            </div>
          </div>
          <table className="w-full">
            <tbody className="w-full">
              <tr>
                <td className="text-left">Feels Like:</td>
                <td className="text-right">{Math.floor(Feels - 273)}°C</td>
              </tr>

              <tr>
                <td className="text-left">Humidity:</td>
                <td className="text-right">{Math.floor(Humidity)}%</td>
              </tr>
              <tr>
                <td className="text-left">Clouds:</td>
                <td className="text-right">{Clouds}%</td>
              </tr>
              <tr>
                <td className="text-left">Wind:</td>
                <td className="text-right">{Wind} km/h</td>
              </tr>
              <tr>
                <td className="text-left">Pressure:</td>
                <td className="text-right">{Math.floor(Pressure)}</td>
              </tr>
              <tr>
                <td className="text-left">Time:</td>
                <td className="text-right">{Time}</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherCard;

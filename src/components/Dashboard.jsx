import React, { useState, useEffect } from "react";
import "../App.css";
import WeatherCard from "./WeatherCard";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import BarChart from "./BarChart";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";

const Dashboard = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      handleFetchWeather();
    }
  }, [location]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position) => {
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    setError(null);
  };

  const showError = (positionError) => {
    switch (positionError.code) {
      case positionError.PERMISSION_DENIED:
        setError("User denied the request for Geolocation.");
        break;
      case positionError.POSITION_UNAVAILABLE:
        setError("Location information is unavailable.");
        break;
      case positionError.TIMEOUT:
        setError("The request to get user location timed out.");
        break;
      case positionError.UNKNOWN_ERROR:
        setError("An unknown error occurred.");
        break;
      default:
        setError("An unknown error occurred.");
        break;
    }
  };

  const handleFetchWeather = async () => {
    const url = `https://open-weather13.p.rapidapi.com/city/fivedaysforcast/${location.latitude}/${location.longitude}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "c3f2eb3426msh33f94088cb3b558p11f88cjsn90ff4cff30f2",
        "x-rapidapi-host": "open-weather13.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      const uniqueDates = new Set();
      const filteredWeather = result.list.filter((item) => {
        const date = new Date(item.dt * 1000).toISOString().split("T")[0];
        if (!uniqueDates.has(date)) {
          uniqueDates.add(date);
          return true;
        }
        return false;
      });

      setWeather(filteredWeather);
      setCity(result.city.name);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    findLatAndLong(city);
  };

  const findLatAndLong = async (city) => {
    const url = `https://trueway-geocoding.p.rapidapi.com/Geocode?address=${encodeURIComponent(
      city
    )}&language=en`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "7a8687a111msh0adaaa81ebde21dp1e556ajsn85b9f867dcfd",
        "x-rapidapi-host": "open-weather13.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (result.results && result.results.length > 0) {
        setLocation({
          latitude: result.results[0].location.lat,
          longitude: result.results[0].location.lng,
        });
        setError(null);
      } else {
        setError("City not found.");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch location data. Please try again.");
    }
  };

  const TempTrends = {
    labels: weather && weather.map((item) => item.dt_txt),
    datasets: [
      {
        label: "Temperature",
        data: weather && weather.map((item) => item.main.temp - 273.15),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        minBarLength: 5,
      },
    ],
  };
  return (
    <div className="2-screen bg-black text-white text-center flex items-center flex-col">
      <h1 className="julius text-4xl m-2">Dashboard</h1>
      <div>
        <h2 className="text-3xl itim m-2">{city}</h2>
        {weather &&
        (weather[0].weather[0].description === "light rain" ||
          weather[0].weather[0].description === "moderate rain" ||
          weather[0].weather[0].description === "heavy intensity rain") ? (
          <ThunderstormIcon />
        ) : weather &&
          (weather[0].weather[0].description === "scattered clouds" ||
            weather[0].weather[0].description === "overcast clouds" ||
            weather[0].weather[0].description === "few clouds") ? (
          <CloudIcon />
        ) : (
          <WbSunnyIcon />
        )}
      </div>
      <button onClick={getLocation} className="border p-2 rounded m-2">
        Get Current Location and Fetch Weather
      </button>

      <form onSubmit={handleSearch} className="z-2">
        <TextField
          fullWidth
          label="City"
          variant="filled"
          color="success"
          id="fullWidth"
          focused
          sx={{
            "& .MuiInputBase-input": {
              color: "white", // text color
            },
          }}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button type="submit" variant="contained" color="success">
          Search
        </Button>
      </form>
      {error && <p>{error}</p>}
      <div className="flex flex-wrap p-8 items-center flex-col justify-around lg:flex-row">
        {weather &&
          weather.map((item, key) => (
            <div key={key}>
              <WeatherCard
                Time={item.dt_txt}
                Temperature={item.main.temp}
                Feels={item.main.feels_like}
                Min={item.main.temp_min}
                Max={item.main.temp_max}
                Pressure={item.main.pressure}
                Humidity={item.main.humidity}
                Weather={item.weather[0].description}
                Clouds={item.clouds.all}
                Wind={item.wind.speed}
              />
            </div>
          ))}
      </div>
      <BarChart data={TempTrends} />
    </div>
  );
};

export default Dashboard;

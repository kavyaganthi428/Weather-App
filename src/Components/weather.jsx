import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

const API_KEY = "b9d6564abdf3b0b0aebaa51afef2ee8f";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchData = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      setData(null);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setData(response.data);
      setError("");
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Place not found");
      } else if (err.code === "ERR_NETWORK") {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("Something went wrong. Try again later.");
      }
      setData(null);
    }
  };

  return (
    <div className="body">
      <div className="container">
        <h1 className="weather-title">Weather App 🌦</h1>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter your city"
        />
        <br />
        <button onClick={fetchData}>Search</button>

        {error && <p className="error-message">{error}</p>}

        {data && (
          <div>
            <h2>
              <u>{data.name}</u>
            </h2>
            <p>🌡 Temperature: {Math.round(data.main.temp)}°C</p>
            <p>
              💧 Humidity: {data.main.humidity}% | Feels like:{" "}
              {Math.round(data.main.feels_like)}°C
            </p>
            <p>
              🌬 Wind: {Math.round(data.wind.speed * 3.6)} km/h | Direction:{" "}
              {data.wind.deg}°
            </p>
            <p>
              🔽 Min: {Math.round(data.main.temp_min)}°C | 🔼 Max:{" "}
              {Math.round(data.main.temp_max)}°C
            </p>
            <p>
              📊 Pressure: {data.main.pressure} hPa | ☁ Clouds:{" "}
              {data.clouds.all}%
            </p>
            <p>
              🌅 Sunrise:{" "}
              {new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              | 🌇 Sunset:{" "}
              {new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
import hot from "./assets/hot.jpg";
import cold from "./assets/cold.jpeg";
import "./styles/App.css";
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedData } from "./weatherServices";

function App() {
  const [city, setCity] = useState("lisboa");
  const [weather, setWeatherData] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hot);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedData(city, units);
      setWeatherData(data);

      const isHot = units === "metric" ? 20 : 60;
      if (data.temp > isHot) setBg(hot);
      else setBg(cold);
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnits = (e) => {
    const button = e.currentTarget;
    const current = button.innerText.slice(1);

    const Celcius = "C";
    button.innerText = current === Celcius ? "ºF" : "ºC";
    setUnits(current === Celcius ? "metric" : "imperial");
  };

  const enterPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.target.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="content">
            <div className="top-content">
              <input
                onKeyDown={enterPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              <button onClick={(e) => handleUnits(e)}>ºF</button>
            </div>
            <div className="middle-content">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <div className="icon-container">
                  <img src={weather.iconMK} alt="icon" width={100} />
                  <h3>{weather.description}</h3>
                </div>
              </div>

              <div className="temp">
                <h3>
                  {`${weather.temp.toFixed()} º ${
                    units === "metric" ? "C" : "F"
                  }`}
                </h3>
              </div>
            </div>

            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard/index";
import Location from "./Location/index";
import WebToggle from "../../library/WebToggle";
import WebDropdown from "../../library/WebDropdown";
import {
  getCityFromLocalStorage,
  setCityToLocalStorage,
} from "../../../localStorage";
import Forecasts from "./ForeCastData";
import "./style.css";

export default function MainPage() {
  const [city, setCity] = useState("");
  const [data, setData] = useState("");
  const [forcastData, setForcastData] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [tempUnit, setTempUnit] = useState(true);

  useEffect(() => {
    handleCity();
    const previousCity = getCityFromLocalStorage();
    if (previousCity) {
      setCity(previousCity);
    } else {
      setCity("New York");
    }
  }, []);

  useEffect(() => {
    if (data) {
      const dailyForecasts = data.list.filter((forecast) =>
        forecast.dt_txt.includes("12:00:00")
      );
      setForcastData(dailyForecasts);
    }
  }, [data]);

  useEffect(() => {
    if (city) {
      handleWeatherDataByCity(city);
    }
  }, [city]);

  const handleCity = () => {
    fetch("https://countriesnow.space/api/v0.1/countries/population/cities", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setCityOptions(data.data);
      })
      .catch((err) => alert("wrong city name"));
  };

  const handleWeatherDataByCity = (value) => {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        value +
        "&appid=c1e05aacb93d6a9573639643712b4075&days=5",
      { method: "GET" }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            response.status === 404 ? "City not found" : "Failed to fetch data"
          );
        }
        return response.json();
      })
      .then((data) => {
        if (data?.cod == 200) {
          setData(data);
          setCityToLocalStorage(data);
        }
      })
      .catch((err) => {
        alert("City not found");
      });
  };

  return (
    <div className="main_page_container">
      <Location data={data} />
      <div className="row_one">
        <WeatherCard data={data} unit={tempUnit} />
        <div className="row_one_col">
          <WebDropdown
            options={cityOptions}
            placeholder="select city"
            setValue={setCity}
            selectedValue={city}
          />
          <WebToggle tempUnit={tempUnit} setTempUnit={setTempUnit} />
        </div>
      </div>

      <Forecasts forcastData={forcastData} />
    </div>
  );
}

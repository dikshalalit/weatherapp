import React, { useCallback, useEffect, useState } from "react";
import "./style.css";

function WeatherCard({ data, unit }) {
  const [imgvalue, setImgvalue] = useState("");
  const [desp, setDesp] = useState("");
  const convertTemp = useCallback(() => {
    if (data?.list?.length) {
      if (unit) {
        return parseInt(data?.list[0]?.main?.temp - 273.15);
      } else {
        return (parseInt(data?.list[0]?.main?.temp - 273.15) * 9) / 5 + 32;
      }
    }
  }, [unit, data]);

  useEffect(() => {
    if (data?.list?.length) {
      setImgvalue(data["list"][0]["weather"][0]["icon"]);
      setDesp(data["list"][0]["weather"][0]["description"]);
    }
  }, [data]);

  return (
    <div className="weather_card_container">
      <div className="weather_card_row">
        <div className="weather_card_column">
          <img
            className="weather_card_icon"
            src={`http://openweathermap.org/img/w/${imgvalue}.png`}
            alt="weather_icon"
            width="auto"
            height="100px"
          />
        </div>

        <div className="weather_card_column">
          <h1 className="">
            {convertTemp()}
            {unit ? "°C" : "°F"}
          </h1>
          <p>{desp}</p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(WeatherCard);

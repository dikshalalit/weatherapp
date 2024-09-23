import React, { useEffect, useState } from "react";
import moment from "moment";
import "./style.css";

export default function ForcastCard({ data }) {
  const [imgvalue, setImgvalue] = useState("");
  useEffect(() => {
    if (data) {
      setImgvalue(data["weather"][0]["icon"]);
    }
  }, [data]);

  const time = moment(data?.dt_txt).format("dddd");
  return (
    <div className="forcast_card">
      <div className="forcast_card_column">
        <p>{time}</p>
        <p>{parseInt(data?.main?.temp - 273.15)}°C</p>
      </div>
      <img
        src={`http://openweathermap.org/img/w/${imgvalue}.png`}
        alt="weather_icon"
        width="auto"
        height="50px"
      />
    </div>
  );
}

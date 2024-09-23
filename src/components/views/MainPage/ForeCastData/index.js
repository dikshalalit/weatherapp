import React from "react";
import ForcastCard from "../ForcastCard";
import "./style.css";

function Forecasts({ forcastData }) {
  return (
    <div className="forscast_container">
      <p className="forecasts_heading">5-Day Forecasts</p>
      <div className="forecast_cards_row">
        {forcastData?.map((item) => {
          return <ForcastCard data={item} />;
        })}
      </div>
    </div>
  );
}

export default React.memo(Forecasts);

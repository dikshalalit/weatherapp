import React from "react";
import { MdLocationOn } from "react-icons/md";
import moment from "moment";
import "./style.css";

function Location({ data }) {
  const time = moment
    .utc()
    .utcOffset(data?.city?.timezone / 60)
    .format("MMMM Do YYYY, h:mm a");
  return (
    <div className="weather_location_container">
      <div className="weather_location_row">
        <MdLocationOn size={25} className="location_icon" />{" "}
        <p>{data?.city?.name}</p>
      </div>
      <p className="weather_location_time">{time}</p>
    </div>
  );
}

export default React.memo(Location);

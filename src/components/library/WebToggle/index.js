import React from "react";
import "./style.css";

export default function WebToggle({ tempUnit, setTempUnit }) {
  return (
    <div className="toggle_btn_container">
      <p>Temperature in</p>
      <div className="toggle_btn_box">
        <p
          className={`toggle_label ${
            tempUnit ? "toggle_label_left" : "toggle_label_right"
          }`}
        >
          {tempUnit ? "°F" : "°C"}
        </p>
        <button
          className={`toggle_btn ${
            tempUnit ? "toggle_btn_active" : "toggle_btn_inactive"
          }`}
          onClick={() => setTempUnit(!tempUnit)}
        ></button>
      </div>
    </div>
  );
}

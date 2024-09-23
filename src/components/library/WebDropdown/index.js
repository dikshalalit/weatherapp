import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useOutsideClick } from "../../../base/context/OutsideClick";
import "./style.css";
import { getCityFromLocalStorage } from "../../../localStorage";

export default function WebDropdown({
  options,
  placeholder,
  setValue,
  selectedValue,
}) {
  const [optionVisibility, setOptionVisibility] = useState(false);
  const outsideClick = useOutsideClick();
  const ref = useRef();

  const [searchQuery, setSearchQuery] = useState("");
  const [optionsList, setOptionsList] = useState(options);

  const handleDropdown = () => {
    setOptionVisibility(true);
  };

  const handleClose = () => {
    setOptionVisibility(false);
    setOptionsList(options);
  };

  useEffect(() => {
    outsideClick.getComponent(ref, handleClose);
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (!searchQuery) {
        setOptionsList(options);
      } else {
        const filtered = options.filter((item) =>
          item.city.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
        setOptionsList(filtered);
      }
    }, 500);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchQuery, options]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleValue = (e) => {
    setValue(e);
    handleClose();
  };

  return (
    <div className="web_dropdown_container">
      <div className="web_dropdown" onClick={handleDropdown}>
        <div className="web_dropdown_value">
          {getCityFromLocalStorage()
            ? getCityFromLocalStorage()
            : selectedValue}
        </div>

        <IoMdArrowDropdown
          size={20}
          className={`dropdown_icon ${
            optionVisibility ? "dropdown_icon_up" : "dropdown_icon_down"
          }`}
        />
      </div>

      {optionVisibility ? (
        <div ref={ref} className="dropdown_option_box">
          <input
            type="text"
            placeholder={placeholder}
            className="web_dropdown_search"
            onChange={handleSearch}
          />

          <div className="dropdown_options_list">
            {optionsList.map((item, index) => {
              return (
                <p key={index} onClick={() => handleValue(item.city)}>
                  {item.city}
                </p>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

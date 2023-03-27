import React from "react";
import "../styles/descriptions.css";

import { FaArrowDown, FaArrowUp, FaWind } from "react-icons/fa";
import { BiHappy } from "react-icons/bi";
import { MdCompress, MdOutlineWaterDrop } from "react-icons/md";

const Descriptions = ({ weather, units }) => {
  const tempUnits = units === "metric" ? "ºC" : "ºF";
  const windUnits = units === "metric" ? "m/s" : "mph";

  const cards = [
    {
      id: 1,
      icon: <FaArrowDown />,
      title: "min",
      data: weather.temp_min.toFixed(),
      units: tempUnits,
    },
    {
      id: 2,
      icon: <FaArrowUp />,
      title: "max",
      data: weather.temp_max.toFixed(),
      units: tempUnits,
    },
    {
      id: 3,
      icon: <BiHappy />,
      title: "feels like",
      data: weather.feels_like.toFixed(),
      units: tempUnits,
    },
    {
      id: 4,
      icon: <MdCompress />,
      title: "pressure",
      data: weather.pressure,
      units: "hPa",
    },
    {
      id: 5,
      icon: <MdOutlineWaterDrop />,
      title: "humidity",
      data: weather.humidity,
      units: "%",
    },
    {
      id: 6,
      icon: <FaWind />,
      title: "wind",
      data: weather.speed.toFixed(),
      units: windUnits,
    },
  ];

  return (
    <div className="descriptions">
      {cards.map(({ id, icon, title, data, units }) => (
        <div key={id} className="card">
          <div className="card-icon">
            {icon}
            <small>{title}</small>
          </div>
          <h3>{`${data} ${units}`}</h3>
        </div>
      ))}
    </div>
  );
};

export default Descriptions;

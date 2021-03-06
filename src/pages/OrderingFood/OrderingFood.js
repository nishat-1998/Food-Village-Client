import React, { useEffect, useState } from "react";
import axios from "../../axios";
import OderingSingleFood from "./OrderingSingleFood";

function OrderingFood({search}) {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/services`)
      .then((response) => setHouses(response.data))
      .catch((err) => alert(err.message));
  }, []);

  return (
    <div className="home">
      <div className="container">
        <div className="row justify-content-center">
          {houses.filter(element => element.title.toLowerCase().includes(search.trim())).map((house) => (
            <OderingSingleFood
              house={house}
              key={Math.random()}
            ></OderingSingleFood>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderingFood;
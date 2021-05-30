import React from "react";
import { Link } from "react-router-dom";
import locationImg from "../../components/resources/logos/locationone.png";
import bath from "../../components/resources/logos/bath 1.png";
import bed from "../../components/resources/logos/bed 1.png";

const OrderingSingleFood = (props) => {
  // console.log(props.house);
  const { bathroom, bedroom, image, location, price, title, _id } = props.house;
  return (
    <div className="bookingAppartment">
      <div className="col-md-4 col-md-6 ">
        <div class="card my-5" style={{ width: "18rem" }}>
          <img src={image} class="card-img-top" alt="" />
          <div class="card-body">
            <h5 class="card-title">{title}</h5>
            <p class="card-text">
              <div className="row">
                <div className="col-md-12 d-flex justify-content-start align-items-center">
                  <img src={locationImg} alt="" />
                  <p className="pl-2">
                    <small className="pl-1">{location}</small>
                  </p>
                </div>
              </div>
              <div className="row my-3">
                <div className="col-md-6 d-flex justify-content-start align-items-center">
                  <img src={bed} alt="" />
                  <p className="pl-2">
                    <span>{bedroom}</span>
                    <small className="pl-1">Bedrooms</small>
                  </p>
                </div>
                <div className="col-md-6 d-flex justify-content-start align-items-center">
                  <img src={bath} alt="" />
                  <p className="pl-2">
                    <span>{bathroom}</span>
                    <small className="pl-1">Bathroom</small>
                  </p>
                </div>
              </div>
            </p>
          </div>
          <div class="card-body d-flex justify-content-between align-items-center mt-1">
            <h2 className="price">${price}</h2>
            <Link to={`/housedetails/${_id}`}>
              <button className="btn">View Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderingSingleFood;
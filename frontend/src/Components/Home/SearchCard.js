import React from "react";
// import 'react-toastify/dist/ReactToastify.css';

import Rating from "@mui/material/Rating";


//import { Button, CardActionArea, CardActions } from "@mui/material";
//import Card from "@mui/material/Card";


import { Link } from "react-router-dom";

import img01 from "../../Images/gym1.png";

const SearchCard = () => {
  const value = 2;

  const cardInfo = [
    {
      id: "1",
      bdCity: "Homagama",
      bdTown: "Habarakada",
      bdCode: "WP10204",
      bdDescription: "Gym Type: Both",
    },
    {
      id: "2",
      bdCity: "Colombo",
      bdTown: "Borella",
      bdCode: "WP00800",
      bdDescription: "Gym Type: Both",
    },
    {
      id: "3",
      bdCity: "Dehiwalla",
      bdTown: "Mount Lavinia",
      bdCode: "WP10350",
      bdDescription: "Gym Type: Only Male",
    },
    {
      id: "4",
      bdCity: "Nugegoda",
      bdTown: "Gangodavila",
      bdCode: "WP10250",
      bdDescription: "Gym Type: Both",
    },
    {
      id: "5",
      bdCity: "Matara",
      bdTown: "Nupe Junction",
      bdCode: "SP81071",
      bdDescription: "Gym Type: Both",
    },
    {
      id: "6",
      bdCity: "Kelaniya",
      bdTown: "Dippitigoda",
      bdCode: "WP11600",
      bdDescription: "Gym Type: Only Male",
    },
  ];

  const imagUrl = img01;

  const cardRender = (card, index) => {
    return (
      <div
        className="col-xl-4 col-md-6 py-4 px-4 col d-flex justify-content-center"
        key={index}
      >
        <div className="card " style={{ width: "20rem" }}>
          <img src={imagUrl} alt="card" />
          <div className="card-body">
            <div className="container">
              <div className="row">
                <div className=" col-12">
                  <h5 className="card-title">
                    {card.bdCity}-{card.bdTown}
                  </h5>
                  <p>
                    <Rating name="read-only" value={value} readOnly />
                  </p>
                  {/* <p className="card-subtitle">{card.bdCode}</p> */}
                </div>
              </div>

              {/* <img src={imagUrl} alt="card" /> */}

              <p className="card-text">{card.bdDescription}</p>

             
            </div>
          </div>

          <div className="card-body">
            
            <Link to={`/element/${card.id}`} className="btn btn-dark">
              View
            </Link>
            <button className="btn btn-secondary float-end">Save</button>
          </div>
        </div>
      </div>
    );
  };

  return <div className="row">{cardInfo.map(cardRender)}</div>;
};
export default SearchCard;
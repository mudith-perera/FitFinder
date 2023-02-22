import React from "react";
import Carousel from "react-bootstrap/Carousel";

import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";

import first from "../../Images/gym1.png";
import sec from "../../Images/gym2.png";
import third from "../../Images/gym3.png";

import { useNavigate } from "react-router-dom";

const SearchResultElement = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const cardInfo = [
    {
      id: 1,
      bdCity: "Homagama",
      bdTown: "Habarakada",
      bdCode: "WP10204",
      //capacity: "3",
      email: "test@email.com",
      phone: "0771234567",
      province: "Western",
      type: "Both",
      //bathroom: "Yes",

      bdDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consequat cursus quam, at.",
    },
    {
      id: 2,
      bdCity: "Colombo",
      bdTown: "Borella",
      bdCode: "WP00800",
      //capacity: "3",
      email: "test@email.com",
      phone: "0771234567",
      province: "Western",
      type: "Male",
      //bathroom: "Yes",
      bdDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consequat cursus quam, at.",
    },
    {
      id: 3,
      bdCity: "Dehiwalla",
      bdTown: "Mount Lavinia",
      //capacity: "3",
      email: "test@email.com",
      phone: "0771234567",
      province: "Western",
      type: "Male",
      //bathroom: "Yes",
      bdCode: "WP10350",
      bdDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consequat cursus quam, at.",
    },
    {
      id: 4,
      bdCity: "Nugegoda",
      bdTown: "Gangodavila",
      //capacity: "3",
      email: "test@email.com",
      phone: "0771234567",
      province: "Western",
      type: "Both",
      //bathroom: "Yes",
      bdCode: "WP10250",
      bdDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consequat cursus quam, at.",
    },
    {
      id: 5,
      bdCity: "Matara",
      bdTown: "Nupe Junction",
      bdCode: "SP81071",
      //capacity: "3",
      email: "test@email.com",
      phone: "0771234567",
      province: "Southern",
      type: "Both",
      //bathroom: "Yes",
      bdDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consequat cursus quam, at.",
    },
    {
      id: 6,
      bdCity: "Kelaniya",
      bdTown: "Dippitigoda",
      bdCode: "WP11600",
      //capacity: "3",
      email: "test@email.com",
      phone: "0771234567",
      province: "Western",
      type: "Both",
      //bathroom: "Yes",
      bdDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consequat cursus quam, at.",
    },
  ];

  const Info = cardInfo.filter((cardInfo) => {
    return String(cardInfo.id) === id;
  });

  console.log(Info);
  return (
    <div data-aos="zoom-in-up" className="container py-5 ">
      <div className=" ">
        {Info.map((cardInfo) => {
          return (
            <div className="card " key={cardInfo.id}>
              <div className="card-header">
                <h4>
                  {cardInfo.bdTown} - {cardInfo.bdCity}
                </h4>
              </div>
              <div className="card-body">
                <Table>
                  <tr>
                    <td>
                      <Table>
                        <thead>
                          <tr>
                            <th
                              style={{
                                width: 130,
                              }}
                            >
                              Location Code
                            </th>
                            <td>{cardInfo.bdCode}</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>City</th>
                            <td>{cardInfo.bdCity}</td>
                          </tr>
                          <tr>
                            <th>Town</th>
                            <td>{cardInfo.bdTown}</td>
                          </tr>
                          <tr>
                            <th>E-mail</th>
                            <td>{cardInfo.email}</td>
                          </tr>
                          <tr>
                            <th>Tele-No</th>
                            <td>{cardInfo.phone}</td>
                          </tr>
                          <tr>
                            <th>Type</th>
                            <td>{cardInfo.type}</td>
                          </tr>

                          <tr>
                            <th>Description</th>
                            <td>{cardInfo.bdDescription}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </td>
                    <td
                      style={{
                        width: 650,
                      }}
                    >
                      <Carousel className="py-2">
                        <Carousel.Item>
                          <img
                            className="d-block w-100"
                            src={sec}
                            alt="First slide"
                          />
                        </Carousel.Item>
                        <Carousel.Item>
                          <img
                            className="d-block w-100"
                            src={first}
                            alt="Second slide"
                          />
                        </Carousel.Item>
                        <Carousel.Item>
                          <img
                            className="d-block w-100"
                            src={third}
                            alt="Third slide"
                          />
                        </Carousel.Item>
                      </Carousel>
                    </td>
                  </tr>
                </Table>

                <button className="btn btn-secondary float-end">Contact</button>
                <button className="btn btn-dark" onClick={() => navigate(-1)}>
                  Back
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResultElement;

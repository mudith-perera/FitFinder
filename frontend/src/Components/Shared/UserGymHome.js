import React from "react";
import "./UserGymHome.css";

import Carousel from "react-bootstrap/Carousel";
import Button from "@mui/material/Button";
import Table from "react-bootstrap/Table";

import DeleteIcon from "@mui/icons-material/Delete";

import gym from "../../Images/gym.png";
import first from "../../Images/gym1.png";
import second from "../../Images/gym2.png";
import third from "../../Images/gym3.png";
import fourth from "../../Images/gym4.jpg";
import fifth from "../../Images/gym5.png";

const UserGymHome = () => {
  const cardInfo = [
    {
      GymName: "Max Fitness",
      GymOwnerName: "Mr. Mudith Perera",
      GymOwnerEmail: "mudithperera@gmail.com",
      ContactNo1: "0700000010",
      ContactNo2: "0110000101",
      Location: "Matara",
      Address: "No:51/2, Uyanwatta, Matara",
      MonthFee: "15000",
      AnnualFee: "55000",
    },
  ];

  // console.log(RegisteredGymInfo);

  return (
    <div className="container py-5 px-5">
      <div>
        <div className="card ">
          <div className="card-header">
            <h4 className="card-title">Currently Registered Gym</h4>
            <img
              src={gym}
              alt="default pic"
              height="50px"
              className="card-defaultimage"
            />
          </div>
          <div className="card-body">
            <Table>
              <tbody>
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
                            Gym Name
                          </th>
                          <td>{cardInfo[0].GymName}</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>Gym Owner's Name</th>
                          <td>{cardInfo[0].GymOwnerName}</td>
                        </tr>
                        <tr>
                          <th>Gym Owner's E-mail</th>
                          <td>{cardInfo[0].GymOwnerEmail}</td>
                        </tr>
                        <tr>
                          <th>Contact No 1</th>
                          <td>{cardInfo[0].ContactNo1}</td>
                        </tr>
                        <tr>
                          <th>Contact No 2</th>
                          <td>{cardInfo[0].ContactNo2}</td>
                        </tr>
                        <tr>
                          <th>Location</th>
                          <td>{cardInfo[0].Location}</td>
                        </tr>
                        <tr>
                          <th>Address</th>
                          <td>{cardInfo[0].Address}</td>
                        </tr>
                        <tr>
                          <th>Monthly Fee</th>
                          <td>{cardInfo[0].MonthFee}</td>
                        </tr>
                        <tr>
                          <th>Annual Fee</th>
                          <td>{cardInfo[0].AnnualFee}</td>
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
                          className="d-block"
                          src={first}
                          alt="First slide"
                          style={{ width: "650px", height: "430px" }}
                        />
                        <Carousel.Caption></Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          className="d-block"
                          src={second}
                          alt="Second slide"
                          style={{ width: "650px", height: "430px" }}
                        />
                        <Carousel.Caption></Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          className="d-block"
                          src={third}
                          alt="Third slide"
                          style={{ width: "650px", height: "430px" }}
                        />
                        <Carousel.Caption></Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          className="d-block"
                          src={fourth}
                          alt="Fourth slide"
                          style={{ width: "650px", height: "430px" }}
                        />
                        <Carousel.Caption></Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          className="d-block"
                          src={fifth}
                          alt="Fifth slide"
                          style={{ width: "650px", height: "430px" }}
                        />
                        <Carousel.Caption></Carousel.Caption>
                      </Carousel.Item>
                    </Carousel>
                  </td>
                </tr>
              </tbody>
            </Table>
            <Button
              variant="contained"
              type="submit"
              color="error"
              endIcon={<DeleteIcon />}
            >
              Remove Me
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGymHome;

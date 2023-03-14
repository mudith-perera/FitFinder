///////////////////////// Developer       : Gimhani Harshika  /////////////////////////
///////////////////////// Modified Date   : 19-02-2023     /////////////////////////
/////////////////////////           (START)                /////////////////////////

import React, { useEffect, useState } from "react";
import "./UserGymHome.css";

import Carousel from "react-bootstrap/Carousel";
import Button from "@mui/material/Button";
import Table from "react-bootstrap/Table";

import DeleteIcon from "@mui/icons-material/Delete";

import gym from "../../Images/gym.png";

import Aos from "aos";
import "aos/dist/aos.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCookies } from 'react-cookie';

import SideNavbar from "../Shared/SideNavbar.js";

const MemberRegisteredGym = () => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  //user account create success alert
  const userSuccess = () => {
    toast.success("User Successfully Removed 😊👍", {
      theme: "colored",
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const [cookie] = useCookies(['']);
  const [GymName, setGymName] = useState(cookie.LoggedUser[6].gymName);
  const [GymOwnerName, setGymOwnerName] = useState(cookie.LoggedUser[6].gymOwnerName);
  const [GymOwnerEmail, setGymOwnerEmail] = useState(cookie.LoggedUser[6].email);
  const [ContactNo1, setContactNo1] = useState(cookie.LoggedUser[6].gymContactNo1);
  const [ContactNo2, setContactNo2] = useState(cookie.LoggedUser[6].gymContactNo2);
  const [Location, setLocation] = useState(cookie.LoggedUser[6].location);
  const [Address, setAddress] = useState(cookie.LoggedUser[6].gymAddress);
  const [MonthFee, setMonthFee] = useState(cookie.LoggedUser[6].gymMonthlyFee);
  const [AnnualFee, setAnnualFee] = useState(cookie.LoggedUser[6].gymAnnualFee);
  const [GymImages, setGymImages] = useState(cookie.LoggedUser[6].images);

  // console.log(cookie);

  const registeredGymActivateStatus = false;
  const userId = cookie.LoggedUser[5];
  const gymRegistered = async () => {
    const formData = { registeredGymActivateStatus };

    //user remove backend
    const response = await fetch("/api/users/" + userId, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (response.ok) {
      userSuccess();
      console.log("new user added", json);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div style={{ position: "fixed", zIndex: "1" }}>
        <SideNavbar userRole={cookie.LoggedUser[0]} />
      </div>
      {cookie.LoggedUser[6].activeStatus ?

        <div className="container py-5 px-5">
          <div>
            <div className="card ">
              <div className="card-header">
                <h4 className="card-title">{cookie.LoggedUser[0]} Currently Registered Gym</h4>
                <img
                  src={gym}
                  alt="default pic"
                  height="50px"
                  className="card-defaultimage"
                />
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
                              Gym Name
                            </th>
                            <td>{GymName}</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>Gym Owner's Name</th>
                            <td>{GymOwnerName}</td>
                          </tr>
                          <tr>
                            <th>Gym Owner's E-mail</th>
                            <td>{GymOwnerEmail}</td>
                          </tr>
                          <tr>
                            <th>Contact No 1</th>
                            <td>{ContactNo1}</td>
                          </tr>
                          <tr>
                            <th>Contact No 2</th>
                            <td>{ContactNo2}</td>
                          </tr>
                          <tr>
                            <th>Location</th>
                            <td>{Location}</td>
                          </tr>
                          <tr>
                            <th>Address</th>
                            <td>{Address}</td>
                          </tr>
                          <tr>
                            <th>Monthly Fee</th>
                            <td>{MonthFee}</td>
                          </tr>
                          <tr>
                            <th>Annual Fee</th>
                            <td>{AnnualFee}</td>
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
                        {GymImages ?
                          GymImages.map((url, index) => (
                            <Carousel.Item key={index}>
                              <img
                                key={index}
                                src={url}
                                alt={`Image ${index}`}
                                style={{ width: "650px", height: "430px" }}
                              />
                              <Carousel.Caption></Carousel.Caption>
                            </Carousel.Item>
                          ))
                          : <></>
                        }
                      </Carousel>
                    </td>
                  </tr>
                </Table>
                <Button
                  variant="contained"
                  type="submit"
                  color="error"
                  endIcon={<DeleteIcon />}
                  onClick={() => gymRegistered()}
                >
                  Remove Me
                </Button>
              </div>
            </div>
          </div>
        </div>
        : <p>No Gym still you registered</p>}

    </div>
  );
};

export default MemberRegisteredGym;

/////////////////////////           (END)                /////////////////////////

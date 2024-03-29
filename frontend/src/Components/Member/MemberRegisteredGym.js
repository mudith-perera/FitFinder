///////////////////////// Developer       : Gimhani Harshika  /////////////////////////
///////////////////////// Modified Date   : 19-02-2023     /////////////////////////
/////////////////////////           (START)                /////////////////////////

import React, { useEffect, useState, useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "@mui/material/Button";
import Table from "react-bootstrap/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import gym from "../../Images/gym.png";
import Aos from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import SideNavbar from "../Shared/SideNavbar.js";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import axios from 'axios';

const MemberRegisteredGym = () => {
  const [cookie, setCookie] = useCookies(["LoggedUser"]);
  const [ratingData, setRatingData] = useState('');
  const userId = cookie.LoggedUser[5];

  const [rateValue, setValue] = useState(null);
  const [comment, setComment] = useState(null);
  const [gymDetails, setGymDetails] = useState(cookie.LoggedUser[6]);
  const [registeredGymStatus, setRegisteredGymStatus] = useState(cookie.LoggedUser[7]);
  const [GymId] = useState(gymDetails?._id);
  const [GymName] = useState(gymDetails?.gymName);
  const [GymOwnerName] = useState(gymDetails?.gymOwnerName);
  const [GymOwnerEmail] = useState(gymDetails?.email);
  const [ContactNo1] = useState(gymDetails?.gymContactNo1);
  const [ContactNo2] = useState(gymDetails?.gymContactNo2);
  const [Location] = useState(gymDetails?.location);
  const [Address] = useState(gymDetails?.gymAddress);
  const [MonthFee] = useState(gymDetails?.gymMonthlyFee);
  const [AnnualFee] = useState(gymDetails?.gymAnnualFee);
  const [GymImages] = useState(gymDetails?.images);

  const isInitialMount = useRef(true);

  useEffect(() => {
    Aos.init({ duration: 500 });
    if (isInitialMount.current) {
      console.log("test")
      isInitialMount.current = false;
      fetch(`/api/rating/getUserGymRating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: userId,
          gym: GymId,
        })
      })
        .then((response) => response.json())
        .then((data) => setRatingData(data));
    }
  }, [userId, GymId]);

  useEffect(() => {
    setValue(ratingData?.rating || null);
    setComment(ratingData?.comment || null);
  }, [ratingData]);

  //user account create success alert
  const userSuccess = () => {
    toast.success("User Successfully Removed 😊👍", {
      theme: "colored",
      position: toast.POSITION.TOP_LEFT,
    });
  };
  const [open, setOpen] = useState(false);
  //const avgRating = 2;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const gymRegistered = async () => {
    const registeredGym = null;
    const registeredGymActivateStatus = false;
    const formData = { registeredGym, registeredGymActivateStatus };

    //user remove backend
    const response = await fetch("/api/users/" + userId, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      userSuccess();
      const cookieValue = cookie.LoggedUser;
      cookieValue[6] = null; // setting 6th index to null
      setCookie("LoggedUser", cookieValue, { path: "/" });
      setGymDetails(null);
      setRegisteredGymStatus(false);
    }
  };

  const handleRating = () => {
    // Send POST request with rating value
    axios.post('/api/rating', { rating: rateValue, comment, user: userId, gym: GymId })
      .then(response => {
        console.log('Rating posted successfully:', response.data);
        setOpen(false)
        // Optionally, show a success message to the user
      })
      .catch(error => {
        console.error('Failed to post rating:', error);
        // Optionally, show an error message to the user
      });
  };

  return (
    <div>
      <ToastContainer />
      <div style={{ position: "fixed", zIndex: "1" }}>
        <SideNavbar userRole={cookie.LoggedUser[0]} />
      </div>
      {registeredGymStatus ? (
        <div className="container py-5 px-5" data-aos="fade-right">
          <div>
            <div className="card ">
              <div className="card-header">
                <h4 className="card-title">
                  {cookie.LoggedUser[0]} Currently Registered Gym
                </h4>
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
                        {GymImages ? (
                          GymImages.map((url, index) => (
                            <Carousel.Item key={index}>
                              <img
                                key={index}
                                src={url}
                                alt={`pic ${index}`}
                                style={{ width: "100%" }}
                              />
                              <Carousel.Caption></Carousel.Caption>
                            </Carousel.Item>
                          ))
                        ) : (
                          <></>
                        )}
                      </Carousel>
                    </td>
                  </tr>
                </Table>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    p: 2,
                    //bgcolor: 'secondary.light',
                    //color: 'primary.contrastText',
                    borderRadius: 1,
                    boxShadow: 1,
                    border: '1px solid black',
                    mb: 2
                  }}
                >
                  <Typography variant="h5">Rate this Gym:</Typography>
                  <Rating name="read-only" value={rateValue} readOnly />
                  <div>
                    <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ mt: 2 }}>
                      Rate Me
                    </Button>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Rate this Gym"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Please rate the gym from 1 to 5 stars:
                        </DialogContentText>
                        <DialogActions style={{ justifyContent: 'flex-start' }}>
                          <Rating
                            name="size-large"
                            value={rateValue}
                            onChange={event => setValue(event.target.value)}
                            size="large"
                          />
                        </DialogActions>

                        {rateValue && <p>You rated {rateValue} stars.</p>}

                        <Typography variant="subtitle1" gutterBottom>
                          Comment:
                        </Typography>
                        <textarea
                          id="comment"
                          name="comment"
                          value={comment}
                          onChange={handleCommentChange}
                        />

                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button onClick={handleRating}>Submit</Button>
                        </DialogActions>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Box>

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
      ) : (
        <section data-aos="fade-right" className="vh-800 gradient-custom">
          <div className="container py-5 h-80">
            <div className="row d-flex justify-content-center align-items-center h-600">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-white" style={{ borderRadius: "1rem" }}>
                  <div className="card-body p-3 text-center">
                    <div className="mb-md-2 mt-md-4 pb-2">
                      <br />
                      <br />
                      {gymDetails ? (<h2 className="fw-bold mb-2 text-uppercase">
                        Request Pending 🤞
                      </h2>) :
                        (<h2 className="fw-bold mb-2 text-uppercase">
                          You haven't Registered for a gym 😁
                        </h2>)}
                      {gymDetails ? (
                        <>
                          <p>Please Wait Until the <b>{gymDetails?.gymName}</b> Accepts You.</p>
                          <p>Contact the Gym <b>{gymDetails?.gymContactNo1}/{gymDetails?.gymContactNo2}</b></p>
                        </>
                      ) : (
                        <p>You can registered for a gym by searching...</p>
                      )}

                      <br />
                    </div>

                    <p className="large text-white-50">Or</p>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default MemberRegisteredGym;

/////////////////////////           (END)                /////////////////////////

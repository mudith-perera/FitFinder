import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Aos from "aos";
import "aos/dist/aos.css";

import { Card, CardContent, Typography } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";

import Carousel from "react-material-ui-carousel";

import { useCookies } from "react-cookie";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SearchCard = (props) => {
  const [cookie] = useCookies([""]);
  const [loggedState, setLoggedState] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    Aos.init({ duration: 1000 });
    if (cookie.LoggedUser) {
      setLoggedState(true);
      setUserId(cookie.LoggedUser[5]);
    }
  }, [cookie.LoggedUser]);

  //user account create success alert
  const userSuccess = (gymName) => {
    toast.success("You have Registered to " + gymName + " 😊", {
      theme: "colored",
      position: toast.POSITION.TOP_LEFT,
    });
  };

  //user account create error alert
  const userError = (error) => {
    toast.error("😢 " + error, {
      theme: "colored",
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const results = props.result;

  const gymRegister = async (registeredGym, gymName) => {
    //e.preventDefault();
    const formData = { registeredGym };

    //user validation backend
    const response = await fetch("/api/users/" + userId, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      userError(json.error);
    }
    if (response.ok) {
      userSuccess(gymName);
    }
  };

  return (
    <>
      <ToastContainer />

      <div data-aos="fade-right">
        {Array.isArray(results) &&
          results.map((result) => (
            <Card key={result._id} sx={{ marginBottom: 2 }}>
              <Carousel>
                {result.images.map((image, index) => (
                  <CardMedia
                    key={index}
                    component="img"
                    height="150px"
                    image={image}
                    alt={result.gymName}
                  />
                ))}
              </Carousel>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {result.gymName}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  Email : {result.email}
                </Typography>
                <Typography variant="body2" component="p">
                  Gender : {result.gymSexType}
                </Typography>
                <Typography variant="body2" component="p">
                  Tele : {result.gymContactNo1} / {result.gymContactNo2}
                </Typography>
                <Typography variant="body2" component="p">
                  <Rating name="read-only" value={result.gymRating} readOnly />
                </Typography>
              </CardContent>
              <CardActions>
                {loggedState ? (
                  <Button
                    size="small"
                    onClick={() => gymRegister(result._id, result.gymName)}
                  >
                    Register
                  </Button>
                ) : (
                  <Button size="small" href="/login">
                    Login to register
                  </Button>
                )}
              </CardActions>
            </Card>
          ))}
      </div>
    </>
  );
};
export default SearchCard;

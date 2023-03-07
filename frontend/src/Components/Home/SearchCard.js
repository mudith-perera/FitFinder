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

const SearchCard = (props) => {
  const [cookie] = useCookies([""]);
  const [loggedState, setLoggedState] = useState(false);
  const [userId, setUserId] = useState('');
  useEffect(() => {
    Aos.init({ duration: 1000 });
    if (cookie.LoggedUser) {
      setLoggedState(true);
      setUserId(cookie.LoggedUser[5]);
    }
  });

  const results = props.result;
  
  

  const gymRegister = async (registeredGym) => {
    //e.preventDefault();
    const formData = { registeredGym };
    console.log(userId);
    //user validation backend
    const response = await fetch("/api/users/"+userId, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }
    if (response.ok) {
    }
  };

  return (
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
                <Button size="small" onClick={() => gymRegister(result._id)}>
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
  );
};
export default SearchCard;

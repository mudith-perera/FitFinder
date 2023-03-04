import React, { useEffect } from "react";
import Rating from "@mui/material/Rating";
import Aos from "aos";
import "aos/dist/aos.css";

import { Card, CardContent, Typography } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";

import Carousel from "react-material-ui-carousel";

const SearchCard = (props) => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  });

  const results = props.result;

  console.log(results);

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
              <Button size="small">Register</Button>
            </CardActions>
          </Card>
        ))}
    </div>
  );
};
export default SearchCard;

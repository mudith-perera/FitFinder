import React, { useEffect } from "react";
import Rating from "@mui/material/Rating";
import Aos from "aos";
import "aos/dist/aos.css";

import { Link } from "react-router-dom";

import { Card, CardContent, Typography } from "@mui/material";
import { CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
const SearchCard = (props) => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  });

  const results = props.result;

  console.log(results);

  return (
    <div>
      {Array.isArray(results) &&
        results.map((result) => (
          <Card key={result._id} sx={{ marginBottom: 2 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="../../Images/coach.png"
                alt="green iguana"
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  {result.gymName}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {result.gymOwnerName}
                </Typography>
                <Typography variant="body2" component="p">
                  {result.email}
                </Typography>
                <Typography variant="body2" component="p">
                  {result.gymSexType}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
    </div>
  );
};
export default SearchCard;

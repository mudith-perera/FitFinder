import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Aos from "aos";
import "aos/dist/aos.css"
import { Card, CardContent, Typography } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Carousel from "react-material-ui-carousel"
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Favorite from './Favorite.js'

const styles = {
  boxes: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
    borderRadius: 4,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
  },
  boxes2: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
    borderRadius: 4,
  },
  scrollableDiv: {
    overflow: "auto",
  },
};

const SearchCard = (props) => {
  const [cookie] = useCookies([""]);
  const [loggedState, setLoggedState] = useState(false);
  const [userId, setUserId] = useState("");
  const [ratingData, setRatingData] = useState("");

  useEffect(() => {
    Aos.init({ duration: 1000 });
    if (cookie.LoggedUser) {
      setLoggedState(true);
      setUserId(cookie.LoggedUser[5]);
    }
  }, [cookie.LoggedUser]);

  //gym registra success alert
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

  const [openModalId, setOpenModalId] = useState(null);

  const [openModalReviewsId, setOpenModalReviewsId] = useState(null);

  const handleOpenModal = (id) => {
    setOpenModalId(id);
  };

  const handleCloseModal = () => {
    setOpenModalId(null);
  };

  const handleOpenViewReviews = (id) => {
    fetch(`/api/rating/getGymRatings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        gym: id,

      })
    })
      .then((response) => response.json())
      .then((data) => setRatingData(data));
    setOpenModalReviewsId(id);
  };

  const handleCloseViewReviews = () => {
    setRatingData(null);
    setOpenModalReviewsId(null);
  };
  return (
    <>
      <ToastContainer />
      <div style={{ maxHeight: "500px", ...styles.scrollableDiv }}>
        {Array.isArray(results) &&
          results.map((result) => (
            <div style={{ width: "90%", margin: "0 auto" }}>
              <Card key={result._id} sx={{ marginBottom: 2 }}>

                {/* Modal to show all the reviews of a gym (START) */}
                <Modal
                  open={openModalReviewsId === result._id}
                  onClose={handleCloseViewReviews}
                  aria-labelledby={`modal-title-${result._id}`}
                  aria-describedby={`modal-description-${result._id}`}
                >
                  <Box sx={styles.boxes2}>
                    {Array.isArray(ratingData) && ratingData.length > 0 ?
                      (
                        <TableContainer component={Paper}>
                          <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell align="left">User</TableCell>
                                <TableCell align="left">Rating</TableCell>
                                <TableCell align="left">Comment</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {ratingData?.map((rating) => (
                                <TableRow
                                  key={rating._id}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                  <TableCell align="left">{rating.user.firstname + " " + rating.user.lastname}</TableCell>
                                  <TableCell align="left"><Rating name="read-only" value={rating.rating} readOnly /></TableCell>
                                  <TableCell align="left">{rating.comment}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      ) : (
                        <p>No ratings found.</p>
                      )}
                  </Box>
                </Modal>
                {/* Modal to show all the reviews of a gym (END) */}

                {/* Modal to show Extra details of the gym (START) */}
                <Modal
                  open={openModalId === result._id}
                  onClose={handleCloseModal}
                  aria-labelledby={`modal-title-${result._id}`}
                  aria-describedby={`modal-description-${result._id}`}
                >
                  <Box sx={styles.boxes}>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <Typography
                        id={`modal-title-${result._id}`}
                        variant="h6"
                        component="h2"
                      >
                        {result.gymName}
                      </Typography>

                    </Box>
                    <Typography
                      id={`modal-description-${result._id}`}
                      sx={{ mt: 2 }}
                    >
                      Gym Owner's Name : {result.gymOwnerName}
                    </Typography>
                    <Typography
                      id={`modal-description-${result._id}`}
                      sx={{ mt: 2 }}
                    >
                      Gym Opening/Closing Time : {result.openingTime} -{" "}
                      {result.closingTime}
                    </Typography>
                    <Typography
                      id={`modal-description-${result._id}`}
                      sx={{ mt: 2 }}
                    >
                      Gym Monthly Fee : {result.gymMonthlyFee}
                    </Typography>
                    <Typography
                      id={`modal-description-${result._id}`}
                      sx={{ mt: 2 }}
                    >
                      Gym Annual Fee : {result.gymAnnualFee}
                    </Typography>
                    <Typography
                      id={`modal-description-${result._id}`}
                      sx={{ mt: 2 }}
                    >
                      Gym Address : {result.gymAddress}
                    </Typography>
                    <Carousel sx={{ width: '400px' }} >
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
                  </Box>
                </Modal>
                {/* Modal to show Extra details of the gym (END) */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row-reverse" }}>
                  <Carousel sx={{ marginRight: "2rem", width: "60%", borderRadius: "1rem" }}>
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
                  <div style={{ flexGrow: 1 }}>
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
                      <Button
                        size="small"
                        onClick={() => handleOpenModal(result._id)}
                      >
                        More Details
                      </Button>
                      <Button
                        size="small"
                        onClick={() => handleOpenViewReviews(result._id)}
                      >
                        View Reviews
                      </Button>

                      {loggedState ? (
                        <Favorite
                          size="small"
                          gymId={result._id}
                          userId={cookie.LoggedUser[5]}
                        />
                          
                      ) : null
                      }
                    </CardActions>
                  </div>
                </div>
              </Card>
            </div>
          ))}
      </div>
    </>
  );
};
export default SearchCard;

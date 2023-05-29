import React, { useEffect, useState, useCallback  } from 'react';
import { useCookies } from 'react-cookie';
import './favorite.css';
import Aos from 'aos';
import "aos/dist/aos.css";

import {
    MDBBtn,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
} from "mdb-react-ui-kit";

import Box from "@mui/material/Box";
import Carousel from "react-material-ui-carousel"
import Modal from "@mui/material/Modal";
import { Typography } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { AiFillEye } from "react-icons/ai";
import Button from "@mui/material/Button";

import SideNavbar from "../Shared/SideNavbar.js";

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
    }
};

function FavoritedGyms() {
    const [cookie] = useCookies(['LoggedUser']);
    const [Favorites, setFavorites] = useState([]);
    const [openModalId, setOpenModalId] = useState(null);


    const [userId] = useState(cookie.LoggedUser[5]);

    const handleOpenModal = (id) => {
        setOpenModalId(id);
    };

    const handleCloseModal = () => {
        setOpenModalId(null);
    };



    const fetchFavoritedGym = useCallback(() => {
        Aos.init({ duration: 500 });
        fetch(`/api/favorite/get-favoritedGym/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                // console.log('Fetched data:', data);
                const { favorites } = data;
                setFavorites(favorites);
            });
    }, [userId]);

    useEffect(() => {
        fetchFavoritedGym();
    }, [fetchFavoritedGym]);

    const onClickDelete = (gymId, userId) => {

        const variables = {
            gymId: gymId,
            userId: userId,
        }

        fetch('/api/favorite/remove-favorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(variables),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchFavoritedGym();
                } else {
                    alert('Failed to Remove From Favorite');
                }
            });
    }

    return (
        <div>
            <div style={{ position: "fixed", zIndex: "1" }}>
                <SideNavbar userRole={cookie.LoggedUser[0]} />
            </div>
            <div style={{ paddingTop: '40px', paddingLeft: '50px', height: '650px' }}>
                <h1 style={{ color: 'white', textAlign: 'center' }}>My Favorite Gyms</h1>
                <hr style={{ borderTop: '5px solid white', width: '40%', fontWeight: 'bold', marginLeft: '30%' }} />

                <div style={{ paddingLeft: '25%', paddingTop: '4%' }}>

                    {Favorites.length > 0 ? (

                        <MDBTable style={{ width: '80%' }}>
                            <MDBTableHead style={{ background: 'black', color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
                                <tr>
                                    <th style={{ fontWeight: 'bold' }}></th>
                                    <th style={{ fontWeight: 'bold' }}>Gym Name</th>
                                    <th style={{ fontWeight: 'bold' }}>Location</th>
                                    <th style={{ fontWeight: 'bold' }}>Remove from Favorites</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {/* console.log(Favorites); */}
                                {Favorites.map((favorite, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'light-grey-row' : 'dark-grey-row'}>
                                        <td style={{ fontWeight: 'bold' }}>
                                            <Button style={{ color: 'black' }} onClick={() => handleOpenModal(favorite.gymId)}>
                                                <AiFillEye style={{ fontSize: '24px' }} />
                                            </Button>

                                        </td>
                                        <td style={{ fontSize: '18px', fontWeight: 'bold' }}>{favorite.gymId.gymName}</td>
                                        <td style={{ fontSize: '18px', fontWeight: 'bold' }}>{favorite.gymId.location}</td>
                                        <td>
                                            <MDBBtn
                                                style={{ backgroundColor: '#F49D1A', color: 'white', border: 'none' }}
                                                onClick={() => onClickDelete(favorite.gymId._id, favorite.userId)}
                                            >
                                                Remove

                                            </MDBBtn>
                                        </td>
                                    </tr>
                                ))}
                            </MDBTableBody>
                        </MDBTable>
                    ) : (
                        <section data-aos="fade-right" className="vh-800 gradient-custom">
                            <div className="container py-1 h-80" style={{ marginLeft: '-200px' }}>
                                <div className="row d-flex justify-content-center align-items-center h-600">
                                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                        <div className="card bg-white" style={{ borderRadius: '1rem' }}>
                                            <div className="card-body p-3 text-center">
                                                <div className="mb-md-2 mt-md-4 pb-2">
                                                    <br />
                                                    <br />
                                                    <h2 className="fw-bold mb-2 text-uppercase">
                                                        No favorite Gyms 😁
                                                    </h2>
                                                    <br />
                                                    <p style={{ fontSize: '18px' }}>You can add gyms to your favorite list</p>
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
                {/* Modal to show Extra details of the gym */}
                {Favorites.map((favorite) => (
                    <Modal
                        key={favorite.gymId}
                        open={openModalId === favorite.gymId}
                        onClose={handleCloseModal}
                        aria-labelledby={`modal-title-${favorite.gymId}`}
                        aria-describedby={`modal-description-${favorite.gymId}`}
                    >
                        <Box sx={styles.boxes}>
                            <Box sx={{ display: "flex", flexDirection: "row" }}>
                                <Typography
                                    id={`modal-title-${favorite.gymId}`}
                                    variant="h6"
                                    component="h2"
                                >
                                    {favorite.gymId.gymName}
                                </Typography>
                            </Box>
                            <Typography
                                id={`modal-description-${favorite.gymId}`}
                                sx={{ mt: 2 }}
                            >
                                Gym Owner's Name: {favorite.gymId.gymOwnerName}
                            </Typography>
                            <Typography
                                id={`modal-description-${favorite.gymId}`}
                                sx={{ mt: 2 }}
                            >
                                Gym Opening/Closing Time: {favorite.gymId.openingTime} - {favorite.gymId.closingTime}
                            </Typography>
                            <Typography
                                id={`modal-description-${favorite.gymId}`}
                                sx={{ mt: 2 }}
                            >
                                Gym Monthly Fee: {favorite.gymId.gymMonthlyFee}
                            </Typography>
                            <Typography
                                id={`modal-description-${favorite.gymId}`}
                                sx={{ mt: 2 }}
                            >
                                Gym Annual Fee: {favorite.gymId.gymAnnualFee}
                            </Typography>
                            <Typography
                                id={`modal-description-${favorite.gymId}`}
                                sx={{ mt: 2 }}
                            >
                                Gym Address: {favorite.gymId.gymAddress}
                            </Typography>
                            <Carousel sx={{ width: '400px' }}>
                                {favorite.gymId.images.map((image, index) => (
                                    <CardMedia
                                        key={index}
                                        component="img"
                                        height="150px"
                                        image={image}
                                        alt={favorite.gymId.gymName}
                                    />
                                ))}
                            </Carousel>
                        </Box>
                    </Modal>
                ))}
            </div>
        </div>
    );
}

export default FavoritedGyms;

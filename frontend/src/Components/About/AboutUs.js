import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { ToastContainer, toast } from "react-toastify";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import img1 from "../../Images/coach.png";

import Aos from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const itemData = [
    {
      img: "gym.png",
      title: "Mudith",
      author: "@bkristastucchio",
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: "",
      title: "Gimhani",
      author: "@rollelflex_graphy726",
    },
    {
      img: "",
      title: "Dilini",
      author: "@helloimnik",
    },
    {
      img: "",
      title: "Madara",
      author: "@nolanissac",
      cols: 2,
    },
    {
      img: "",
      title: "Vimukthi",
      author: "@hjrc33",
      cols: 2,
    },
    {
      img: "Images/coach.png",
      title: "Sachintha",
      author: "@arwinneil",
      rows: 2,
      cols: 2,
      featured: true,
    },
  ];

  return (
    <section data-aos="zoom-in">
      <ToastContainer />
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div
              className="card card-registration card-registration-2"
              style={{ borderRadius: "15px", backgroundColor: "transparent" }}
            >
              <div className="card-body p-0">
                <div className="row g-0 ">
                  <div className="col-lg-6 bg-partone">
                    <div className="p-5">
                      <h3 className="fw-normal mb-5">About Us&emsp;</h3>
                      <div>
                        <p>
                          {" "}
                          We are undergraduates of Bach. of Computer Science in
                          University of Ruhuna. In our final year group project
                          we develop a Online gym registration Platform for
                          every registered gym in Sri Lanka. In below there is
                          our tem memnbers.
                        </p>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline"></div>
                        </div>
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline"></div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4 pb-2"></div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline"></div>
                        </div>
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline"></div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4 pb-2"></div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-4 pb-2"></div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 bg-parttwo text-white">
                    <div className="p-5">
                      <h3 className="fw-normal mb-5">
                        Team Members&emsp;&emsp;
                      </h3>

                      <img className="img1" src={img1} alt="General Info" />
                      <img className="img1" src={img1} alt="General Info" />
                      <img className="img1" src={img1} alt="General Info" />
                      <img className="img1" src={img1} alt="General Info" />
                      <img className="img1" src={img1} alt="General Info" />
                      <img className="img1" src={img1} alt="General Info" />

                      <div className="row">
                        <div className="col-md-12 mb-4 pb-2">
                          <div className="form-outline form-white"></div>
                        </div>
                      </div>
                      <div className="form-outline form-white"></div>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

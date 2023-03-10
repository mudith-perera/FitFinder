import React, { useEffect } from "react";
import "./About.css";



import mudith1 from "../../Images/mudith.png";
import dilini from "../../Images/dilini.png";


import Aos from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  });
  

  return (
    <section data-aos="zoom-in">
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
                          Welcome to our project page! 
                          We are a group of dedicated Bachelor of Computer Science students from the University of Ruhuna, 
                          committed to creating innovative solutions that solve real-world problems.
                           With our passion for technology and our drive to make a difference, we have come together to develop this project. 
                           Our team consists of individuals with diverse backgrounds and areas of expertise, which allows us to approach 
                           problems from multiple angles and come up with creative solutions. We have worked tirelessly on this project 
                            to ensure that it meets the highest standards of quality and functionality.
                           We are excited to share our project with you and hope that you find it informative and useful.
                        </p>
                      </div>
                       </div>
                  </div>

                  <div className="col-lg-6 bg-parttwo text-white">
                    <div className="p-5">
                      <h3 className="fw-normal mb-5">
                        Team <span style={{color:"#6a11cb"}}>M</span>embers&emsp;&emsp;
                      </h3>
                      <img className="img2" src={mudith1} alt="General Info" /> 
                      <img className="img2" src={dilini} alt="General Info" />
                      <img className="img2" src={dilini} alt="General Info" />
                      <img className="img2" src={dilini} alt="General Info" />
                      <img className="img2" src={dilini} alt="General Info" />
                      <img className="img2" src={dilini} alt="General Info" />
                  
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

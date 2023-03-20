import React, { useEffect } from "react";
import "./About.css";
import { MDBRow, MDBCol, MDBInput, MDBCheckbox, MDBBtn, MDBValidation, MDBValidationItem, MDBTextArea } from 'mdb-react-ui-kit';



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
                  <div className="col-lg-6 bg-part-one">
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

                  <div className="col-lg-6 bg-part-two text-white">
                    <div className="p-5">
                      <h3 className="fw-normal mb-5">
                        Team <span style={{ color: "#6a11cb" }}>M</span>embers&emsp;&emsp;
                      </h3>
                      <img className="img2" src={mudith1} alt="General Info" />
                      <img className="img2" src={dilini} alt="General Info" />
                      <img className="img2" src={dilini} alt="General Info" />
                      <img className="img2" src={dilini} alt="General Info" />
                      <img className="img2" src={dilini} alt="General Info" />
                      <img className="img2" src={dilini} alt="General Info" />

                    </div>
                  </div>
                  <div className="col-lg-6 bg-part-four text-white">
                    <div className="p-5">
                      <h3 className="fw-normal mb-5">Where we are&emsp;</h3>
                      <div>
                        <MDBRow className='w-100'>
                          <MDBCol className='my-4'>
                            <iframe
                              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.40994407125!2d80.57394571586256!3d5.938097431336243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae1391b4a29e707%3A0xd54277175e326bc2!2sUniversity%20of%20Ruhuna!5e0!3m2!1sen!2slk!4v1678863583832!5m2!1sen!2slk'
                              className='w-100'
                              title="Google Maps Embed for Nassau, Bahamas"
                              height='300'
                              loading='lazy'
                            ></iframe>
                          </MDBCol>
                        </MDBRow>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 bg-part-five">
                    <div className="p-5">
                      <h3 className="fw-normal mb-5">
                        Contact <span style={{ color: "#6a11cb" }}>U</span>s&emsp;&emsp;
                      </h3>
                      <MDBValidation noValidate id='form' className='text-center' style={{ width: '100%' }}>

                        <MDBValidationItem invalid feedback='Please provide your name.'>
                          <MDBInput label='Name' v-model='name' wrapperClass='mb-4' required />
                        </MDBValidationItem>

                        <MDBValidationItem invalid feedback='Please provide your email.'>
                          <MDBInput type='email' label='Email address' v-model='email' wrapperClass='mb-4' required />
                        </MDBValidationItem>

                        <MDBValidationItem invalid feedback='Please provide mail subject.'>
                          <MDBInput label='Subject' v-model='subject' wrapperClass='mb-4' required />
                        </MDBValidationItem>

                        <MDBValidationItem invalid feedback='Please provide a message text.'>
                          <MDBTextArea wrapperClass='mb-4' label='Message' required />
                        </MDBValidationItem>

                        <MDBValidationItem feedback=''>
                          <MDBCheckbox wrapperClass='d-flex justify-content-center' label='Send me copy' />
                        </MDBValidationItem>

                        <MDBBtn type='submit' color='primary' block className='my-4'>
                          Send
                        </MDBBtn>
                      </MDBValidation>

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

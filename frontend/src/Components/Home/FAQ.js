import React, { useState, useEffect } from "react";
import "./FAQ.css";

import {
  MDBBtn,
  MDBInput,
  MDBRow,
  MDBTextArea,
  MDBTypography,
} from "mdb-react-ui-kit";

import { MDBAccordion, MDBAccordionItem, MDBContainer } from 'mdb-react-ui-kit';

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FAQ = () => {
  const[email,setEmail] = useState('')
  const[userQuection, setMessage] = useState('')
  const [data, setData] = useState([]);

  const handleFNQ = async (e) => {
    e.preventDefault()

      //user account create success alert
  const userSuccess = () => {
    toast.success("We are looking to your question.. 🤞", {
      theme: "colored",
      position: toast.POSITION.TOP_LEFT,
    });
  };

  //user account create error alert
  const userError = (error) => {
    toast.error("Something Wrong 😢 ", {
      theme: "colored",
      position: toast.POSITION.TOP_LEFT,
    });
  };

    const formData = {email,userQuection}
    const response = await fetch('/api/faq/', {
      method : 'POST',
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
      userError(json.error);
    }
    if (response.ok) {
      console.log("added");
      userSuccess();
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/faq');
      setData(result.data);
    };
    fetchData();
  }, []);

    // filter data based on whether the question has an answer or not
    const answeredData = data.filter(item => item.answer);

    // get the last 4 items from the filtered data
    const lastFourData = answeredData.slice(-4);

  return (
    <React.Fragment>
      <ToastContainer />
      <MDBContainer className="mt-5" style={{maxWidth: '1000px'}}>
        <section>
          <MDBContainer>
            <MDBTypography
              tag="h1"
              className="text-center mb-4 pb-2 fw-bold "
            >
              Frequently Asked Questions
            </MDBTypography>
          </MDBContainer>
          <MDBAccordion borderless initialActive={1}>
          {/* {data.slice(0, 4).map((item) => (
              <MDBAccordionItem key={item._id} collapseId={item._id} headerTitle={item.userQuection}>
                
                <div className="accordion-body">{item.answer}</div>
              </MDBAccordionItem>
            ))} */}
            {lastFourData.map((item) => (
              <MDBAccordionItem key={item._id} collapseId={item._id} headerTitle={item.userQuection}>
                <div className="accordion-body">{item.answer}</div>
              </MDBAccordionItem>
            ))}
          </MDBAccordion>
          
        </section>
      </MDBContainer>

      <section >
        
        <div className="container w-50 py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            
              <div
                className="card card-registration card-registration-2"
                style={{ borderRadius: "15px" }}
              >
                <MDBRow className='mb-3'>
              <div>
            
              <p>
                <span className="fw-bold">
                  Still have any questions? Contact us to get your answer!
                </span>
              </p>
    
              <form onSubmit={handleFNQ}>
                <MDBInput label="Email address" required className="mb-4" 
                onChange={(e) => setEmail(e.target.value)}
                />
                <MDBTextArea rows={4} label="Message" className="mb-4" 
                onChange={(e) => setMessage(e.target.value)}
                />
                <MDBBtn block>Send</MDBBtn>
              </form>
            </div>
          </MDBRow>
              </div>
            
          </div>
        </div>
        
      </section>

    </React.Fragment>
  );
};

export default FAQ;
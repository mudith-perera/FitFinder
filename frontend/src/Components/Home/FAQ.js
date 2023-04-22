import React, { useState } from "react";
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


const FAQ = () => {

    const[email,setEmail] = useState('')
    const[userQuection, setMessage] = useState('')
    //const [error, setError] = useState(null)

    const handleFNQ = async (e) => {
      e.preventDefault()

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
      //setError(json.message);
      console.log(json.error);
    }
    if (response.ok) {
      console.log("added");
      

      //setCookieAndNavigate(loggedUserDetails);
    }

    }

    return (
      <React.Fragment>
      
      <MDBContainer className="mt-5" style={{maxWidth: '1000px'}}>
        <section>
        
            {/* <MDBCol lg="6" md="12" className="mb-4"> */}
            <MDBContainer>
  
            <MDBTypography
            tag="h1"
            className="text-center mb-4 pb-2 fw-bold "
          >
            Freaquently Ask Question
          </MDBTypography>
  
            <MDBAccordion borderless initialActive={1}>
        <MDBAccordionItem collapseId={1} headerTitle='Accordion Item #1'>
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
          moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
          Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
          shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
          proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
          aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
        </MDBAccordionItem>
        <MDBAccordionItem collapseId={2} headerTitle='Accordion Item #2'>
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
          moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
          Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
          shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
          proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
          aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
        </MDBAccordionItem>
        <MDBAccordionItem collapseId={3} headerTitle='Accordion Item #3'>
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
          moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
          Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
          shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
          proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
          aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
        </MDBAccordionItem>
        <MDBAccordionItem collapseId={4} headerTitle='Accordion Item #3'>
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
          moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
          Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
          shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
          proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
          aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
        </MDBAccordionItem>
      </MDBAccordion>
      </MDBContainer>
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
          {/* <MDBCol lg="6" md="12" className="text-center"> */}
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
}
export default FAQ;
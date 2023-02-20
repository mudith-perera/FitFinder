import React, {useEffect}  from 'react';
import Carousel from 'react-bootstrap/Carousel';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { BsFilter } from 'react-icons/bs';
import HomeCard from './SearchCard';

import Aos from "aos";
import "aos/dist/aos.css";

import first from '../../Images/gym1.png';
import sec from '../../Images/gym2.png';
import third from '../../Images/gym3.png';

    const SearchResultMain = () => {
        useEffect(() => {
            Aos.init({ duration: 300});
          });
          return(
            <div data-aos="zoom-in-up" className = "container">
              
               {/* <Carousel className='py-2'>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={sec}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={first}
                    alt="Second slide"
                    />
        
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={third}
                    alt="Third slide"
                    />
        
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
                
                </Carousel>  */}
                
                    <div data-aos="fade-up"><HomeCard/></div>
              </div>
          );
    }

    export default SearchResultMain;
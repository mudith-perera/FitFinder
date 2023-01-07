///////////////////////////////// Created By Mudith Perera //////////////////////////////

import React from 'react';
import {Link} from 'react-router-dom';
import img from '../Images/logo.png'
import {
  FooterContainer,
  FooterSection,
  FooterRightColumn,
  FooterLeftColumn,
  Logo,
  Link1,
  Links,
  HR,
  Text,
  Name,
  H1,
  Image,
  SubSection,
  Span,
  Copyright
} from "./StyleElements/FooterElements.js";


export default function App() {
  return (
    <FooterContainer>
      <FooterSection>
        <Logo>
          <Image src={img}/>
        </Logo>
        <Name>
          <H1> Something</H1>
        </Name>
      </FooterSection>
      <SubSection>
        <FooterSection>
          <FooterLeftColumn>
            <HR/>
            <Links>
              <Link1 className="FooterLink">
                <Link to = "/uc" style={{color:"inherit", textDecoration: 'none'}}>
                  Privacy
                <Span className="Ho" ></Span>
                </Link>
              </Link1>
              <Link1 className="FooterLink">
                <Link to = "/uc" style={{color:"inherit", textDecoration: 'none'}}>
                  FnQ
                <Span className="Ho"></Span>
                </Link>
              </Link1>
              <Link1 className="FooterLink">
                <Link to = "/uc" style={{color:"inherit", textDecoration: 'none'}}>
                  About Us
                <Span className="Ho"></Span>
                </Link>
              </Link1>
              <Link1 className="FooterLink">
                <Link to = "/uc" style={{color:"inherit", textDecoration: 'none'}}>
                  Contact Us
                <Span className="Ho"></Span>
                </Link>
              </Link1>
            </Links>
          </FooterLeftColumn>
          <FooterRightColumn>
            <HR/>
            <Text>
            <h4>Our Mission</h4>
            blabla bla bla bla blabla bla bla bla blabla bla bla bla blabla bla bla bla blabla bla bla bla blabla bla bla bla blabla bla bla bla blabla bla bla bla blabla bla bla bla blabla bla bla bla blabla bla bla bla
            </Text>
          </FooterRightColumn>
        </FooterSection>
      </SubSection>
      <FooterSection>
        <Copyright>
        <p>©{new Date().getFullYear()} Group 2 | All Rights Reserved. </p>
        </Copyright>
        
      </FooterSection>
    </FooterContainer>
  );
}
///////////////////////// Developer       : Mudith Perera  /////////////////////////
///////////////////////// Modified Date   : 07-02-2023     /////////////////////////
/////////////////////////           (START)                /////////////////////////

import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../index.css";
import "./StyleElements/LoginButton.css";
import { Link } from "react-router-dom";

import { Link1, Span } from "./StyleElements/NavBarElements.js";

import { useCookies } from "react-cookie";

import FitfindertextLogo from "./../Images/fitfindertext.png";

function NavBar() {
  const [cookie] = useCookies([""]);
  const [email] = useState(cookie.LoggedUser ? cookie.LoggedUser[4] : "");
  const [userType] = useState(cookie.LoggedUser ? cookie.LoggedUser[0] : "");
  function removeCookie() {
    removeCookie("LoggedUser");
  }
  return (
    <Navbar bg="myNavColor" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand style={{ color: "white" }} href="/">
          <img
            src={FitfindertextLogo}
            style={{ width: "200px" }}
            alt="fitfinder"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-4 my-lg-2 mx-auto"
            style={{ maxHeight: "250px" }}
          >
            <Nav.Link className="mx-auto" href="/" style={{ color: "white" }}>
              <Link1>
                Home<Span className="Ho me-5"></Span>
              </Link1>
            </Nav.Link>
            <Nav.Link></Nav.Link>
            <Nav.Link></Nav.Link>
            <Nav.Link></Nav.Link>
            <Nav.Link></Nav.Link>
            <Nav.Link
              className="mx-auto"
              style={{ color: "white" }}
              href="/faq"
            >
              <Link1>
                faq<Span className="Ho"></Span>
              </Link1>
            </Nav.Link>
            <Nav.Link></Nav.Link>
            <Nav.Link></Nav.Link>
            <Nav.Link></Nav.Link>
            <Nav.Link></Nav.Link>
            <Nav.Link
              className="mx-auto"
              style={{ color: "white" }}
              href="/about-us"
            >
              <Link1>
                About Us<Span className="Ho"></Span>
              </Link1>
            </Nav.Link>
          </Nav>
          <Navbar.Brand>
            {email && userType === "member" ? (
              <Link to={"/member-home"} className="button-6 ">
                Profile
              </Link>
            ) : email && userType === "coach" ? (
              <Link to={"/coach-home"} className="button-6 ">
                Profile
              </Link>
            ) : (
              <Link to={"sign-up"} className="button-6 ">
                SignUp
              </Link>
            )}
          </Navbar.Brand>
          <Navbar.Brand>
            {email ? (
              <Link to={"/login"} className="button-6 " onClick={removeCookie}>
                Logout
              </Link>
            ) : (
              <Link to={"/login"} className="button-6 ">
                Login
              </Link>
            )}
          </Navbar.Brand>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;

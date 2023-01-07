///////////////////////////////// Created By Mudith Perera //////////////////////////////

import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../index.css";
import "./StyleElements/LoginButton.css";
import { Link } from "react-router-dom";

import { Link1, Span } from "./StyleElements/NavBarElements.js";

function NavBar() {
  return (
    <Navbar bg="myNavColor" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand style={{ color: "white" }} href="/">
          Something
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="navbarScroll"
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-4 my-lg-2" style={{ maxHeight: "250px" }}>
            <Nav.Link href="/" style={{ color: "white" }}>
              <Link1>
                Home<Span className="Ho me-5"></Span>
              </Link1>
            </Nav.Link>
            <Nav.Link style={{ color: "white" }} href="/uc">
              <Link1>
                fnq<Span className="Ho"></Span>
              </Link1>
            </Nav.Link>
            <Nav.Link style={{ color: "white" }} href="/uc">
              <Link1>
                About Us<Span className="Ho"></Span>
              </Link1>
            </Nav.Link>
          </Nav>
          <Navbar.Brand>
              <Link to={"sign-up"} className="button-6 ">
                SignUp
              </Link>
            </Navbar.Brand>
            <Navbar.Brand>
              <Link to={"/login"} className="button-6 ">
                Login
              </Link>
            </Navbar.Brand>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;

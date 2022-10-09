import React from "react";
//import {Link} from "react-router-dom"
import "./header.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from "../assets/homi-icon.png"

//put a nice navbar in here
function Header() {
  return (
    <div className="Header">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/" className="Logo">
            <img
              src={Logo}
              width="100"
              height="100"
              className="d-inline-block align-top"
              alt="Homi Hub Logo"
            />
          </Navbar.Brand>
          <Navbar.Brand href="/" className="LogoText">Homi Hub</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/Mealchooser">Mealchooser</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
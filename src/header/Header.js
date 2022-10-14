import React from "react";
import "./header.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from "../assets/homi-icon.png"
import { useAuth } from "../components/auth";
import { signOut } from "firebase/auth";
import { auth as fireBaseAuth } from "../components/firebase";

//react bootstrap navbar
function Header() 
{
  const auth = useAuth();

  const logout = async () => {
    await signOut(fireBaseAuth);
    auth.logout();
  };

  function printAuth () {
    console.log(auth.user);
  }

  return (
    <div className="Header">
    <button onClick={printAuth}>getAuth</button>
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
                  <Nav.Link href="/tracker">GPS</Nav.Link>
                  <Nav.Link href="#link">Link</Nav.Link>
                  {!auth.user && (<Nav.Link href="/login">Log in</Nav.Link>)}
                  {auth.user && (<Nav.Link onClick={logout} href="/login">Log out</Nav.Link>)}
                </Nav>
              </Navbar.Collapse>
          </Container>
       </Navbar>
    </div>
  );
}

export default Header;
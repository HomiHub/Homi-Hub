import React from "react";
import "./header.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from "../assets/homi-icon.png"
import { useAuth } from "../components/auth";
import { signOut } from "firebase/auth";
import { auth as fireBaseAuth } from "../components/firebase";
import { Link} from "react-router-dom";

//react bootstrap navbar
function Header() 
{
  const auth = useAuth();

  const logout = async () => {
    await signOut(fireBaseAuth);
    auth.logout();
  };

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
                  {!auth.user && (<Link to="/" style={{ textDecoration: 'none', margin: '12px', color: 'rgba(0,0,0,.55)' }}>Home</Link>)}
                  {auth.user && (<Link to="/family-homepage" style={{ textDecoration: 'none', margin: '12px', color: 'rgba(0,0,0,.55)' }}>Family Page</Link>)}
                  <Link to="/customer-support" style={{ textDecoration: 'none', margin: '12px', color: 'rgba(0,0,0,.55)' }}>Customer Support</Link>
                  {!auth.user && (<Link to="/" style={{ textDecoration: 'none', margin: '12px', color: 'rgba(0,0,0,.55)' }}>Log in</Link>)}
                  {auth.user && (<Link onClick={logout} to="/" style={{ textDecoration: 'none', margin: '12px', color: 'rgba(0,0,0,.55)' }}>Log out</Link>)}
                </Nav>
              </Navbar.Collapse>
          </Container>
       </Navbar>
    </div>
  );
}

export default Header;
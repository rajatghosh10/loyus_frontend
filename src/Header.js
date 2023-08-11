import React from 'react';
import './App.css';
import './Header.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className="container2 container-fluid" style={{ backgroundColor: 'green' }}>
        <div className="container1 container-fluid">
          <Navbar expand="lg" className="bg-body-primary">
            <Container fluid>
              <Navbar.Brand href="#" style={{ color: 'yellow', fontFamily: 'cursive', fontWeight: 600, fontStretch: 400, fontSize: 30 }}>
                POWERPLUS365
                <br />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search Events"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button style={{ color: 'white' }}>Search</Button>
                </Form>
                <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                  <Link to="login" style={{ color: 'white', marginLeft: " 10px" }}>
                    Login
                  </Link>
                  <Link to="signup" style={{ color: 'white', marginLeft: "10px" }}>
                    Sign up
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <span className="date-timer container-fluid" style={{ color: 'yellow', marginLeft: '10px', fontSize: '14px' }}>
          {currentDateTime.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default Header;

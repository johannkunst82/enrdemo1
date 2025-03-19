import "./HeaderComp.css";

import Container from 'react-bootstrap/Container';
import Logo from './assets/Logo_EnerNavi.png'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';

// import React from 'react';
// import { useState } from 'react';

export default function HeaderComp() {

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/"><img src={Logo} width="120px" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"  />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link target='_blank' href="https://www.gesetze-im-internet.de/eeg_2014/">Arbeitsraum</Nav.Link>
              <NavDropdown title="Gesetze" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Gesetz 1</NavDropdown.Item>
                <NavDropdown.Item target='_blank' href="#action/3.2">Gesetz 2
                </NavDropdown.Item>
                <NavDropdown.Item target='_blank' href="#action/3.3">Gesetz 3</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item target='_blank' href="https://www.gesetze-im-internet.de/eeg_2014/__21.html">Gesetz für den Ausbau erneuerbarer Energien</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Hilfe" id="isHelp-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Benutzerhandbuch</NavDropdown.Item>
                <NavDropdown.Item target='_blank' href="/about">FAQ</NavDropdown.Item>
                <NavDropdown.Item target='_blank' href="/about">Tutorials</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item target='_blank' href="/about">Version 1.3.1</NavDropdown.Item>
              </NavDropdown>

            </Nav>
          </Navbar.Collapse>


          
        </Container>
      </Navbar>
  
    );
}
 
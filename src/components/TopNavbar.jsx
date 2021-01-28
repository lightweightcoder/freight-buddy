import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function TopNavbar({ user }) {
  const loggedInNavbar = (
    <Navbar collapseOnSelect expand="md" bg="light" variant="light" className="top-navbar">
      <Navbar.Brand href="#home">
        <img
          src="/package.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Freight Buddy"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav id="items">
          <Nav.Link href="#Requests">Requests</Nav.Link>
          <Nav.Link href="#Favours">Favours</Nav.Link>
          <Nav.Link href="#Create-Request">Create Request</Nav.Link>
          <Nav.Link href="#Profile">Profile</Nav.Link>
          <Nav.Link href="#Logout">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

  return (
    <div>
      {loggedInNavbar}
    </div>
  );
}

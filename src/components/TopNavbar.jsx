import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function TopNavbar({ user, setPage }) {
  // handle to set the state of the page to display a form to create a request
  // this occurs when a user clicks on the create request link in the navbar
  const handleSetCreateRequestPage = () => {
    setPage('CREATE_REQUEST');
  };

  const loggedInNavbar = (
    <Navbar collapseOnSelect expand="md" bg="light" variant="light" className="top-navbar">
      <Navbar.Brand href="/">
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
          <Nav.Link href="#" onClick={handleSetCreateRequestPage}>Create Request</Nav.Link>
          <Nav.Link href="#Profile">Profile</Nav.Link>
          <Nav.Link href="#Logout">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

  const loggedOutNavbar = (
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
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

  return (
    <div>
      {user ? loggedInNavbar : loggedOutNavbar}
    </div>
  );
}

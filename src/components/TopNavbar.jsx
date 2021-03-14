/* eslint-disable react/prop-types */
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import axios from 'axios';

export default function TopNavbar({
  // eslint-disable-next-line max-len
  user, handleSetCreateRequestPage, handleSetViewRequestsPage, handleSetViewFavoursPage, handleLogout, handleViewHomePage,
}) {
  // handle when user clicks on demo login link
  const handleDemoLoginLinkClick = () => {
    // send an axios request to the express server to set cookies in the browser for a demo user
    axios.get('/demo-login')
      .then((result) => {
        console.log('demo-login result is', result.data);

        // if login is a success
        if (result.data.loginSuccess) {
          // reload the page
          window.location.assign('/');
        } else {
          // let user know that something is wrong with demo login
          // eslint-disable-next-line no-alert
          alert('Sorry demo login is unavailable now. Please register instead.');
        }
      })
      .catch((error) => {
        console.log('demo login error', error);

        // let user know that something is wrong with demo login
        // eslint-disable-next-line no-alert
        alert('Sorry demo login is unavailable now. Please register instead.');
      });
  };
  const loggedInNavbar = (
    <Navbar collapseOnSelect expand="md" bg="light" variant="light" className="top-navbar">
      <Navbar.Brand href="#home" onClick={handleViewHomePage}>
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
          <Nav.Link href="#Requests" onClick={handleSetViewRequestsPage}>Requests</Nav.Link>
          <Nav.Link href="#Favours" onClick={handleSetViewFavoursPage}>Favours</Nav.Link>
          <Nav.Link href="#Create" onClick={handleSetCreateRequestPage}>Create Request</Nav.Link>
          <Nav.Link href="#Logout" onClick={handleLogout}>Logout</Nav.Link>
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
          <Nav.Link href="#" onClick={handleDemoLoginLinkClick}>Demo Login</Nav.Link>
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

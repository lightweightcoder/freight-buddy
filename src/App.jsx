/* eslint-disable max-len */
import React, { useState } from 'react';
import axios from 'axios';

// import components
import AppErrorBoundary from './components/AppErrorBoundary.jsx';
import TopNavbar from './components/TopNavbar.jsx';
import HomePage from './components/HomePage.jsx';
import RequestHelperView from './components/RequestHelperView.jsx';

// states to determine which components to load
const pages = {
  HOME: 'HOME',
  SHOW_REQUEST_HELPER_VIEW: 'SHOW_REQUEST_HELPER_VIEW',
};

export default function App() {
  const [page, setPage] = useState(pages.HOME);
  const [user, setUser] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // get the details of the selected request, then set the state of the page to
  // to display the request details
  // this occurs when a potential helper clicks on a request at the homepage
  const selectAndViewARequestPageHelper = (id) => {
    // get the request's details from the DB and set it in selectedRequest variable
    axios.get(`/requests/${id}`)
      .then((result) => {
        console.log('request/:id result is', result);

        // set the request's details
        setSelectedRequest(result.data.request);
      })
      .catch((error) => {
        // handle error
        console.log('get a request details error', error);
      });

    // set the page to view the selected request's details
    setPage(pages.SHOW_REQUEST_HELPER_VIEW);
  };

  // change the status of the selected request in the DB and state variable
  // change is made based on the button text of the button that triggered this function
  const changeSelectedRequestStatus = (buttonText) => {
    // the new status of the request to be updated
    let newStatus;

    // determine the new status
    if (buttonText === 'offer help') {
      newStatus = 'accepted';
    } else if (buttonText === 'sent for shipping') {
      newStatus = 'shipped';
    } else if (buttonText === 'withdraw help') {
      // this occurs when a helper clicks on the withdraw help button
      // new status of request is requested so other potential helper can accept the request
      newStatus = 'requested';
    }

    // make axios request to change the status in the DB
    axios.put(`/requests/${selectedRequest.id}/status`, { newStatus })
      .then((result) => {
        console.log('request/:id/status result is', result);

        // set the request's details
        setSelectedRequest(result.data.updatedRequest);
      })
      .catch((error) => {
        // handle error
        console.log('get a request details error', error);

        // redirect user to login page as user tried to access a forbidden page
        if (error.message === 'Request failed with status code 403') {
          window.location.assign('/login');
        }
      });
  };

  return (
    <div>
      <AppErrorBoundary>
        <TopNavbar user={user} setPage={setPage} />
        {(page === pages.HOME) ? <HomePage setUser={setUser} selectAndViewARequestPageHelper={selectAndViewARequestPageHelper} /> : ''}
        {(page === pages.SHOW_REQUEST_HELPER_VIEW ? <RequestHelperView selectedRequest={selectedRequest} changeSelectedRequestStatus={changeSelectedRequestStatus} /> : '')}
      </AppErrorBoundary>
    </div>
  );
}

/* eslint-disable max-len */
import React, { useState } from 'react';
import axios from 'axios';

// import components
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
      });

    // set the page to view the selected request's details
    setPage(pages.SHOW_REQUEST_HELPER_VIEW);
  };

  return (
    <div>
      <TopNavbar user={user} setPage={setPage} />
      {(page === pages.HOME) ? <HomePage setUser={setUser} selectAndViewARequestPageHelper={selectAndViewARequestPageHelper} /> : ''}
      {(page === pages.SHOW_REQUEST_HELPER_VIEW ? <RequestHelperView selectedRequest={selectedRequest} /> : '')}
    </div>
  );
}

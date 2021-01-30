/* eslint-disable max-len */
import React, { useState } from 'react';

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
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  // set a selected request id, then set the state of the page to
  // to display the request details
  // this occurs when a potential helper clicks on a request at the homepage
  const selectAndViewARequestPageHelper = (id) => {
    setSelectedRequestId(id);

    setPage(pages.SHOW_REQUEST_HELPER_VIEW);
  };

  return (
    <div>
      <TopNavbar user={user} setPage={setPage} />
      {(page === pages.HOME) ? <HomePage setUser={setUser} setSelectedRequestId={setSelectedRequestId} selectAndViewARequestPageHelper={selectAndViewARequestPageHelper} /> : ''}
      {(page === pages.SHOW_REQUEST_HELPER_VIEW ? <RequestHelperView requestId={selectedRequestId} /> : '')}
    </div>
  );
}

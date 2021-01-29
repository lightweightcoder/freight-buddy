/* eslint-disable max-len */
import React, { useState } from 'react';

// import components
import TopNavbar from './components/TopNavbar.jsx';
import HomePage from './components/HomePage.jsx';

// states to determine which components to load
const pages = {
  HOME: 'HOME',
  SHOW_REQUEST: 'SHOW_REQUEST',
};

export default function App() {
  const [page, setPage] = useState(pages.HOME);
  const [user, setUser] = useState(null);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  // set a selected request id, then set the state of the page to
  // to display the request details
  // this occurs when the user clicks on a request
  const selectAndViewARequestPage = (id) => {
    setSelectedRequestId(id);

    setPage(pages.SHOW_REQUEST);
  };

  return (
    <div>
      <TopNavbar user={user} setPage={setPage} />
      {(page === pages.HOME) ? <HomePage setUser={setUser} setSelectedRequestId={setSelectedRequestId} selectAndViewARequestPage={selectAndViewARequestPage} /> : ''}
    </div>
  );
}

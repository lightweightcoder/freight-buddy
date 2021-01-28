import React, { useState } from 'react';

// import components
import Navbar from './components/Navbar.jsx';

// states to determine which components to load
const pages = {
  HOME: 'home',
};

export default function App() {
  const [page, setPage] = useState(pages.HOME);
  const [user, setUser] = useState(null);

  // after app component renders for the 1st time, get a list of requests (of status 'requested')
  // for the home page
  return (
    <div>
      <Navbar user={user} setPage={setPage} />
    </div>
  );
}

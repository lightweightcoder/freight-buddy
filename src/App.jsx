import React, { useState } from 'react';

// import components
import TopNavbar from './components/TopNavbar.jsx';
import HomePage from './components/HomePage.jsx';

// states to determine which components to load
const pages = {
  HOME: 'home',
};

export default function App() {
  const [page, setPage] = useState(pages.HOME);
  const [user, setUser] = useState(null);

  return (
    <div>
      <TopNavbar user={user} setPage={setPage} />
      <HomePage setUser={setUser} />
    </div>
  );
}

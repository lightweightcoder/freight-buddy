import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function HomePage({ setUser }) {
  const [requests, setRequests] = useState(null);

  // when home page renders for the 1st time, get a list of requests (of status 'requested')
  useEffect(() => {
    axios.get('/requests')
      .then((result) => {
        console.log(result);
        // setItems(result.data.items);
      });
  }, []);

  return (
    <div />
  );
}

/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import 'react-multi-carousel/lib/styles.css';
import RequestCard from './RequestCard.jsx';

export default function HomePage({ setUser, selectAndViewARequestPageHelper }) {
  const [requests, setRequests] = useState(null);

  // when home page renders for the 1st time, get a list of requests (of status 'requested')
  useEffect(() => {
    axios.get('/requests')
      .then((result) => {
        console.log(result);

        // set the requests
        setRequests(result.data.requestsList);
        // set the user
        setUser(result.data.user);
      })
      .catch((error) => {
        // handle error
        console.log('get a list of available requests error', error);
      });
  }, []);

  if (requests === null) {
    return <div />;
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          {requests.map((request) => (
            // eslint-disable-next-line max-len
            <RequestCard key={request.id} photo={(request.productPhotos.length > 0) ? request.productPhotos[0].filename : 'https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg'} productName={request.productName} price={request.price} country={request.country.name} id={request.id} selectAndViewARequestPageHelper={selectAndViewARequestPageHelper} />
          ))}
        </div>
      </div>
    </div>
  );
}

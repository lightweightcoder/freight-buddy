/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
// import 'react-multi-carousel/lib/styles.css';
import RequestCard from './RequestCard.jsx';

export default function HomePage({ selectAndViewARequestPageHelper, availableRequests }) {
  if (availableRequests === null) {
    return <div />;
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          {availableRequests.map((request) => (
            // eslint-disable-next-line max-len
            <RequestCard key={request.id} photo={(request.productPhotos.length > 0) ? request.productPhotos[0].filename : 'https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg'} productName={request.productName} price={request.price} country={request.country.name} id={request.id} selectAndViewARequestPageHelper={selectAndViewARequestPageHelper} />
          ))}
        </div>
      </div>
    </div>
  );
}

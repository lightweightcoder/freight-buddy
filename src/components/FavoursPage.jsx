/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

export default function FavoursPage({ userFavours, selectAndViewARequestPageHelper }) {
  const [requestedStatusBorderClass, setRequestedStatusBorderClass] = useState('bottom-border');
  const [acceptedStatusBorderClass, setAcceptedStatusBorderClass] = useState('');
  const [shippedStatusBorderClass, setShippedStatusBorderClass] = useState('');
  const [completedStatusBorderClass, setCompletedStatusBorderClass] = useState('');
  const [cancelledStatusBorderClass, setCancelledStatusBorderClass] = useState('');
  const [selectedFavours, setSelectedFavours] = useState(userFavours.requested);

  const handleRequestedStatusClick = () => {
    setRequestedStatusBorderClass('bottom-border');
    setAcceptedStatusBorderClass('');
    setShippedStatusBorderClass('');
    setCompletedStatusBorderClass('');
    setCancelledStatusBorderClass('');
    setSelectedFavours(userFavours.requested);
  };

  const handleAcceptedStatusClick = () => {
    setRequestedStatusBorderClass('');
    setAcceptedStatusBorderClass('bottom-border');
    setShippedStatusBorderClass('');
    setCompletedStatusBorderClass('');
    setCancelledStatusBorderClass('');
    setSelectedFavours(userFavours.accepted);
  };

  const handleShippedStatusClick = () => {
    setRequestedStatusBorderClass('');
    setAcceptedStatusBorderClass('');
    setShippedStatusBorderClass('bottom-border');
    setCompletedStatusBorderClass('');
    setCancelledStatusBorderClass('');
    setSelectedFavours(userFavours.shipped);
  };

  const handleCompletedStatusClick = () => {
    setRequestedStatusBorderClass('');
    setAcceptedStatusBorderClass('');
    setShippedStatusBorderClass('');
    setCompletedStatusBorderClass('bottom-border');
    setCancelledStatusBorderClass('');
    setSelectedFavours(userFavours.completed);
  };

  const handleCancelledStatusClick = () => {
    setRequestedStatusBorderClass('');
    setAcceptedStatusBorderClass('');
    setShippedStatusBorderClass('');
    setCompletedStatusBorderClass('');
    setCancelledStatusBorderClass('bottom-border');
    setSelectedFavours(userFavours.cancelled);
  };

  // JSX for selected requests
  // returns nothing if array is empty
  const selectedFavoursJSX = selectedFavours.map((favour) => (
    <div className="row d-flex justify-content-center" key={favour.id}>
      <div className="col-12 col-sm-10 col-md-8 col-lg-6">
        <a className="request-anchor" href="#request" onClick={() => selectAndViewARequestPageHelper(favour.id)}>
          <div className="container border requests-page-request-container">
            <div className="row">
              <div className="col-3 requests-page-request-col">
                <img className="rounded border border-secondary img-fluid" src={(favour.productPhotos.length > 0) ? favour.productPhotos[0].filename : 'https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg'} alt="product" />
              </div>
              <div className="col-9 d-flex flex-column justify-content-center">
                <p>{favour.productName}</p>
                <p className="request-price">{`$${favour.price}`}</p>
                <p className="request-requester-name">
                  {'Requester: '}
                  {favour.requester.name}
                </p>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  ));

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <h4>Favours</h4>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-sm-9 col-md-6 d-flex justify-content-center" id="statuses-navbar">
            <button className={requestedStatusBorderClass} onClick={handleRequestedStatusClick} type="button">
              requested
            </button>
            <button className={acceptedStatusBorderClass} onClick={handleAcceptedStatusClick} type="button">
              accepted
            </button>
            <button className={shippedStatusBorderClass} onClick={handleShippedStatusClick} type="button">
              shipped
            </button>
            <button className={completedStatusBorderClass} onClick={handleCompletedStatusClick} type="button">
              completed
            </button>
            <button className={cancelledStatusBorderClass} onClick={handleCancelledStatusClick} type="button">
              cancelled
            </button>
          </div>
        </div>
      </div>

      <div className="container" id="requests-page-requests-container">
        {selectedFavoursJSX}
      </div>
    </div>
  );
}

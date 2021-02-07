/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

export default function RequestsPage({ userRequests, selectAndViewARequestPageRequester }) {
  const [requestedStatusBorderClass, setRequestedStatusBorderClass] = useState('bottom-border');
  const [acceptedStatusBorderClass, setAcceptedStatusBorderClass] = useState('');
  const [shippedStatusBorderClass, setShippedStatusBorderClass] = useState('');
  const [completedStatusBorderClass, setCompletedStatusBorderClass] = useState('');
  const [cancelledStatusBorderClass, setCancelledStatusBorderClass] = useState('');
  const [selectedRequests, setSelectedRequests] = useState(userRequests.requested);

  const handleRequestedStatusClick = () => {
    setRequestedStatusBorderClass('bottom-border');
    setAcceptedStatusBorderClass('');
    setShippedStatusBorderClass('');
    setCompletedStatusBorderClass('');
    setCancelledStatusBorderClass('');
    setSelectedRequests(userRequests.requested);
  };

  const handleAcceptedStatusClick = () => {
    setRequestedStatusBorderClass('');
    setAcceptedStatusBorderClass('bottom-border');
    setShippedStatusBorderClass('');
    setCompletedStatusBorderClass('');
    setCancelledStatusBorderClass('');
    setSelectedRequests(userRequests.accepted);
  };

  const handleShippedStatusClick = () => {
    setRequestedStatusBorderClass('');
    setAcceptedStatusBorderClass('');
    setShippedStatusBorderClass('bottom-border');
    setCompletedStatusBorderClass('');
    setCancelledStatusBorderClass('');
    setSelectedRequests(userRequests.shipped);
  };

  const handleCompletedStatusClick = () => {
    setRequestedStatusBorderClass('');
    setAcceptedStatusBorderClass('');
    setShippedStatusBorderClass('');
    setCompletedStatusBorderClass('bottom-border');
    setCancelledStatusBorderClass('');
    setSelectedRequests(userRequests.completed);
  };

  const handleCancelledStatusClick = () => {
    setRequestedStatusBorderClass('');
    setAcceptedStatusBorderClass('');
    setShippedStatusBorderClass('');
    setCompletedStatusBorderClass('');
    setCancelledStatusBorderClass('bottom-border');
    setSelectedRequests(userRequests.cancelled);
  };

  // JSX for selected requests
  // returns nothing if array is empty
  const selectedRequestsJSX = selectedRequests.map((request) => (
    <div className="row d-flex justify-content-center" key={request.id}>
      <div className="col-12 col-sm-10 col-md-8 col-lg-6">
        <a className="request-anchor" href="#request" onClick={() => selectAndViewARequestPageRequester(request.id)}>
          <div className="container border requests-page-request-container">
            <div className="row">
              <div className="col-3 requests-page-request-col">
                <img className="rounded border border-secondary img-fluid" src={(request.productPhotos.length > 0) ? request.productPhotos[0].filename : 'https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg'} alt="product" />
              </div>
              <div className="col-9 d-flex flex-column justify-content-center">
                <p>{request.productName}</p>
                <p className="request-price">{`$${request.price}`}</p>
                <p className="request-helper-name">
                  {'Helper: '}
                  {(request.helper) ? request.helper.name : 'waiting for helper'}
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
            <h4>Requests</h4>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-sm-9 col-md-6 d-flex justify-content-center" id="statuses-navbar">
            <button className={requestedStatusBorderClass} onClick={handleRequestedStatusClick} type="button">
              requested
              {`(${userRequests.requested.length})`}
            </button>
            <button className={acceptedStatusBorderClass} onClick={handleAcceptedStatusClick} type="button">
              accepted
              {`(${userRequests.accepted.length})`}
            </button>
            <button className={shippedStatusBorderClass} onClick={handleShippedStatusClick} type="button">
              shipped
              {`(${userRequests.shipped.length})`}
            </button>
            <button className={completedStatusBorderClass} onClick={handleCompletedStatusClick} type="button">
              completed
              {`(${userRequests.completed.length})`}
            </button>
            <button className={cancelledStatusBorderClass} onClick={handleCancelledStatusClick} type="button">
              cancelled
              {`(${userRequests.cancelled.length})`}
            </button>
          </div>
        </div>
      </div>

      <div className="container" id="requests-page-requests-container">
        {selectedRequestsJSX}
      </div>
    </div>
  );
}

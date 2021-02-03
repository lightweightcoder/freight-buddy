/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

export default function RequestsPage({ userRequests }) {
  const [requestedStatusBorderClass, setRequestedStatusBorderClass] = useState('');
  const [acceptedStatusBorderClass, setAcceptedStatusBorderClass] = useState('');
  const [shippedStatusBorderClass, setShippedStatusBorderClass] = useState('');
  const [completedStatusBorderClass, setCompletedStatusBorderClass] = useState('');
  const [cancelledStatusBorderClass, setCancelledStatusBorderClass] = useState('');

  const handleRequestedStatusClick = () => {
    setRequestedStatusBorderClass('bottom-border');
    setAcceptedStatusBorderClass('');
    setShippedStatusBorderClass('');
    setCompletedStatusBorderClass('');
    setCancelledStatusBorderClass('');
  };

  const handleAcceptedStatusClick = () => {
    setRequestedStatusBorderClass('');
    setAcceptedStatusBorderClass('bottom-border');
    setShippedStatusBorderClass('');
    setCompletedStatusBorderClass('');
    setCancelledStatusBorderClass('');
  };

  const handleShippedStatusClick = () => {
    setRequestedStatusBorderClass('');
    setAcceptedStatusBorderClass('');
    setShippedStatusBorderClass('bottom-border');
    setCompletedStatusBorderClass('');
    setCancelledStatusBorderClass('');
  };

  const handleCompletedStatusClick = () => {
    setRequestedStatusBorderClass('');
    setAcceptedStatusBorderClass('');
    setShippedStatusBorderClass('');
    setCompletedStatusBorderClass('bottom-border');
    setCancelledStatusBorderClass('');
  };

  const handleCancelledStatusClick = () => {
    setRequestedStatusBorderClass('');
    setAcceptedStatusBorderClass('');
    setShippedStatusBorderClass('');
    setCompletedStatusBorderClass('');
    setCancelledStatusBorderClass('bottom-border');
  };
  return (
    <div>
      <div className="container ">
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
    </div>
  );
}

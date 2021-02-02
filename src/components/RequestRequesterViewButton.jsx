/* eslint-disable react/prop-types */
import React from 'react';
import getRequesterButtonText from '../../utilities/get-requester-button-text.mjs';

export default function RequestRequesterViewButton({ status, changeSelectedRequestStatus }) {
  // get the button text that represents the next available action that a requester can do
  // returns empty string if there is no button text for a certain status
  const buttonText = getRequesterButtonText(status);

  if (buttonText === '') {
    return (
      <div />
    );
  }

  // if the status is requested or accepted, make button disabled as
  // the requester can't perform an action. ButtonText will show a short message to inform
  // the requester on the status of the request
  if (status === 'requested' || status === 'accepted') {
    return (
      <button type="button" className="btn btn-secondary" disabled>{buttonText}</button>
    );
  }

  // reaches here if request status is 'shipped'.
  // if requester clicks button, it means that requester has confirmed the delivery
  // so change request status to complete
  return (
    <button type="button" className="btn btn-primary" onClick={() => changeSelectedRequestStatus('completed')}>{buttonText}</button>
  );
}

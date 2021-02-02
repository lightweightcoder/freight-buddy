/* eslint-disable react/prop-types */
import React from 'react';
import getButtonText from '../../utilities/get-button-text.mjs';

export default function RequestHelperViewButton({ status, changeSelectedRequestStatus }) {
  // get the button text that represents the next available action that a helper can do
  // return empty string if status is not requested or accepted as
  // the helper has no further action to take
  const buttonText = getButtonText(status);

  if (buttonText === '') {
    return (
      <div />
    );
  }

  // if the status is shipped it means that the helper is waiting for the
  // requester to confirm the delivery of the product
  if (status === 'shipped') {
    return (
      <button type="button" className="btn btn-secondary" disabled>waiting for requester to confirm delivery</button>
    );
  }

  // the new status of the request to be updated if helper
  // clicks on the button to change the request's status
  let newStatus;

  // determine the new status
  if (status === 'requested') {
    // helper can click the button to accept the request
    newStatus = 'accepted';
  } else if (status === 'accepted') {
    // helper can click the button to inform requester that he/she has shipped the product
    newStatus = 'shipped';
  }

  return (
    <button type="button" className="btn btn-primary" onClick={() => changeSelectedRequestStatus(newStatus)}>{buttonText}</button>
  );
}

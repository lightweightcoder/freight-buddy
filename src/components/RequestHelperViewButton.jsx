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

  // if the button text is received product it means that the helper is waiting for the
  // requester to confirm the delivery of the product
  if (buttonText === 'received product') {
    return (
      <button type="button" className="btn btn-secondary" disabled>waiting for requester to confirm delivery</button>
    );
  }

  return (
    <button type="button" className="btn btn-primary" onClick={() => changeSelectedRequestStatus(buttonText)}>{buttonText}</button>
  );
}

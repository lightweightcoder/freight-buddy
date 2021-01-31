/* eslint-disable react/prop-types */
import React from 'react';
import getButtonText from '../../utilities/get-button-text.mjs';

export default function RequestHelperViewButton({ status }) {
  // get the button text that represents the next available action that a helper can do
  // return empty string if status is not requested or accepted as
  // the helper has no further action to take
  const buttonText = getButtonText(status);

  if (buttonText === '') {
    return (
      <div />
    );
  }

  return (
    <button type="button" className="btn btn-primary">{buttonText}</button>
  );
}

/**
 * create the button text that represents the next available action that
 * a requester can do for the request
 * returns empty string if there is an unintended status
 * @param {string} status - the request's current status
 */
export default function getRequesterButtonText(status) {
  if (status === 'requested') {
    return 'waiting for a helper';
  }

  if (status === 'accepted') {
    return 'waiting for helper to ship product';
  }

  if (status === 'shipped') {
    return 'confirm delivery';
  }

  return '';
}

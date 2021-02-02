/**
 * create the button text that represents the next available action that
 * a helper can do for the request
 * @param {string} status - the request's current status
 */
export default function getButtonText(status) {
  if (status === 'requested') {
    return 'offer help';
  }

  if (status === 'accepted') {
    return 'sent for shipping';
  }

  if (status === 'shipped') {
    return 'waiting for requester to confirm delivery';
  }

  return '';
}

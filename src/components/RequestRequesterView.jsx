/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import ProductPhotosCarousel from './ProductPhotosCarousel.jsx';
import RequestRequesterViewButton from './RequestRequesterViewButton.jsx';

export default function RequestRequesterView({ selectedRequest, changeSelectedRequestStatus }) {
  if (selectedRequest === null) {
    return <div />;
  }

  // create a button to allow the requester to cancel his/her request if a helper has not accepted the request
  const CancelRequestButton = (
    <button type="button" className="btn btn-danger" onClick={() => changeSelectedRequestStatus('cancel request')}>Cancel Request</button>
  );

  return (
    <div className="container">
      <div className="row">
        { /* product name and request id */ }
        <div className="col-12 product-name">
          <h4>{selectedRequest.productName}</h4>
          <p id="request-id">{`Request id: ${selectedRequest.id}`}</p>
          <p id="created-at">{`created on: ${moment(selectedRequest.createdAt).format('DD MMM YYYY')}`}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-5 d-flex">
          {/* carousel */}
          <div className="row d-flex justify-content-center align-self-center">
            <div className="col-6 col-sm-12">
              <ProductPhotosCarousel selectedRequest={selectedRequest} />
            </div>
          </div>
        </div>
        <hr className="after-carousel-divider" />
        <div className="col-12 col-sm-7">
          { /* other request details */ }
          <div className="row">
            <div className="col-12">
              <p className="offered-price-heading"><small>offered price:</small></p>
              <h4>{`$${selectedRequest.price}`}</h4>
              <p>{`Requester: ${selectedRequest.requester.name}`}</p>
              <p>{`Country of Purchase: ${selectedRequest.country.name}`}</p>
              <p>
                Reference Link:
                {' '}
                <br />
                <small>
                  <a href={selectedRequest.referenceLink}>{selectedRequest.referenceLink}</a>
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          { /* somemore request details */ }
          <p>{`Category: ${selectedRequest.category.name}`}</p>
          <p>{`Description: ${selectedRequest.description}`}</p>
          <p>{`Shipping Address: ${selectedRequest.shippingAddress}`}</p>
          <p><b>{`Status: ${selectedRequest.status}`}</b></p>
          <p><b>{selectedRequest.helper ? `Helper: ${selectedRequest.helper.name}` : ''}</b></p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {(selectedRequest.status !== 'cancelled') ? <p><small>actions available:</small></p> : ''}
          {(selectedRequest.status !== 'cancelled') ? <RequestRequesterViewButton status={selectedRequest.status} changeSelectedRequestStatus={changeSelectedRequestStatus} /> : ''}
          <br />
          {(selectedRequest.status === 'requested') ? CancelRequestButton : <div />}
        </div>
      </div>
    </div>
  );
}

/* eslint-disable react/prop-types */
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
// import CarouselItems from './CarouselItems.jsx';
import RequestHelperViewButton from './RequestHelperViewButton.jsx';

export default function RequestHelperView({ selectedRequest }) {
  // variable to store JSX of the carousel items
  let carouselItems = '';
  // const [buttonText, setButtonText] = useState('');

  if (selectedRequest === null) {
    return <div />;
  }

  // create the photos of the request's product for the carousel
  if (selectedRequest.productPhotos.length > 0) {
    carouselItems = selectedRequest.productPhotos.map((photo, index) => (
      <Carousel.Item key={photo.filename}>
        <img
          className="d-block w-100"
          src={photo.filename}
          alt={`${index + 1} slide`}
        />
      </Carousel.Item>
    ));
  } else {
    // if there is no photo uploaded by requester, give it a default image
    carouselItems = (
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg"
          alt="First slide"
        />
      </Carousel.Item>
    );
  }

  const nextIcon = <span aria-hidden="true" className="fas fa-angle-right fa-2x" />;
  const prevIcon = <span aria-hidden="true" className="fas fa-angle-left fa-2x" />;

  // create a button to allow the helper to cancel his/her help

  return (
    <div className="container">
      <div className="row">
        { /* product name and request id */ }
        <div className="col-12 product-name">
          <h4>{selectedRequest.productName}</h4>
          <p><small>{`Request id: ${selectedRequest.id}`}</small></p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-5 d-flex">
          {/* carousel */}
          <div className="row d-flex justify-content-center align-self-center">
            <div className="col-6 col-sm-12">
              <Carousel prevLabel="" nextLabel="" nextIcon={nextIcon} prevIcon={prevIcon}>
                { carouselItems }
                {/* <CarouselItems selectedRequest={selectedRequest} /> */}
              </Carousel>
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
          <p>{`Description: ${selectedRequest.description}`}</p>
          <p>{`Shipping Address: ${selectedRequest.shippingAddress}`}</p>
          <p><b>{`Status: ${selectedRequest.status}`}</b></p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <RequestHelperViewButton status={selectedRequest.status} />
        </div>
      </div>
    </div>
  );
}

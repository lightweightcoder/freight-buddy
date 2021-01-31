import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

export default function RequestHelperView({ selectedRequestId }) {
  const [requestDetails, setRequestDetails] = useState(null);
  // variable to store JSX of the carousel items
  const [carouselItemsList, setCarouselItemsList] = useState(null);

  // when request details (in helper view) page renders for the 1st time
  // get the request's details from the DB and set it in state variable
  useEffect(() => {
    axios.get(`/requests/${selectedRequestId}`)
      .then((result) => {
        console.log('request/:id result is', result);

        // set the request's details
        setRequestDetails(result.data.request);

        console.log('length is', result.data.request.productPhotos.length);
        // create the photos of the request's product
        if (result.data.request.productPhotos.length > 0) {
          const carouselItems = result.data.request.productPhotos.map((photo, index) => (
            <Carousel.Item key={photo.filename}>
              <img
                className="d-block w-100"
                src={photo.filename}
                alt={`${index + 1} slide`}
              />
            </Carousel.Item>
          ));

          setCarouselItemsList(carouselItems);
        } else {
          // if there is no photo uploaded by requester, give it a default image
          const carouselItems = (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg"
                alt="First slide"
              />
            </Carousel.Item>
          );

          setCarouselItemsList(carouselItems);
        }
      });
  }, []);

  const nextIcon = <span aria-hidden="true" className="fas fa-angle-right fa-2x" />;
  const prevIcon = <span aria-hidden="true" className="fas fa-angle-left fa-2x" />;

  if (requestDetails === null) {
    return <div />;
  }

  return (
    <div className="container">
      <div className="row">
        { /* product name and request id */ }
        <div className="col-12 product-name">
          <h4>{requestDetails.productName}</h4>
          <p><small>{`Request id: ${requestDetails.id}`}</small></p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-5 d-flex">
          {/* carousel */}
          <div className="row d-flex justify-content-center align-self-center">
            <div className="col-6 col-sm-12">
              <Carousel prevLabel="" nextLabel="" nextIcon={nextIcon} prevIcon={prevIcon}>
                { carouselItemsList }
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
              <h4>{`$${requestDetails.price}`}</h4>
              <p>{`Requester: ${requestDetails.requester.name}`}</p>
              <p>{`Country of Purchase: ${requestDetails.country.name}`}</p>
              <p>
                Reference Link:
                {' '}
                <br />
                <small>
                  <a href={requestDetails.referenceLink}>{requestDetails.referenceLink}</a>
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          { /* somemore request details */ }
          <p>{`Description: ${requestDetails.description}`}</p>
          <p>{`Shipping Address: ${requestDetails.shippingAddress}`}</p>
          <p><b>{`Status: ${requestDetails.status}`}</b></p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <button type="button" className="btn btn-primary">hi</button>
        </div>
      </div>
    </div>
  );
}

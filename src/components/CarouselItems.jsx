/* eslint-disable react/prop-types */
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default function CarouselItems({ selectedRequest }) {
  if (selectedRequest === null) {
    return <div />;
  }

  let carouselItems = '';

  // create the photos of the request's product
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

  console.log('carouselItems', carouselItems);
  return carouselItems;
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

export default function RequestHelperView({ selectedRequestId }) {
  // // handler for clicking on a request card
  // const handleClick = (e) => {
  //   e.preventDefault();
  // };
  const [requestDetails, setRequestDetails] = useState(null);

  // when request details (in helper view) page renders for the 1st time
  // get the request's details from the DB and set it in state variable
  useEffect(() => {
    axios.get(`/requests/${selectedRequestId}`)
      .then((result) => {
        console.log('request/:id result is', result);

        // set the request's details
        setRequestDetails(result.data.request);
      });
  }, []);

  // create jsx for carousel items
  let carouselItems = (
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg"
        alt="First slide"
      />
    </Carousel.Item>
  );

  if (requestDetails !== null) {
    carouselItems = requestDetails.productPhotos.map((photo, index) => (
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={photo.filename}
          alt={`${index + 1} slide`}
        />
      </Carousel.Item>
    ));
  }

  const nextIcon = <span aria-hidden="true" className="fas fa-angle-right fa-2x" />;
  const prevIcon = <span aria-hidden="true" className="fas fa-angle-left fa-2x" />;

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-5" id="request-items-photos">
          <div className="row d-flex justify-content-center">
            <div className="col-6 col-sm-12">
              <Carousel prevLabel="" nextLabel="" nextIcon={nextIcon} prevIcon={prevIcon}>
                { carouselItems }
              </Carousel>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-7">
          { /* request contents */ }
        </div>
      </div>
    </div>
  );
}

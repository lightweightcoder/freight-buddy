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

  return (
    <div className="container">
      <div className="row">
        <div className="col-12" id="request-items-photos">
          <div className="row">
            <div className="col-6 col-md-12">
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://pizzadelivery.com.sg/wp-content/uploads/2020/08/Smoked-Duck-800x800.jpg"
                    alt="First slide"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
        <div className="col-12">
          { /* request contents */ }
        </div>
      </div>
    </div>
  );
}

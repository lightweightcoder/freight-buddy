import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
import RequestCard from './RequestCard.jsx';

export default function HomePage({ setUser, selectAndViewARequestPage }) {
  const [requests, setRequests] = useState(null);

  // used for carousell component
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  // when home page renders for the 1st time, get a list of requests (of status 'requested')
  useEffect(() => {
    axios.get('/requests')
      .then((result) => {
        console.log(result);

        // set the requests
        setRequests(result.data.requestsList);
        // set the user
        setUser(result.data.user);
      });
  }, []);

  if (requests === null) {
    return <div />;
  }

  return (
    <div>
      {/* <Carousel
        swipeable={false}
        draggable={false}
        showDots
        responsive={responsive}
        ssr // means to render carousel on server-side.
        infinite
        autoPlay={this.props.deviceType !== 'mobile'}
        autoPlaySpeed={1000}
        keyBoardControl
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
      </Carousel>
      ; */}
      <div className="container">
        <div className="row">
          {requests.map((request) => (
            // eslint-disable-next-line max-len
            <RequestCard key={request.id} photo={request.product_photos[0].filename} productName={request.productName} price={request.price} country={request.country.name} id={request.id} selectAndViewARequestPage={selectAndViewARequestPage} />
          ))}
        </div>
      </div>
    </div>
  );
}

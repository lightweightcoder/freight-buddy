import React from 'react';
import Card from 'react-bootstrap/Card';

export default function RequestCard({
  photo, productName, price, country,
}) {
  return (
  // {/* <Carousel
  //   swipeable={false}
  //   draggable={false}
  //   showDots
  //   responsive={responsive}
  //   ssr // means to render carousel on server-side.
  //   infinite
  //   autoPlay={this.props.deviceType !== 'mobile'}
  //   autoPlaySpeed={1000}
  //   keyBoardControl
  //   customTransition="all .5"
  //   transitionDuration={500}
  //   containerClass="carousel-container"
  //   removeArrowOnDeviceType={['tablet', 'mobile']}
  //   deviceType={this.props.deviceType}
  //   dotListClass="custom-dot-list-style"
  //   itemClass="carousel-item-padding-40-px"
  // >
  //   <div>Item 1</div>
  //   <div>Item 2</div>
  //   <div>Item 3</div>
  //   <div>Item 4</div>
  // </Carousel>
  // ; */}
    <div className="col-4 col-md-3">
      <a href="#linktorequest" className="request-card-link">
        <Card className="request-card">
          <Card.Img variant="top" src={photo} />
          <Card.Body>
            <Card.Text className="request-card-productName">
              {productName}
            </Card.Text>
            <Card.Text className="request-card-price">
              {`$${price}`}
            </Card.Text>
            <Card.Text className="request-card-country">
              {country}
            </Card.Text>
          </Card.Body>
        </Card>
      </a>
    </div>
  );
}

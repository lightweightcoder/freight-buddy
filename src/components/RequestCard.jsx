import React from 'react';
import Card from 'react-bootstrap/Card';

export default function RequestCard({
  photo, productName, price, country, id, selectAndViewARequestPage,
}) {
  // handler for clicking on a request card
  const handleClick = (e) => {
    e.preventDefault();
    // set a selected request id, then set the state of the page to
    // to display the request details
    selectAndViewARequestPage(id);
  };

  return (
    <div className="col-4 col-md-3">
      <a href="#view-request" className="request-card-link" onClick={handleClick}>
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

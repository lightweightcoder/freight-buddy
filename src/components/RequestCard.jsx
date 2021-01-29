import React from 'react';
import Card from 'react-bootstrap/Card';

export default function RequestCard({
  photo, productName, price, country,
}) {
  return (
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

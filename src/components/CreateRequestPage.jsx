/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

export default function CreateRequestPage({
  user, countriesList, categoriesList, createRequestAndSetRequestDetailsPage,
}) {
  // to store the request to be added to DB
  const [request, setRequest] = useState({
    productName: '', description: '', price: '', referenceLink: '', shippingAddress: '', status: 'requested', requesterId: user.id, countryId: 1, categoryId: 1, productPhotos: [], payment: '',
  });
  // to store a message that will be displayed when a user does not fill up form correctly
  const [invalidMessage, setInvalidMessage] = useState('');

  // create JSX for country options elements for form
  const countryOptionElements = countriesList.map((country) => (
    <option key={country.id} value={country.id}>{country.name}</option>
  ));

  // create JSX for category options elements for form
  const categoryOptionElements = categoriesList.map((category) => (
    <option key={category.id} value={category.id}>{category.name}</option>
  ));

  // handlers for every form input
  const handleProductNameChange = (event) => {
    const updatedProductName = event.target.value;

    setRequest({ ...request, productName: updatedProductName });
  };

  const handleDescriptionChange = (event) => {
    const updatedDescription = event.target.value;

    setRequest({ ...request, description: updatedDescription });
  };

  const handlePriceChange = (event) => {
    // store the price input
    const inputPrice = event.target.value;
    let updatedPrice;

    if (inputPrice) {
      // remove any zeros at the front
      const filteredPrice = inputPrice.toString().match(/[1-9.][0-9.]*/);
      console.log('filtered price is', filteredPrice);

      if (filteredPrice !== null) {
        // convert the price to 2 decimal places (rounded down)
        updatedPrice = Math.floor(Number(filteredPrice[0]) * 100) / 100;
      } else {
        updatedPrice = '';
      }
    } else {
      updatedPrice = '';
    }

    setRequest({ ...request, price: updatedPrice });
  };

  const handleReferenceLinkChange = (event) => {
    const updatedReferenceLink = event.target.value;

    setRequest({ ...request, referenceLink: updatedReferenceLink });
  };

  const handleShippingAddressChange = (event) => {
    const updatedShippingAddress = event.target.value;

    setRequest({ ...request, shippingAddress: updatedShippingAddress });
  };

  const handleCountrySelectChange = (event) => {
    setRequest({ ...request, countryId: event.target.value });
  };

  const handleCategorySelectChange = (event) => {
    setRequest({ ...request, categoryId: event.target.value });
  };

  const handleSelectPhotosChange = (event) => {
    setRequest({ ...request, productPhotos: event.target.files });
  };

  const handlePaymentUploadChange = (event) => {
    setRequest({ ...request, payment: event.target.files[0] });
  };

  // run function when user clicks on the create request button
  const createRequestBtnClick = (formData) => {
    // check if any of the form fields are not filled by checking if they are falsy
    // for product photos, check if its an array of length 0.
    if (!formData.productName || !formData.description || !formData.price || !formData.referenceLink || !formData.shippingAddress || !formData.payment || formData.productPhotos.length === 0) {
      // set an invalid form message to inform user to fill up all the form fields
      setInvalidMessage('You have not filled up all parts of the form');

      // exit the function
      return;
    }

    // if all the form inputs are filled up, create the request
    createRequestAndSetRequestDetailsPage(formData);
  };

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <h4 id="new-request-form-heading">New Request</h4>
        </div>
      </div>

      <div className="container" id="create-request-form-container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-lg-8">
            <Form>
              <Form.Group controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" value={request.productName} onChange={handleProductNameChange} />
                <Form.Text className="text-muted">
                  Keep it short to grab attention.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={request.description} onChange={handleDescriptionChange} />
                <Form.Text className="text-muted">
                  Provide clear instructions on how to purchase the product.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Offer Price (local currency)</Form.Label>
                <Form.Control type="number" step="0.01" value={request.price} onChange={handlePriceChange} />
                <Form.Text className="text-muted">
                  smallest denomination is 0.01.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="link">
                <Form.Label>Reference Link</Form.Label>
                <Form.Control type="text" value={request.referenceLink} onChange={handleReferenceLinkChange} />
                <Form.Text className="text-muted">
                  Link to product website to place order
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="country">
                <Form.Label>Product Country of Origin</Form.Label>
                <Form.Control as="select" custom value={request.countryId} onChange={handleCountrySelectChange}>
                  {countryOptionElements}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control as="select" custom value={request.categoryId} onChange={handleCategorySelectChange}>
                  {categoryOptionElements}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="shipping-address">
                <Form.Label>Shipping Address</Form.Label>
                <Form.Control type="text" value={request.shippingAddress} onChange={handleShippingAddressChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Product photos (up to 3)</Form.Label>
                <br />
                <input type="file" multiple onChange={handleSelectPhotosChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Payment Slip</Form.Label>
                <br />
                <input type="file" onChange={handlePaymentUploadChange} />
                <Form.Text className="text-muted">
                  Make a wire transfer of the offered price to freight-buddy. Bank name: DBS, Account number: 256-09876-25. Upload an image of the transfer details here.
                </Form.Text>
              </Form.Group>

              <button type="button" id="create-request-btn" className="btn btn-primary" onClick={() => createRequestBtnClick(request)}>Create Request</button>
            </Form>
            <p id="new-request-form-invalid-message">{invalidMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import components
import AppErrorBoundary from './components/AppErrorBoundary.jsx';
import TopNavbar from './components/TopNavbar.jsx';
import HomePage from './components/HomePage.jsx';
import RequestHelperView from './components/RequestHelperView.jsx';
import CreateRequestPage from './components/CreateRequestPage.jsx';

// states to determine which components to load
const pages = {
  HOME: 'HOME',
  SHOW_REQUEST_HELPER_VIEW: 'SHOW_REQUEST_HELPER_VIEW',
  CREATE_REQUEST: 'CREATE_REQUEST',
};

export default function App() {
  const [page, setPage] = useState(pages.HOME);
  const [user, setUser] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [countriesList, setCountriesList] = useState(null);
  const [categoriesList, setCategoriesList] = useState(null);

  // get the details of the selected request, then set the state of the page to
  // to display the request details to the helper
  // this occurs when a potential helper clicks on a request at the homepage
  const selectAndViewARequestPageHelper = (id) => {
    // get the request's details from the DB and set it in selectedRequest variable
    axios.get(`/requests/${id}`)
      .then((result) => {
        console.log('request/:id result is', result);

        // set the request's details
        setSelectedRequest(result.data.request);
      })
      .catch((error) => {
        // handle error
        console.log('get a request details error', error);
      });

    // set the page to view the selected request's details
    setPage(pages.SHOW_REQUEST_HELPER_VIEW);
  };

  // change the status of the selected request in the DB and state variable
  // change is made based on the button text of the button that triggered this function
  const changeSelectedRequestStatus = (buttonText) => {
    // the new status of the request to be updated
    let newStatus;

    // determine the new status
    if (buttonText === 'offer help') {
      newStatus = 'accepted';
    } else if (buttonText === 'sent for shipping') {
      newStatus = 'shipped';
    } else if (buttonText === 'withdraw help') {
      // this occurs when a helper clicks on the withdraw help button
      // new status of request is requested so other potential helper can accept the request
      newStatus = 'requested';
    }

    // make axios request to change the status in the DB
    axios.put(`/requests/${selectedRequest.id}/status`, { newStatus })
      .then((result) => {
        console.log('request/:id/status result is', result);

        // set the request's details
        setSelectedRequest(result.data.updatedRequest);
      })
      .catch((error) => {
        // handle error
        console.log('get a request details error', error);

        // redirect user to login page as user tried to access a forbidden page
        if (error.message === 'Request failed with status code 403') {
          window.location.assign('/login');
        }
      });
  };

  // create a request in the DB, set that request as the selected request
  // and set the page state variable to display the request details to the requester
  const createRequestAndSetRequestDetailsPage = (request) => {
    // post a request to create the new request
    axios.post('/requests', request)
      .then((result) => {
        console.log('new request result is', result);

        // set the request's details
        // setSelectedRequest(result.data.request);
      })
      .catch((error) => {
        // handle error
        console.log('create a request error', error);

        // redirect user to login page as user tried to access a forbidden page
        if (error.message === 'Request failed with status code 403') {
          window.location.assign('/login');
        }
      });
  };

  // get a list of countries when App is rendered
  useEffect(() => {
    axios.get('/countries')
      .then((result) => {
        console.log(result);

        // set the countries
        setCountriesList(result.data.countriesList);
      })
      .catch((error) => {
        // handle error
        console.log('get a list of countries error', error);
      });

    axios.get('/categories')
      .then((result) => {
        console.log(result);

        // set the countries
        setCategoriesList(result.data.categoriesList);
      })
      .catch((error) => {
        // handle error
        console.log('get a list of categories error', error);
      });
  }, []);

  return (
    <div>
      <AppErrorBoundary>
        <TopNavbar user={user} setPage={setPage} />
        {(page === pages.HOME) ? <HomePage setUser={setUser} selectAndViewARequestPageHelper={selectAndViewARequestPageHelper} /> : ''}
        {(page === pages.SHOW_REQUEST_HELPER_VIEW) ? <RequestHelperView selectedRequest={selectedRequest} changeSelectedRequestStatus={changeSelectedRequestStatus} /> : ''}
        {(page === pages.CREATE_REQUEST) ? <CreateRequestPage user={user} countriesList={countriesList} categoriesList={categoriesList} createRequestAndSetRequestDetailsPage={createRequestAndSetRequestDetailsPage} /> : ''}
      </AppErrorBoundary>
    </div>
  );
}

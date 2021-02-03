/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import components
import AppErrorBoundary from './components/AppErrorBoundary.jsx';
import TopNavbar from './components/TopNavbar.jsx';
import HomePage from './components/HomePage.jsx';
import RequestHelperView from './components/RequestHelperView.jsx';
import CreateRequestPage from './components/CreateRequestPage.jsx';
import RequestRequesterView from './components/RequestRequesterView.jsx';
import RequestsPage from './components/RequestsPage.jsx';

// states to determine which components to load
const pages = {
  HOME: 'HOME',
  SHOW_REQUEST_HELPER_VIEW: 'SHOW_REQUEST_HELPER_VIEW',
  CREATE_REQUEST: 'CREATE_REQUEST',
  SHOW_REQUEST_REQUESTER_VIEW: 'SHOW_REQUEST_REQUESTER_VIEW',
  VIEW_REQUESTS: 'VIEW_REQUESTS',
};

export default function App() {
  const [page, setPage] = useState(pages.HOME);
  const [user, setUser] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [countriesList, setCountriesList] = useState(null);
  const [categoriesList, setCategoriesList] = useState(null);
  const [availableRequests, setAvailableRequests] = useState(null);
  const [userRequests, setUserRequests] = useState(null);

  // handle to set the state of the page to display a form to create a request
  // this occurs when a user clicks on the create request link in the navbar
  const handleSetCreateRequestPage = () => {
    setPage('CREATE_REQUEST');
  };

  // handle to set the state of the page to display a list of requests made by the user
  const handleSetViewRequestsPage = () => {
    // get the user's delivery requests from the DB and set it in userRequests state variable
    axios.get('users/requests')
      .then((result) => {
        console.log('user requests result is', result);

        // set the user's requests details
        setUserRequests(result.data.requests);

        setPage(pages.VIEW_REQUESTS);
      })
      .catch((error) => {
        // handle error
        console.log('get a user\'s requests error', error);
      });
  };

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

        // set the page to view the selected request's details
        setPage(pages.SHOW_REQUEST_HELPER_VIEW);
      })
      .catch((error) => {
        // handle error
        console.log('get a request details error', error);
      });
  };

  // change the status of the selected request in the DB and state variable
  const changeSelectedRequestStatus = (newStatus) => {
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
        setSelectedRequest(result.data.createdRequest);

        // set the page to view the selected request's details to the requester
        setPage(pages.SHOW_REQUEST_REQUESTER_VIEW);
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

  // get the details of the selected request, then set the state of the page to
  // to display the request details to the requester
  // this occurs when a requester clicks on his/her request at the requests VIEW_REQUESTS page
  const selectAndViewARequestPageRequester = (id) => {
    // get the request's details from the DB and set it in selectedRequest variable
    axios.get(`/requests/${id}`)
      .then((result) => {
        console.log('request/:id result is', result);

        // set the request's details
        setSelectedRequest(result.data.request);

        // set the page to view the selected request's details
        setPage(pages.SHOW_REQUEST_REQUESTER_VIEW);
      })
      .catch((error) => {
        // handle error
        console.log('get a request details error', error);
      });
  };

  // get a list of available requests, countries and categories when App is rendered
  useEffect(() => {
    axios.get('/requests')
      .then((result) => {
        console.log(result);

        // set the available requests
        setAvailableRequests(result.data.requestsList);
        // set the user
        setUser(result.data.user);
      })
      .catch((error) => {
        // handle error
        console.log('get a list of available requests error', error);
      });

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
        <TopNavbar user={user} handleSetCreateRequestPage={handleSetCreateRequestPage} handleSetViewRequestsPage={handleSetViewRequestsPage} />
        {(page === pages.HOME) ? <HomePage selectAndViewARequestPageHelper={selectAndViewARequestPageHelper} availableRequests={availableRequests} /> : ''}
        {(page === pages.SHOW_REQUEST_HELPER_VIEW) ? <RequestHelperView selectedRequest={selectedRequest} changeSelectedRequestStatus={changeSelectedRequestStatus} /> : ''}
        {(page === pages.CREATE_REQUEST) ? <CreateRequestPage user={user} countriesList={countriesList} categoriesList={categoriesList} createRequestAndSetRequestDetailsPage={createRequestAndSetRequestDetailsPage} /> : ''}
        {(page === pages.SHOW_REQUEST_REQUESTER_VIEW) ? <RequestRequesterView selectedRequest={selectedRequest} changeSelectedRequestStatus={changeSelectedRequestStatus} /> : ''}
        {(page === pages.VIEW_REQUESTS) ? <RequestsPage userRequests={userRequests} selectAndViewARequestPageRequester={selectAndViewARequestPageRequester} /> : ''}
      </AppErrorBoundary>
    </div>
  );
}

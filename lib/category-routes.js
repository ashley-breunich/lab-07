'use strict';

const express = require('express');
const superagent = require('superagent');
const API = 'http://localhost:3000';
const router = express.Router();

// Routes
router.get('/list', listPage);
router.post('/list', postItem);
router.delete('/list', deleteItem);

// Route Runner Functions
function listPage(request, response) {
  superagent.get( `${API}/api/v1/categories`)
    .then(data => {
      response.render('site', {page: './pages/list', title:'Listings', items: data.body});
    })
    .catch( error => {
      response.render('site', {page: './pages/error', title:'Error', error:error});
    });
}

function postItem(request, response) {
  superagent.post( `${API}/categories`)
    .then( () => {
      response.redirect('/list');
    })
    .catch( error => {
      response.render('site', {page: './pages/error', title:'Error', error:error});
    });
}

function deleteItem( request, response )  {
  superagent.delete(`${API}/categories/${request.body._id}`)
    .then( () => {
      response.redirect('/list');
    })
    .catch( error => {
      response.render('site', {page: './pages/error', title:'Error', error:error});
    });
}

module.exports = router;
  
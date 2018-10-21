'use strict';

const express = require('express');
const router = express.Router();

// Routes
router.get('/', homePage);

// Route Runner Functions
function homePage(request, response) {
  response.render('site', {page: './pages/index', title:'Welcome Home'});
}

module.exports = router;
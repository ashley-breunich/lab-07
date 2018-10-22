'use strict';

//Third Party Libs
const express = require('express');
const methodOverride = require('method-override');
const app = express();


// Personal Libs
const homeRoutes = require('./home-routes.js');
const categoryRoutes = require('./category-routes.js');

// Set the view engine for templating
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({extended:true}));
app.use(methodOverride((request,response) => {
  if(request.body && typeof request.body === 'object' && '_method' in request.body) {
    let method = request.body._method;
    delete request.body._method;
    return method;
  }
  console.log(response);
}));

// Statics
app.use( express.static('./public') );

// Dynamic Routes
app.use(homeRoutes);
app.use(categoryRoutes);

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};


// TODO: 
// Check all api input for validity *****ESPECIALLY LOCATION*******
// Forgot password API

const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./api/routes/users');

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));

// Setup your api routes with express
app.use("", userRoutes);

// express returns an HTTP server
app.listen(port, () => console.log("[Server] online " + new Date()));
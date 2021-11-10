// TODO: 
// Check all api input for validity *****ESPECIALLY LOCATION*******
// Forgot password API
// Resend verification email API
// findTasks API

const bodyParser = require('body-parser');
const cors = require('cors');
const volRoutes = require('./api/routes/volunteer');
const coordRoutes = require('./api/routes/coordinator');
const taskRoutes = require('./api/routes/task');

var express = require('express'),
  app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup your api routes with express
app.use("/vol", volRoutes);
app.use("/coord", coordRoutes);
app.use("/task", taskRoutes);

const port = process.env.PORT || 3000;

// express returns an HTTP server
app.listen(port, () => console.log("[Server] on port " + port + " online " + new Date()));
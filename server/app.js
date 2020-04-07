/*
 *  Title: app.js
 *  Author: April Auger, Wendy Portillo, Thip Rattanavilay
 *  Date: 4 April 2020
 *  Description: The app file for the BCRS application.
 */

/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const UserApi = require('./routes/user-api');
const SessionApi = require('./routes/security-api');
const SecurityQuestionApi = require('./routes/security-question-api');

/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/bcrs')));
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')));

/**
 * Variables
 */
const port = 3000; // server port

// TODO: This line will need to be replaced with your actual database connection string
const conn = 'mongodb+srv://aauger:wNoz7FuS2dYd2aHb@buwebdev-cluster-1-bzl71.mongodb.net/bcrs?retryWrites=true&w=majority';

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`);
}); // end mongoose connection


/**
 * Security Questions API(s)
 */
app.use('/api/users', UserApi);
app.use('/api/session', SessionApi);
app.use('/api/security-questions', SecurityQuestionApi);

/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function

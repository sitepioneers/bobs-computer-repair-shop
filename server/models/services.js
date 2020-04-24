/*
 *  Title: services.js
 *  Author: April Auger, Wendy Portillo, Thip Rattanavilay
 *  Date: 23 April 2020
 *  Description: The services model for MongoDB
 */

// Required modules
const mongoose = require('mongoose');

// Define a schema
let serviceSchema = mongoose.Schema({
    id: {type: String},
    title: {type: String},
    price: {type: Number}
  }, {
    collection: "services" // mongodb collection name
});

// Attach the serviceSchema to the User model
// Make the model available for other modules to require
module.exports = mongoose.model('Service', serviceSchema,'services');

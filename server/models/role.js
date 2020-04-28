/*
Title: role.js
Author: April Auger, Wendy Portillo, Thip Rattanavilay
Date: April 20, 2020
Description: Model for MongoDB ROles collection
*/

//import libraries
const mongoose = require('mongoose');

//blue print definition
let roleSchema = mongoose.Schema({
    text: {type: String, unique: true, dropDups: true} //unique does not automatically act like a validator so it will not auto throw an error if dup entry exists
});
module.exports = mongoose.model('Role', roleSchema); //now a model is needed


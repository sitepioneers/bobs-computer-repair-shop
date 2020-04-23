/*
Title: role.js
Author: Professor Krasso
Date: April 20, 2020
Description: Model for MongoDB ROles collection
*/


const mongoose = require('mongoose');

let roleSchema = mongoose.Schema({
    text: {type: String, unique: true, dropDups: true}
});
module.exports = mongoose.model('Role', roleSchema);

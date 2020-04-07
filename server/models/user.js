/*
 *  Title: user.js
 *  Author: April Auger, Wendy Portillo, Thip Rattanavilay
 *  Date: 7 April 2020
 *  Description: The user model for the BCRS application.
 */

 // Required modules
const mongoose = require('mongoose');

let securityQuestions = mongoose.Schema({
	questionId: {type: String},
	answer:		{type: String}
});

// Define a schema
const Schema = mongoose.Schema;

// User schema
let UserSchema = new Schema({
	username: 			{type: String, required: true, unique: true, dropDups: true},
	password: 			{type: String, required: true},
	firstName:			{type: String},
	lastName:			{type: String},
	phoneNumber:		{type: String},
	address:			{type: String},
	email:				{type: String},
	isDisabled:			{type: Boolean, default: false},
	role:				{type: String, default: 'standard'},
	securityQuestions:	{securityQuestions},
	date_created:		{type: Date, default: new Date()},
	date_modified:		{type: Date}
}, {
	collection: "users"
});

// Attach the UserSchema to the User model
const User = mongoose.model('User', UserSchema);

// Make the model available for other modules to require
module.exports = User;
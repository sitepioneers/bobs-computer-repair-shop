/*
 *  Title: security-question.js
 *  Author: April Auger, Wendy Portillo, Thip Rattanavilay
 *  Date: 7 April 2020
 *  Description: The security question model for the BCRS application.
 */

  // Required modules
const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

// User schema
let SecurityQuestionSchema = new Schema({
	text:		{type: String},
	isDisabled:	{type: Boolean, default: false},
}, {
	collection: "security-questions"
});

// Attach the UserSchema to the User model
const SecurityQuestion = mongoose.model('SecurityQuestion', SecurityQuestionSchema);

// Make the model available for other modules to require
module.exports = SecurityQuestion;
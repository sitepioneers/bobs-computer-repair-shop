/*
 *  Title: user-api.ts
 *  Author: April Auger, Wendy Portillo, Thip Rattanavilay
 *  Date: 7 April 2020
 *  Description: The user API for the BCRS application.
 */

// Required modules
const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Configurations
router = express.Router();

// Variables
const saltRounds = 10; // Default salt rounds for hashing algorithm

/*
 *  Name: FindAll
 *  Params: callback function
 *  Description: API to find all users not marked disabled.
 */
router.get('/', function(req, res, next){
	// Search the users database collection for a list of users.
	User.find({}).where('isDisabled').equals(false).exec(function(err, user) {
		// If there's an error, console and return the error.
		if (err) {
			console.log(err);
			return next(err);
		// If no error, console and return the user information.
		} else {
			console.log(user);
			res.json(user);
		}
	});
});

/*
 *  Name: FindById API
 *  Params: id, callback function
 *  Description: API to find a user by id.
 */
router.get('/:id', function(req, res, next){
	// Search the users database collection for a document with the request id.
	User.findOne({'_id': req.params.id}, function(err, user) {
		// If there's an error, console and return the error.
		if (err) {
			console.log(err);
			return next(err);
		// If there are no errors, console and return the user information.
		} else {
			console.log(user);
			res.json(user);
		}
	});
});

/*
 *  Name: CreateUser
 *  Params: callback function
 *  Description: API to create a user. (API replaced by RegisterUser in session-api.js.)
 */
router.post('/create', function(req, res, next) {
	// Hash the password
	let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

	// Store the user's information in an object
	let userObject = {
		username: req.body.username,
		password: hashedPassword,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		phoneNumber: req.body.phoneNumber,
		address: req.body.address,
		email: req.body.email,
		isDisabled: req.body.isDisabled,
		role: req.body.role,
		securityQuestions: req.body.securityQuestions,
		date_created:  new Date(),
		date_modified: new Date()
	};

	// Store the object as a user document in the database.
	User.create(userObject, function(err, newUser) {
		if(err) {
			console.log(err);
			return next(err);
		// If there are no errors, console the new user information and return a 200 status code.
		} else {
			console.log(newUser);

			res.status(200).send({
				type: 'success',
				auth: true,
				username: newUser.username,
				time_stamp: new Date()
			});
		}
	});
});

/*
 *  Name: UpdateUser
 *  Params: id, callback function
 *  Description: API to update a user.
 */
router.put('/:id', function (req, res, next) {
	// Search the users database collection for a document with the request id.
	User.findOne({'_id': req.params.id}, function (err, user) {
		// If there's an error, console and return the error.
		if(err) {
			console.log(err);
			return next(err);
		// If the id was found, update the user information.
		} else {
			console.log(user);

			// Set the new values for the user document
			user.set({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				phoneNumber: req.body.phoneNumber,
				address: req.body.address,
				email: req.body.email,
				role: req.body.role,
				securityQuestions: req.body.securityQuestions,
				date_modified: new Date()
			});

			// Save the new values in the database
			user.save(function(err, savedUser) {
				// If there's an error, console and return the error.
				if(err) {
					console.log(err);
					return next(err);
				// If there are no errors, console the user information and return the information in JSON.
				} else {
					console.log(savedUser);
					res.json(savedUser);
				}
			});
		}
	});
});

/*
 *  Name: DeleteUser
 *  Params: id, callback function
 *  Description: API to delete a user
 */
router.delete('/:id', function(req, res, next) {
	// Search the users database collection for a document with the request id.
	User.findOne({'_id': req.params.id}, function(err, user) {
		// If there's an error, console and return the error.
		if(err) {
			console.log(err);
			return next(err);
		// If there are no errors, mark the record as disabled.
		} else {
			if(user) {
				// Set the user document isDisabled object property to true
				user.set({
					isDisabled: true
				});

				// Save the updated user property
				user.save(function(err, savedUser) {
					// If there's an error, console and return the error.
					if (err) {
						console.log(err);
						return next(err);
					// If there are no errors, console the updated user information and return the information in JSON.
					} else {
						console.log(savedUser);
						res.json(savedUser);
					}
				});
			}
		}
	});
});

 /*
 *  Name: FindSelectedSecurityQuestions
 *  Params: get username with selected security question
 *  Description: This API will lookup a user by their username and return an array of their selected security questions
 *  By Thip Rattanavilay
 */
router.get('/:username/security-questions', function (req, res, next) {
  User.findOne({'username': req.params.username}, function (err, user) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(user);
      res.json(user.securityQuestions);
    }
  })
});

module.exports = router;

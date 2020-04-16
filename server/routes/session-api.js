/*
 *  Title: security-api.ts
 *  Author: April Auger, Wendy Portillo, Thip Rattanavilay
 *  Date: 7 April 2020
 *  Description: The security API for the BCRS application.
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
 *  VerifyUser
 *  Params: username, callback function
 *  API to verify a username
 */
router.get('/verify/users/:username', function(req, res, next){
	User.findOne({'username': req.params.username}, function(err, user) {
		if (err) {
			console.log(err);
			return next(err);
		} else {
			console.log(user);
			res.json(user);
		}
	});
});

/*
 *  RegisterUser
 *  Params: callback function
 *  API to register a new user.
 */
router.post('/register', function(req, res, next) {
	// Search the database for the requested username.
	User.findOne({'username': req.body.username}, function(err, user) {
		// If there's an error, console and return the error.
		if (err) {
			console.log(err);
			return next(err);
		}
		// If the username wasn't found, register the new user.
		else {
			if (!user) {
				let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

				// Object storing the user's information
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
					date_created:  new Date()
				};

				// Store the object as a user document in the database.
				User.create(userObject, function(err, newUser) {
					// If there's an error, console and return the error.
					if (err) {
						console.log(err);
						return next(err);
					}
					// Once the user document has been saved in the database, return a 200 status code.
					else {
						console.log(newUser);

						res.status(200).send({
							type: 'success',
							auth: true,
							username: newUser.username,
							time_stamp: new Date()
						});
					}
				});
			}
			// The requested username was not available, prompt the user to select a different username.
			else {
				console.log(`The username ${req.body.username} is not available, please select a different username.`);
				res.status(500).send({
					type: 'error',
					text: `The username ${req.body.username} is not available, please select a different username.`,
					auth: false,
					time_stamp: new Date()
				});
			}
		}
	});
});

/*
 *  Signin
 *  Params: callback function
 *  API to sign a user into the application
 */
router.post('/signin', function(req, res, next) {
	User.findOne({'username': req.body.username}, function(err, user) {
		if(err) {
			console.log(err);
			return next(err);
		} else {
			console.log(user);

			// If the user exists
			if(user) {
				// let passwordIsValid = bcrypt.compareSync(req.body.password, user.password); // Compare hashed password against signed in password
				let passwordIsValid = bcrypt.compareSync(req.body.password, user.password); // Compare hashed password against signed in password

				// The password is valid
				if(passwordIsValid) {
					res.status(200).send({
						type: 'success',
						auth: true,
						username: user.username,
						time_stamp: new Date()
					});
				} else {
					// The password is invalid, return a 401 status code message
					console.log(`The password for username ${req.body.username} is invalid.`);

					res.status(401).send({
						type: 'error',
						text: 'Invalid username or password, please try again',
						auth: false,
						time_stamp: new Date()
					});
				}
			}
			// The user doesn't exist
			else {
				console.log(`Username: ${req.body.username} has not been registered with our system.`);

				res.status(401).send({
					type: 'error',
					text: 'Invalid username or password, please try again',
					auth: false,
					time_stamp: new Date()
				});
			}
		}
	});
});

module.exports = router;
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
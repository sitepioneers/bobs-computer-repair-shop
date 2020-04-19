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
 *  Name: VerifyUser
 *  Params: username, callback function
 *  Description: API to verify a username.
 */
router.get('/verify/users/:username', function(req, res, next){
	// Search the users database collection for a document with the request username.
	User.findOne({'username': req.params.username}, function(err, user) {
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
 *  Name: RegisterUser
 *  Params: callback function
 *  Description: API to register a new user.
 */
router.post('/register', function(req, res, next) {
	// Search the users database collection for a document with the request username.
	User.findOne({'username': req.body.username}, function(err, user) {
		// If there's an error, console and return the error.
		if (err) {
			console.log(err);
			return next(err);
		}
		// If the username wasn't found, register the user.
		else {
			if (!user) {
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
					role: req.body.role,
					securityQuestions: req.body.securityQuestions,
					isDisabled: req.body.isDisabled,
					date_created:  new Date()
				};

				// Store the object as a user document in the database.
				User.create(userObject, function(err, newUser) {
					// If there's an error, console and return the error.
					if (err) {
						console.log(err);
						return next(err);
					}
					// If there are no errors, console the new user information and return a 200 status code.
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
			// The requested username is not available.
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
 *  Name: Signin
 *  Params: callback function
 *  Description: API to sign a user into the application.
 */
router.post('/signin', function(req, res, next) {
	// Search the users database collection for a document with the request username.
	User.findOne({'username': req.body.username}, function(err, user) {
		// If there's an error, console and return the error.
		if(err) {
			console.log(err);
			return next(err);
		// If there are no errors.
		} else {
			console.log(user);

			// If the user exists
			if(user) {
				let passwordIsValid = bcrypt.compareSync(req.body.password, user.password); // Compare hashed password against signed in password

				// If password is valid, send a 200 status code response.
				if(passwordIsValid) {
					res.status(200).send({
						type: 'success',
						auth: true,
						username: user.username,
						time_stamp: new Date()
					});
				// The password is invalid, console a message and return a 401 status code.
				} else {
					console.log(`The password for username ${req.body.username} is invalid.`);

					res.status(401).send({
						type: 'error',
						text: 'Invalid username or password, please try again',
						auth: false,
						time_stamp: new Date()
					});
				}
			}
			// If the user doesn't exist, console a message and retun a 401 status code.
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

 /*
 *  Name: VerifySecurityQuestions
 *  Params: Verify three security questions
 *  Description: POST, This API will accept the answers to three security questions,
 *  look up the user by their username, and verify the passed-in answers against their saved answers.
 *  By Thip Rattanavilay
 */
router.post('/verify/users/:username/security-questions', function (req, res, next) {
  const answerToSecurityQuestion1 = req.body.answerToSecurityQuestion1.trim(); // post answer question 1
  const answerToSecurityQuestion2 = req.body.answerToSecurityQuestion2.trim(); // post answer question 2
  const answerToSecurityQuestion3 = req.body.answerToSecurityQuestion3.trim(); // post answer question 3

  User.findOne({'username': req.params.username}, function (err, user) {
    if (err) {
      console.log(err);
      return next(err);
    } else {

	  let answer1IsValid = answerToSecurityQuestion1 === user.securityQuestions[2].answer.trim(); //  valid answer question 1
      let answer2IsValid = answerToSecurityQuestion2 === user.securityQuestions[1].answer.trim(); //  valid answer question 2
      let answer3IsValid = answerToSecurityQuestion3 === user.securityQuestions[0].answer.trim(); //  valid answer question 3
      if (answer1IsValid && answer2IsValid && answer3IsValid) { // ensure answers are valid
        res.status(200).send({
          type: 'success', // success
          auth: true
        })
      } else {
        res.status(200).send({
          type: 'error', // error
          auth: false
        })
      }
    }
  })
});


/*
 *  Name: ResetPassword
 *  Params: post to reset password after verify
 *  Description: This API will lookup the user by their username, salt and hash the new password, and update the user document
 *  By Thip Rattanavilay
 */
router.post('/users/:username/reset-password', function (req, res, next) {
  const password = req.body.password;

  User.findOne({'username': req.params.username}, function (err, user) {
    if (err) {
      console.log(err); // error log
      return next(err); // return to function
    } else {
      console.log(user);

      let hashedPassword = bcrypt.hashSync(password, saltRounds); // salt/hash the password

      user.set({
        password: hashedPassword // hash password
      });

      user.save(function (err, user) { //save user function
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(user);
          res.json(user);
        }
      })
    }
  })
});

module.exports = router;

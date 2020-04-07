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
 *  FindAll
 *  Params: callback function
 *  API to find all users not marked disabled
 */
router.get('/', function(req, res, next){
	User.find({}).where('isDisabled').equals(false).exec(function(err, user) {
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
 *  FindById API
 *  Params: id, callback function
 *  API to find a user by id
 */
router.get('/:id', function(req, res, next){
	User.findOne({'_id': req.params.id}, function(err, user) {
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
 *  CreateUser
 *  Params: callback function
 *  API to create a user
 */
router.post('/', function(req, res, next) {
	let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

	let u = {
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

	User.create(u, function(err, newUser) {
		if(err) {
			console.log(err);
			return next(err);
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
 *  UpdateUser
 *  Params: id, callback function
 *  API to update a user
 */
router.put('/:id', function (req, res, next) {
	User.findOne({'_id': req.params.id}, function (err, user) {
		if(err) {
			console.log(err);
			return next(err);
		} else {
			console.log(user);

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

			user.save(function(err, savedUser) {
				if(err) {
					console.log(err);
					return next(err);
				} else {
					console.log(savedUser);
					res.json(savedUser);
				}
			});
		}
	});
});

/*
 *  DeleteUser
 *  Params: id, callback function
 *  API to delete a user
 */
router.delete('/:id', function(req, res, next) {
	User.findOne({'_id': req.params.id}, function(err, user) {
		if(err) {
			console.log(err);
			return next(err);
		} else {
			if(user) {
				user.set({
					isDisabled: true
				});

				user.save(function(err, savedUser) {
					if (err) {
						console.log(err);
						return next(err);
					} else {
						console.log(savedUser);
						res.json(savedUser);
					}
				});
			}
		}
	});
});

module.exports = router;
/*
 *  Title: security-question-api.ts
 *  Author: April Auger, Wendy Portillo, Thip Rattanavilay
 *  Date: 7 April 2020
 *  Description: The security question API for the BCRS application.
 */

// Required modules
const express = require('express');
const SecurityQuestion = require('../models/security-question');

// Configurations
const router = express.Router();

/*
 *  FindAll
 *  Params: callback function
 *  API to find all security questions not marked disabled
 */
router.get('/api/security-questions', function(req, res, next){
	SecurityQuestion.find({}).where('isDisabled').equals(false).exec(function(err, securityQuestions) {
		if (err) {
			console.log(err);
			return next(err);
		} else {
			console.log(securityQuestions);
			res.json(securityQuestions);
		}
	});
});

/*
 *  FindById
 *  Params: id, callback function
 *  API to find a security question by ID
 */
router.get('/api/security-questions/:id', function(req, res, next){
	SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestions) {
		if (err) {
			console.log(err);
			return next(err);
		} else {
			console.log(securityQuestions);
			res.json(securityQuestions);
		}
	});
});

/*
 *  CreateSecurityQuestion
 *  Params: callback function
 *  API to create a security question
 */
router.post('/api/security-questions', function(req, res, next){
	let = sq = {
		text: req.body.text
	};

	SecurityQuestion.create({'_id': req.params.id}, function(err, securityQuestion) {
		if (err) {
			console.log(err);
			return next(err);
		} else {
			console.log(securityQuestion);
			res.json(securityQuestions);
		}
	});
});

/*
 *  UpdateSecurityQuestion
 *  Params: id, callback function
 *  API to update a security question
 */
router.put('/api/security-questions/:id', function(req, res, next){
	SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {
		if (err) {
			console.log(err);
			return next(err);
		} else {
			console.log(securityQuestion);
			SecurityQuestion.set({
				text: req.body.text
			});

			SecurityQuestion.save(function(err, securityQuestion){
				if(err){
					console.log(err);
					return next(err);
				}else {
					console.log(securityQuestion);
					res.json(securityQuestion);
				}
			});
		}
	});
});

/*
 *  DeleteSecurityQuestion
 *  Params: id, callback function
 *  API to delete a security question
 */
router.delete('/api/security-questions/:id', function(req, res, next){
	SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {
		if (err) {
			console.log(err);
			return next(err);
		} else {
			console.log(securityQuestion);
			if(securityQuestion) {
				securityQuestion.set({
					isDisabled: true
				});

				SecurityQuestion.save(function(err, securityQuestion){
					if(err){
						console.log(err);
						return next(err);
					} else {
						console.log(securityQuestion);
						res.json(securityQuestion);
					}
				});
			}
		}
	});
});

module.exports = router;

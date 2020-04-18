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
 *  Name: FindAll
 *  Params: callback function
 *  Description: API to find all security questions not marked disabled.
 */
router.get('/', function(req, res, next){
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
 *  Name: FindById
 *  Params: id, callback function
 *  Description: API to find a security question by ID.
 */
router.get('/:id', function(req, res, next){
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
 *  Name: CreateSecurityQuestion
 *  Params: callback function
 *  Description: API to create a security question.
 */
router.post('/', function(req, res, next){
	let = sq = {
		text: req.body.text,
		isDisabled: req.body.isDisabled
	};

	SecurityQuestion.create(sq, function(err, securityQuestion) {
		if (err) {
			console.log(err);
			return next(err);
		} else {
			console.log(securityQuestion);
			res.json(securityQuestion);
		}
	});
});

/*
 *  Name: UpdateSecurityQuestion
 *  Params: id, callback function
 *  Description: API to update a security question.
 */
router.put('/:id', function(req, res, next){
	SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {
		if (err) {
			console.log(err);
			return next(err);
		} else {
			console.log(securityQuestion);
			securityQuestion.set({
				text: req.body.text
			});

			securityQuestion.save(function(err, securityQuestion){
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
 *  Name: DeleteSecurityQuestion
 *  Params: id, callback function
 *  Description: API to delete a security question.
 */
router.delete('/:id', function(req, res, next){
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

				securityQuestion.save(function(err, securityQuestion){
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

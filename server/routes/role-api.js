/*
Title: role-api.json
Author: Professor Krasso
Date: April 20, 2020
Description: CRUD APIs for Roles
*/

//import modules
const express = require('express'); //import express
const Role = require('../models/role');

const router = express.Router();

//FindAll
router.get('/',function(req,res,next) {
  	// Find All roles in database collection for a document with the request username.
    Role.find({}, function(err, roles) {
    // If there's an error, console and return the error.
        if (err) {
            console.log(err);
            return next (err);
    // If there are no errors, console and return the user information.
        } else {
            console.log(roles);
            res.json(roles);
        }
    })
});

//findRoleById
router.get('/:roleId',function(req,res,next){
  	// Search the users database collection for a document with the request username.
  Role.findOne({'_id': req.params.roleId},function(err,role){
    		// If there's an error, console and return the error.
      if(err){
          console.log(err);
          return next(err);
      }
					// If there's an error, console and return the error.
          else{
          console.log(role);
          res.json(role);
      }
  });
});


//createRole
router.post('/',function(req,res,next) {
    const r = {
        text: req.body.text
    };
	Role.create(r, function(err, role) {
		if (err) {
			console.log(err);
			return next (err);
    }
    else {
			console.log(role);
			res.json(role);
		}
	})
});

//updateRole
router.put('/:roleId',function(req,res,next){
  Role.findOne({'_id':req.params.roleId}, function(err,role){
      if(err){
          console.log(err);
          return next(err);
      }else{
          console.log(role);

          role.set({
              text: req.body.text
          });

          role.save(function(err,role){
              if(err){
                  console.log(err);
                  return next(err);
              }
      // If there's an error, console and return the error.
              else{
                  console.log(role);
                  res.json(role);
              }
          });
      }
  });
});

//deleteRole
router.delete('/:roleId',function(req,res,next){
  Role.findByIdAndDelete({'_id': req.params.roleId},function(err,role){
      if(err){
          console.log(err);
          return next(err);
      }else{
          console.log(role);
          res.json(role);
      }
  });
});

module.exports = router; // export the router

/*
Title: role-api.json
Author: Professor Krasso
Date: April 20, 2020
Description: CRUD APIs for Roles
*/


const express = require('express');
const Role = require('../models/role');

const router = express.Router();

/**
* FindAll
*/
router.get('/',function(req,res,next) {
    Role.find({}, function(err, roles) {
        if (err) {
            console.log(err);
            return next (err);
        } else {
            console.log(roles);
            res.json(roles);
        }
    })
});

//findRoleById
router.get('/:roleId',function(req,res,next){
  Role.findOne({'_id': req.params.roleId},function(err,role){
      if(err){
          console.log(err);
          return next(err);
      }else{
          console.log(role);
          res.json(role);
      }
  });
});

/**
* CreateRole
*/
router.post('/',function(req,res,next) {
    const r = {
        text: req.body.text
    };
	Role.create(r, function(err, role) {
		if (err) {
			console.log(err);
			return next (err);
		} else {
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
              }else{
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

module.exports = router;

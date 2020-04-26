/*
 *  Title: services-api.js
 *  Author: April Auger, Wendy Portillo, Thip Rattanavilay
 *  Date: 23 April 2020
 *  Description: The app file for the BCRS application.
 */

// start program
const express = require('express');
const service = require('../models/service');

router = express.Router();

 /*
 *  Name: findAllServices
 *  Params:
 *  Description:
 *  By Thip Rattanavilay
 */
router.get('/', function (req, res, next) {
    Service.find({}, function (err, services) {
      if (err) {
        console.log('service api', err);
        return next(err);
      } else {
        console.log('service api', services);
        res.json(services);
      }
    });
});


 /*
 *  Name: findById
 *  Params:
 *  Description:
 *  By Thip Rattanavilay
 */
router.get('/:id', function(req,res,next){
    Service.findOne({'_id':req.params.id},function(err,service){
        if(err){
            console.log(err);
            return next(err);
        }
        else{
            console.log(service);
            res.json(service);
        }
    })
});


 /*
 *  Name: CreateService
 *  Params:
 *  Description:
 *  By Thip Rattanavilay
 */
router.post('/', function(req,res,next){
    let = serv = {
        title: req.body.title,
        id: req.body.id,
        price: req.body.price
    };
    Service.create(serv,function(err,service){
        if(err){
            console.log(err);
            return next(err);
        }
        else{
            console.log(service);
            res.json(service);
        }
    })
});


 /*
 *  Name: updateService
 *  Params:
 *  Description:
 *  By Thip Rattanavilay
 */
router.put('/:serviceId', function(req,res,next){
    Service.findOne({'_id':req.params.serviceId},function(err,service){
        if(err){
            console.log(err);
            return next(err);
        }
        else{
            console.log(service);
            service.set({
                title: req.body.title,
                price: req.body.price
            });


            service.save(function(err,service){
                if(err){
                    console.log(err);
                    return next(err);
                }
                else{
                    console.log(service);
                    res.json(service);
                }
            })
        }
    })
});


 /*
 *  Name: deleteService
 *  Params:
 *  Description:
 *  By Thip Rattanavilay
 */
router.delete('/:serviceId',function(req,res,next){
    Service.findByIdAndDelete({'_id': req.params.serviceId},function(err,service){
        if(err){
            console.log(err);
            return next(err);
        }else{
            console.log(service);
            res.json(service);
        }
    });
});

// export the router
module.exports = router;

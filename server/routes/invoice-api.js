/*
 *  Title: invoice-api.ts
 *  Author: April Auger
 *  Date: 20 April 2020
 *  Description: The invoice API for the BCRS application.
 */

// Required modules
const express = require('express');
const Invoice = require('../models/invoice');

// Configurations
const router = express.Router();

/*
 *  Name: CreateInvoice
 *  Params: username, callback function
 *  Description: API to create a invoice.
 */
router.post('/:username', function(req, res, next) {
	// Get the username
	const username = req.params.username;

	// Create an invoice object literal to save in the database.
	let invoice = {
		username: username,
		orderDate: req.body.orderDate,
		lineItems: req.body.lineItems,
		lineItemTotal: req.body.lineItemTotal,
		laborAmount: req.body.laborAmount,
		partsAmount: req.body.partsAmount,
		total: req.body.total
	};

	console.log(invoice);

	// Create an invoice document
	Invoice.create(invoice, function(err, newInvoice) {
		if(err) {
			console.log(err);
			return next(err);
		} else {
			console.log(newInvoice);

			// Return the results to the client
			res.json(newInvoice);
		}
	})
});

/*
 *  Name: FindPurchasesByService
 *  Params: callback function
 *  Description: API to find purchases made by specific services.
 */
router.get('/purchases-graph', function(req, res, next) {
	// Query to return a count of puchases by service
	Invoice.aggregate([
		// Unwind the array of line items
		{"$unwind": "$lineItems"},

		// Group on _id, title, and price
		{
			"$group": {
				"_id": {
					"title": "$lineItems.title",
					"price": "$lineItems.price",
				},

				// Get a count of the group items
				"count": {"$sum": 1},
			}
		},
		{"$sort": {"_id.title": 1}},
	], function (err, purchasesGraph) {
		if(err) {
			console.log(err);
			return next(err);
		} else {
			console.log('--PurchaseGraph data structure--');
			console.log(purchasesGraph);

			// Return the purchases graph to the client
			res.json(purchasesGraph);
		}
	});
});

module.exports = router;
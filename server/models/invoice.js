/*
 *  Title: invoice.js
 *  Author: April Auger
 *  Date: 20 April 2020
 *  Description: The invoice model for the BCRS application.
 */

 // Required modules
 const mongoose = require('mongoose');

 // Define a schema
 const Schema = mongoose.Schema;

let InvoiceLineItemSchema = new Schema({
	title: { type: String, require: true },
	price: { type: Number, require: true }
});

let InvoiceSchema = new Schema({
	 username: { type: String, require: true },
	 orderDate: { type: Date, default: new Date(), require: true },
	 lineItems: [InvoiceLineItemSchema],
	 lineItemTotal: { type: Number, require: true },
	 laborTotal: { type: Number, require: true },
	 partsTotal: { type: Number, require: true },
	 grandTotal: { type: Number, require: true }
 }, {
	 collection: "invoices"
 });

 // Attach the InvoiceSchema to the Invoice model
 const Invoice = mongoose.model('Invoice', InvoiceSchema);

 // Make the model available for other modules to require
 module.exports = Invoice;
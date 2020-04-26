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

let lineItemSchema = new Schema({
	title: { type: String, require: true },
	price: { type: Number, require: true }
});

let invoiceSchema = new Schema({
  lineItems: [lineItemSchema],
  partsAmount: {type: Number},
  laborAmount: {type: Number},
  lineItemTotal: {type: Number},
  total: {type: Number},
  username: {type: String},
  orderDate: {type: Date}
 }, {
	 collection: "invoices"
 });

 // Attach the InvoiceSchema to the Invoice model
 const Invoice = mongoose.model('Invoice', invoiceSchema);

 // Make the model available for other modules to require
 module.exports = Invoice;

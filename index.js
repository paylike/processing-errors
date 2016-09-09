'use strict'

var indexBy = require('index-by');
var assign = require('object-assign');

var errors = [
	{
		code: 2,
		text: 'Invalid card details',
		client: true,
		merchant: false,
	},
	{
		code: 3,
		text: 'Invalid card number',
		client: true,
		merchant: false,
	},
	{
		code: 4,
		text: 'Invalid security code (CSC)',
		client: true,
		merchant: false,
	},
	{
		code: 5,
		text: 'Invalid expire date',
		client: true,
		merchant: false,
	},
	{
		code: 6,
		text: 'Card expired',
		client: true,
		merchant: false,
	},
	{
		code: 7,
		text: 'Insufficient funds',
		client: true,
		merchant: false,
	},
	{
		code: 17,
		text: 'Missing card number',
		client: true,
		merchant: false,
	},
	{
		code: 18,
		text: 'Missing card expiry month',
		client: true,
		merchant: false,
	},
	{
		code: 19,
		text: 'Missing card expiry year',
		client: true,
		merchant: false,
	},
	{
		code: 20,
		text: 'Missing card security code (CSC)',
		client: true,
		merchant: false,
	},
	{
		code: 25,
		text: 'Card amount limit exceeded',
		client: true,
		merchant: false,
	},
	{
		code: 29,
		text: 'Invalid card number or card not supported',
		client: true,
		merchant: false,
	},

	{
		code: 15,
		text: 'Missing amount',
		client: true,
		merchant: true,
	},
	{
		code: 14,
		text: 'Invalid amount',
		client: true,
		merchant: true,
	},
	{
		code: 16,
		text: 'Missing currency',
		client: true,
		merchant: true,
	},
	{
		code: 1,
		text: 'Invalid currency',
		client: true,
		merchant: true,
	},
	{
		code: 30,
		text: '3-D Secure is required',
		client: true,
		merchant: false,
	},
	{
		code: 31,
		text: '3-D Secure failed',
		client: true,
		merchant: false,
	},

	{
		code: 13,
		text: 'Invalid descriptor',
		client: false,
		merchant: true,
	},
	{
		code: 21,
		text: 'Missing secure connection (https)',
		client: false,
		merchant: true,
	},
	{
		code: 22,
		text: 'Amount is bigger than allowed, please contact us',
		client: false,
		merchant: true,
	},
	{
		code: 26,
		text: 'Invalid merchant public key, please contact us',
		client: false,
		merchant: true,
	},
	{
		code: 27,
		text: 'The merchant is not allowed to create transactions',
		client: false,
		merchant: true,
	},
	{
		code: 28,
		text: 'The merchant is not allowed to save cards',
		client: false,
		merchant: true,
	},

	{
		code: 8,
		text: 'Declined by cardholder bank',
		client: true,
		merchant: false,
	},
	{
		code: 9,
		text: 'Card restricted',
		client: true,
		merchant: false,
	},
	{
		code: 10,
		text: 'Card rejected',
		client: true,
		merchant: false,
	},
	{
		code: 11,
		text: 'Transaction rejected',
		client: true,
		merchant: true,
	},
	{
		code: 12,
		text: 'Error, please try again or contact us',
		client: true,
		merchant: true,
	},
];

errors.Error = ProcessingError;
errors.byCode = findByCode;

var indexByCode = null;

module.exports = errors;

function findByCode( code ){
	if (indexByCode === null)
		indexByCode = indexBy(errors, 'code');

	return indexByCode[code];
}


function ProcessingError( code, opts ){
	var description = findByCode(code);

	this.code = description.code;
	this.text = description.text;
	this.message = description.text;

	this.client = description.client;
	this.merchant = description.merchant;

	assign(this, opts);
}

ProcessingError.prototype = Object.create(Error.prototype);

'use strict'

var errors = [
	{
		code: 2,
		message: 'Invalid card details',
		client: true,
		merchant: false,
	},
	{
		code: 3,
		message: 'Invalid card number',
		client: true,
		merchant: false,
	},
	{
		code: 4,
		message: 'Invalid security code (CSC)',
		client: true,
		merchant: false,
	},
	{
		code: 5,
		message: 'Invalid expire date',
		client: true,
		merchant: false,
	},
	{
		code: 6,
		message: 'Card expired',
		client: true,
		merchant: false,
	},
	{
		code: 7,
		message: 'Insufficient funds',
		client: true,
		merchant: false,
	},
	{
		code: 17,
		message: 'Missing card number',
		client: true,
		merchant: false,
	},
	{
		code: 18,
		message: 'Missing card expiry month',
		client: true,
		merchant: false,
	},
	{
		code: 19,
		message: 'Missing card expiry year',
		client: true,
		merchant: false,
	},
	{
		code: 20,
		message: 'Missing card security code (CSC)',
		client: true,
		merchant: false,
	},
	{
		code: 25,
		message: 'Card amount limit exceeded',
		client: true,
		merchant: false,
	},
	{
		code: 29,
		message: 'Invalid card number or card not supported',
		client: true,
		merchant: false,
	},

	{
		code: 15,
		message: 'Missing amount',
		client: true,
		merchant: true,
	},
	{
		code: 14,
		message: 'Invalid amount',
		client: true,
		merchant: true,
	},
	{
		code: 16,
		message: 'Missing currency',
		client: true,
		merchant: true,
	},
	{
		code: 1,
		message: 'Invalid currency',
		client: true,
		merchant: true,
	},
	{
		code: 30,
		message: '3-D Secure is required',
		client: true,
		merchant: false,
	},
	{
		code: 31,
		message: '3-D Secure failed',
		client: true,
		merchant: false,
	},

	{
		code: 13,
		message: 'Invalid descriptor',
		client: false,
		merchant: true,
	},
	{
		code: 21,
		message: 'Missing secure connection (https)',
		client: false,
		merchant: true,
	},
	{
		code: 22,
		message: 'Amount is bigger than allowed, please contact us',
		client: false,
		merchant: true,
	},
	{
		code: 26,
		message: 'Invalid merchant public key, please contact us',
		client: false,
		merchant: true,
	},
	{
		code: 27,
		message: 'The merchant is not allowed to create transactions',
		client: false,
		merchant: true,
	},
	{
		code: 28,
		message: 'The merchant is not allowed to save cards',
		client: false,
		merchant: true,
	},

	{
		code: 8,
		message: 'Declined by cardholder bank',
		client: true,
		merchant: false,
	},
	{
		code: 9,
		message: 'Card restricted',
		client: true,
		merchant: false,
	},
	{
		code: 10,
		message: 'Card rejected',
		client: true,
		merchant: false,
	},
	{
		code: 11,
		message: 'Transaction rejected',
		client: true,
		merchant: true,
	},
	{
		code: 12,
		message: 'Error, please try again or contact us',
		client: true,
		merchant: true,
	},
];

errors.Error = ProcessingError;

module.exports = errors;

function ProcessingError( code, opts ){
	var blueprint = errors.find(function( bp ){
		return bp.code === code;
	});

	if (!blueprint)
		throw new Error('Unknown error code "'+code+'"');

	this.code = blueprint.code;
	this.message = blueprint.message;

	this.client = blueprint.client;
	this.merchant = blueprint.merchant;

	Object.assign(this, opts);
}

ProcessingError.prototype = Object.create(Error.prototype);

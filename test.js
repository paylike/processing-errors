'use strict';

var assert = require('assert');
var errors = require('./');

assert.ok(Array.isArray(errors));

assert.deepStrictEqual(errors.find(e => e.code === 2), {
	code: 2,
	message: 'Invalid card details',
	client: true,
	merchant: false,
});

assert.ok(new errors.Error(2) instanceof errors.Error);

assert.ok((new errors.Error(2)).code === 2);

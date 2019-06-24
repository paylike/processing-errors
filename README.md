# Processing errors

This package contains a list of the various errors you might see when
processing new transactions either
[through the API](https://github.com/paylike/api-docs#create-a-transaction) or
in [the frontend](https://github.com/paylike/sdk).

Read more about [transaction errors here](https://paylike.io/transactions/errors).


```js
var errors = require('@paylike/processing-errors');

errors.find(e => e.code === 2);

{
	code: 2,
	text: 'Invalid card details',

	// the user might be to blame?
	client: true,

	// the merchant might be to blame?
	merchant: false,
}
```

Both `client` and `merchant` are `true` if the error could be the
responsibility of either or both.

```js
errors
	.filter(e => e.client)
	.map(e => e.message);

[
	'Invalid card details',
	'Invalid card number',
	'Invalid security code (CSC)',
	'Invalid expire date',
	'Card expired',
	'Insufficient funds',
	'Missing card number',
	'Missing card expiry month',
	'Missing card expiry year',
	'Missing card security code (CSC)',
	'Card amount limit exceeded',
	'Invalid card number or card not supported',
	'Missing amount',
	'Invalid amount',
	'Missing currency',
	'Invalid currency',
	'3-D Secure is required',
	'3-D Secure failed',
	'Declined by cardholder bank',
	'Card restricted',
	'Card rejected',
	'Transaction rejected',
	'Error, please try again or contact us',
];
```

```js
errors
	.filter(e => e.client && e.merchant)
	.map(e => e.message);

[
	// since the popup does allow `amount` and `currency to be input by the
	// user, it could be a fault of either.

	'Missing amount',
	'Invalid amount',
	'Missing currency',
	'Invalid currency',
	'Transaction rejected',
	'Error, please try again or contact us',
]
```


## Dealing with errors in the frontend

If the `merchant` field is `true` you should log the error as fatal and deal
with it as a programming error.

If the `client` field is `true`, the message should be shown to the user.

Depending on your setup you should decide whether to log and/or display errors
that are `true` for both `client` and `merchant`.


## Dealing with errors from the server

This is most commonly encountered with
[recurring payments](https://github.com/paylike/api-docs#recurring-payments).

Only a subset of the errors are applicable for recurring payments, typically:

Code | Message | Retry is pointless
--- | --- | ---
6	| Card expired							| ✓ |
7	| Insufficient funds					| |
25	| Card amount limit exceeded			| |
8	| Declined by cardholder bank			| |
9	| Card restricted						| |
10	| Card rejected							| ✓ |
11	| Transaction rejected					| |
12	| Error, please try again or contact us	| |

It is recommended to develop a default strategy for any error, be it
network issues or a processing error, for instance by retrying every 24
hours and asking the user to do a manual transaction after 5 attempts. Do not
retry more than twice within a 24 hours window.

Such a default strategy will make your system resilient to the addition of new
error codes and unexpected failures.

In a later iteration, enhance your code by immediately aborting if the code is
either `6` or `10`.

var Account = require('../models/account');

// List all.
exports.accountList = function(req,res) {
	res.send('Account not implemented yet!');
}

// Display detail for a specific account.
exports.accountDetail = function(req,res) {
	res.send('Account detail not implemented yet: ' + req.params.id);
}

// Create an account.
exports.accountCreate = function(req,res) {
	res.send('Account create not implemented yet');
}


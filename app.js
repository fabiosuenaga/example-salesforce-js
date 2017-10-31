var express 		= require('express');
var app 			= express();

var totalSize	= 0;

// Routes
var index 		= require('./routes/index');
var accounts 	= require('./routes/account');

// SObjects.
var accountsSF 	= [];
var contactsSF 	= [];

app.get('/oauth/auth', function(req, res) {
 res.redirect(oauth2.getAuthorizationUrl({scope: 'api id web'}));
});

/************************
ROUTES
************************/

// app.get('/account/:accountId', function (req, res) {
//   console.log('Route: accounts');
//   console.log('Account: ' + JSON.stringify(accounts[0]));
//   res.send(req.params);
// });

// app.get('/contact/:contactId', function (req, res) {
//   console.log('Route: contacts');
//   res.send(req.params);
// });


app.use('/',index);
app.use('/accounts',accounts);

module.exports 	= app; 

// exports.showOrListUsers = function(req, res, next) {
//   var shrinkr = req.app.get('shrinkr');
//   ...
// };

/************************
SF CONNECTION/LOAD SOBJECT
************************/

var jsforce		= require('jsforce');
var username 	= 'developer@fabiosuenaga.com.br';
var password 	= 'barakobama666izETCKnBzWFWe00FzPAQSjjWv';
var conn 		= new jsforce.Connection({
	loginUrl : 'https://na73.salesforce.com'
});

conn.login(username, password, function(err, userInfo) {

	if (err) { return console.error(err); }
	console.log(conn.accessToken);
	console.log(conn.instanceUrl);

	console.log("User ID: " + userInfo.id);
	console.log("Org ID: " 	+ userInfo.organizationId);

	var records = [];

	// Load accounts.
	conn.query("SELECT Id, Name FROM Account", function(err, result) {
 		
 		if (err) { return console.error("z"+err); }
 		console.log("Account - total : " + result.totalSize);
 		totalSize = result.totalSize;
 		console.log("Accounts fetched : " + result.records.length);

 		for(i = 0; i < result.records.length - 1; i++) {
 			accountsSF[i] = result.records[i];
 		} 
	
		app.set('accounts',accountsSF);

	});

	// Load contacts.
	conn.query("SELECT Id, Name FROM CONTACT", function(err, result) {

 		if (err) { return console.error("z"+err); }
 		console.log("Contact - total : " + result.totalSize);
 		totalSize = result.totalSize;
 		console.log("Contacts fetched : " + result.records.length);

 		for(i = 0; i < result.records.length - 1; i++) {
 			contactsSF[i] = result.records[i];
 		} 
	
		app.set('contacts',contactsSF);

	});

});

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});
var express = require('express');
var router 	= express.Router();

var accountController = require('../controllers/account-controller');
var contactController = require('../controllers/contact-controller');

// ACCOUNT ROUTE

/* GET request for list of all Accounts. */
router.get('/accounts', accountController.accountList);

/* GET request for one Account. */
router.get('/account/:id', accountController.accountDetail);

/* POST request for creating Account. */
router.post('/account/create',accountController.accountCreate);

module.exports = router;
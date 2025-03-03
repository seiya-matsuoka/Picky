const express = require('express');
const router = express.Router();
const contacts = require('../controllers/contacts');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');

router.route('/received/:id')
    .get(isLoggedIn, catchAsync(contacts.showReceivedList));

router.route('/sent/:id')
    .get(isLoggedIn, catchAsync(contacts.showSentList));

router.route('/')
    .post(isLoggedIn, catchAsync(contacts.createContact));

router.route('/:id/approval')
    .post(isLoggedIn, catchAsync(contacts.changeApproved));

router.route('/:id/rejection')
    .post(isLoggedIn, catchAsync(contacts.changeRejected));

router.route('/:id')
    .delete(isLoggedIn, catchAsync(contacts.deleteContacts));


module.exports = router;
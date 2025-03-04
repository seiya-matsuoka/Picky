const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../controllers/users');
const { isLoggedIn } = require('../middleware');
const catchAsync = require('../utils/catchAsync');

router.route('/register')
    .get(users.renderRegister)
    .post(users.register);

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.get('/logout', users.logout);

router.delete('/:id', isLoggedIn, catchAsync(users.deleteUser));

module.exports = router;
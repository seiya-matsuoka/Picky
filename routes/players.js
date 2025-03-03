const express = require('express');
const router = express.Router();
const players = require('../controllers/players');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor } = require('../middleware');
const multer = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage })

router.route('/')
    .get(catchAsync(players.index))
    .post(isLoggedIn, upload.array('image'), catchAsync(players.createPlayer));

router.get('/new', isLoggedIn, players.renderNewForm);

router.route('/:id')
    .get(catchAsync(players.showPlayers))
    .put(isLoggedIn, isAuthor, upload.array('image'), catchAsync(players.updatePlayer))
    
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(players.renderEditForm));

module.exports = router;
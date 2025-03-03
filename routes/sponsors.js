const express = require('express');
const router = express.Router();
const sponsors = require('../controllers/sponsors');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor } = require('../middleware');
const multer = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage })

router.route('/')
    .get(catchAsync(sponsors.index))
    .post(isLoggedIn, upload.array('image'), catchAsync(sponsors.createSponsor));

router.get('/new', isLoggedIn, sponsors.renderNewForm);

router.route('/:id')
    .get(catchAsync(sponsors.showSponsors))
    .put(isLoggedIn, isAuthor, upload.array('image'), catchAsync(sponsors.updateSponsor))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(sponsors.renderEditForm));

module.exports = router;
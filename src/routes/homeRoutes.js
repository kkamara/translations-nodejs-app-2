'use strict';
const express = require('express');
const { getHomePage } = require('../controllers/homeControllers');
const { changeLanguage } = require('../controllers/languageControllers');

const router = express.Router();

router.route("/home").get(getHomePage);
router.route("/change-language").get(changeLanguage);

module.exports = router;
'use strict';
const express = require('express');
const { health } = require('../../controllers/API/healthControllers');
const { sendEmailRoute } = require('../../controllers/API/emailControllers');

const router = express.Router();

router.route("/health").get(health);
router.route("/email").get(sendEmailRoute);

module.exports = router;
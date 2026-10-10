'use strict';
const express = require('express');
const { getUsers } = require('../../../../controllers/API/V1/web/usersControllers');
const { authenticate, } = require("../../../../middlewares/V1/authMiddleware");

const router = express.Router();

router.route("/").get(authenticate, getUsers);

module.exports = router;
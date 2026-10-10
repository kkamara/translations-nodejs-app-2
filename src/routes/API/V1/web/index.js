'use strict';
const express = require('express');
const homeRoutes = require("./homeRoutes");

const router = express.Router();

router.use("/home", homeRoutes);

module.exports = router;
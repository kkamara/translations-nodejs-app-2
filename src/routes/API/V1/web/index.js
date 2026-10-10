'use strict';
const express = require('express');
const usersRoutes = require("./usersRoutes");
const userRoutes = require("./userRoutes");
const homeRoutes = require("./homeRoutes");

const router = express.Router();

router.use("/users", usersRoutes);
router.use("/user", userRoutes);
router.use("/home", homeRoutes);

module.exports = router;
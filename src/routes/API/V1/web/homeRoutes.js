"use strict";
const express = require("express");
const { getHome } = require("../../../../controllers/API/V1/web/homeControllers");

const router = express.Router();

router.get("/", getHome);

module.exports = router;

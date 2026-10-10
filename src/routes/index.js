'use strict';
const express = require('express');
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./API');
const v1Routes = require('./API/V1');
const { setApiLanguage } = require('../middlewares/V1/apiLanguageMiddleware');
const { setLanguage } = require('../middlewares/V1/setLanguageMiddleware');

const router = express.Router();

router.use(['/api', '/mobile-api'], setApiLanguage);
router.use('/api', apiRoutes);
router.use('/api/v1', v1Routes);
router.use('/', setLanguage, homeRoutes);

module.exports = router;
const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/authentication');

// Add the required routes
router.use('/auth', require('./auth'));
router.use('/products', authenticate, require('./products'));
router.use('/reviews', require('./reviews'));
router.use('/users', require('./users'));
router.use('/services', authenticate, require('./services'));
router.use('/releases', authenticate, require('./releases'));
router.use('/blog', authenticate, require('./blog'));
router.use('/courses', authenticate, require('./courses'));

module.exports = router;
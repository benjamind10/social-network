// Imports & Dependencies
const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// Both thought and user routes
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;

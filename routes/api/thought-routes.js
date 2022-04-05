// Imports & Dependencies
const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thought-controller');

// Get and Post routes for thoughts
router.route('/').get(getAllThoughts).post(createThought);

// Single thought routes
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Thought and reaction routes
router
  .route('/:thoughtId/reactions')
  .post(addReaction)
  .delete(deleteReaction);

module.exports = router;

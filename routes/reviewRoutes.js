const express = require('express');
const {
    submitReview,
    updateReview,
    deleteReview,
} = require('../controllers/reviewController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/books/:id/reviews', auth, submitReview);
router.put('/reviews/:id', auth, updateReview);
router.delete('/reviews/:id', auth, deleteReview);

module.exports = router;

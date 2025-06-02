const Review = require('../models/Review');

// Submit a review (one per user per book)
exports.submitReview = async (req, res) => {
    const { id: bookId } = req.params;
    const { rating, comment } = req.body;

    try {
        const existing = await Review.findOne({ book: bookId, user: req.user.id });
        if (existing) {
        return res.status(400).json({ message: 'You already reviewed this book' });
        }

        const review = await Review.create({
        rating,
        comment,
        book: bookId,
        user: req.user.id,
        });

        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ message: 'Failed to add review', error: err.message });
    }
};

// Update own review
exports.updateReview = async (req, res) => {
    const { id } = req.params;

    try {
        const review = await Review.findById(id);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        if (review.user.toString() !== req.user.id)
        return res.status(403).json({ message: 'Not authorized' });

        review.rating = req.body.rating || review.rating;
        review.comment = req.body.comment || review.comment;
        await review.save();

        res.json(review);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update review', error: err.message });
    }
};

// Delete own review
exports.deleteReview = async (req, res) => {
    const { id } = req.params;

    try {
        const review = await Review.findById(id);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        if (review.user.toString() !== req.user.id)
        return res.status(403).json({ message: 'Not authorized' });

        await review.deleteOne();
        res.json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete review', error: err.message });
    }
};

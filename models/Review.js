const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: { 
        type: Number, 
        min: 1, 
        max: 5 
    },
    comment: String,
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    book: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Book' 
    }
});

module.exports = mongoose.model('Review', reviewSchema);

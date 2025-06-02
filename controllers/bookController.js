const Book = require('../models/Book');
const Review = require('../models/Review');

// Add a new book
exports.addBook = async (req, res) => {
    try {
        const book = await Book.create({ ...req.body, createdBy: req.user.id });
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ message: 'Failed to add book', error: err.message });
    }
};

// Get all books (with pagination and filters)
exports.getBooks = async (req, res) => {
    const { author, genre, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (author) filter.author = new RegExp(author, 'i');
    if (genre) filter.genre = genre;

    try {
        const books = await Book.find(filter)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching books', error: err.message });
    }
};

// Get book details by ID with reviews and average rating
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        const reviews = await Review.find({ book: book._id }).populate('user', 'name');
        const averageRating =
        reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);

        res.json({ book, averageRating, reviews });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching book', error: err.message });
    }
};

// Search books
exports.searchBooks = async (req, res) => {
    const { q } = req.query;
    try {
        const books = await Book.find({
        $or: [
            { title: new RegExp(q, 'i') },
            { author: new RegExp(q, 'i') },
        ],
        });
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: 'Search failed', error: err.message });
    }
};

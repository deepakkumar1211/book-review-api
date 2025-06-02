const express = require('express');
const {
    addBook,
    getBooks,
    getBookById,
    searchBooks,
} = require('../controllers/bookController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/books', auth, addBook);
router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.get('/search', searchBooks);

module.exports = router;

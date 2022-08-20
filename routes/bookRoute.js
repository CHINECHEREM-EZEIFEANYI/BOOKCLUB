const bookRoute = require('express').Router()
const { getAllBooks, createBook, getBook, updateBook, deleteBook } = require('../controllers/bookController')

bookRoute.get('/list', getAllBooks)
bookRoute.post('/create',  createBook)
bookRoute.get('/:id', getBook)
bookRoute.patch('/:id',  updateBook)
bookRoute.delete('/:id',  deleteBook)

bookRoute.get('/check', (req, res) => {
    res.send('BOOKS AVAILABLE')
})

// function checkAuthenticated(req, res, next) {
//     if (req.book) {
//         next();
//     }

//     else {
//         req.flash('success_msg', 'You need to be authenticated to access this page');
//         res.redirect("/login");

//     }
// }
module.exports = bookRoute


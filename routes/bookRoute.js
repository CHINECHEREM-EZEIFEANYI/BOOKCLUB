const bookkRoute = require('express').Router()

const { getAllBooks, createBook, getBook, updateBook, deleteBook } = require('../controllers/bookController')

bookRoute.get('/', getAllBooks)
bookRoute.post('/', createBook)
bookRoute.get('/:id', getBook)
bookRoute.patch('/:id', updateBook)
bookRoute.delete('/:id', deleteBook)

booRoute.get('/check', (req, res) => {
    res.send('BOOKS AVAILABLE')
})

module.exports = bookkRoute


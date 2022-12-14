const mongoose = require('mongoose')
const bookRoute = require('express').Router()
const { getAllBooks, createBook, getBook, updateBook, deleteBook } = require('../controllers/bookController')

bookRoute.get('/list', getAllBooks)
bookRoute.post('/create',  createBook)
bookRoute.get('/book/:id', getBook)
bookRoute.patch('/update/:id',  updateBook)
bookRoute.post('/delete/:id',  deleteBook)

bookRoute.get('/check', (req, res) => {
    res.send('BOOKS AVAILABLE')
})


module.exports = bookRoute


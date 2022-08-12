const taskRoute = require('express').Router()

const { getAllBooks, createBook, getBook, updateBook, deleteBook } = require('../controllers/bookController')

taskRoute.get('/', getAllBooks)
taskRoute.post('/', createBook)
taskRoute.get('/:id', getBook)
taskRoute.patch('/:id', updateBook)
taskRoute.delete('/:id', deleteBook)

taskRoute.get('/check', (req, res) => {
    res.send('BOOKS AVAILABLE')
})

module.exports = taskRoute


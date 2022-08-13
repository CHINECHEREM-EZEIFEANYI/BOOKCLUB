const { Schema } = require('mongoose')
const mongoose = require('mongoose')


const BookSchema = new mongoose.Schema({
    ISBN: {
        type: String,
    },
    Name: {
        type: String,
    },
    Author: {
        type: String,
    },
    Genre: {
        type: String,
    },
})
exports.Book = mongoose.model('Book', BookSchema);
const { Schema } = require('mongoose')
const mongoose = require('mongoose')


exports.bookSchema = new mongoose.Schema({
    ISBN: Number,
    Name: String,
    Author: String,
    Genre: String,
})

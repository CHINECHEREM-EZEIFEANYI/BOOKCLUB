const { Book } = require('../models/books')
const asyncWrapper = require('./async')
const mongoose = require("mongoose")


exports.getAllBooks = asyncWrapper(async (req, res) => {
    const books = await Book.find({})
    res.status(200).json({ books })

})


exports.createBook = asyncWrapper(async (req, res) => {

    const book = await Book.create(req.body)
    res.status(200).json({ book })
})

exports.getBook = asyncWrapper(async (req, res) => {

    const { id: BookID } = req.params
    const book = await Book.findOne({ _id: BookID })
    if (!book) {
        return res.status(404).json({ msg: `No book with with id: ${BookID}` })
    }
    res.status(200).json({ book })
})


exports.updateBook = asyncWrapper(async (req, res) => {
    const { id: BookID } = req.params
    const filter = { _id: BookID };
    const update = req.body;

    if (!await Book.findOne({ _id: mongoose.Types.ObjectId(BookID) })) {
        return res.status(404).json({ msg: `No book with with id: ${BookID}` })
    }

    await Book.findOneAndUpdate(filter, update)

    let newBook = await Book.findOne({ _id: BookID })
    res.status(200).json(newBook)
})


exports.deleteBook = asyncWrapper(async (req, res) => {
    const { id: BookID } = req.params
    const book = await Book.findOneAndDelete({ _id: BookID })
    if (!book) {
        return res.status(404).json({ msg: `No book with with id: ${BookID}` })
    }
    res.status(200).json({ msg: "Deleted Successfully" })

})
// app.delete("/api/books/:id", async (req, res) => {
//     try {
//         const { id: id } = req.params;
//         console.log(id);
//         if (!mongoose.Types.ObjectId.isValid(id))
//             return res.status(404).json({
//                 msg: `No task with id :${id}`
//             });
//         const task = await Task.findOneAndDelete({ _id: id });
//         res.status(200).json(task);
//     } catch (error) {
//         console.log(error);
//     }
// });
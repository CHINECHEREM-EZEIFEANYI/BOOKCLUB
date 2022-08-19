require("dotenv").config()
const mongoose = require('mongoose');
const db ="mongodb+srv://bookclub:%40OxBrando0@cluster0.hmj5qle.mongodb.net/?retryWrites=true&w=majority"

module.exports = function () {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(
        console.log('database connection successful')

    )
}

require("dotenv").config()
const mongoose = require('mongoose');
const db = "mongodb://localhost:27017"

module.exports = function () {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(
        console.log('database connection successful')

    )
}

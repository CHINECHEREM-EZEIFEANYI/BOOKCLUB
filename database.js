require("dotenv").config()
const mongoose = require('mongoose');
const db = process.env.DB
module.exports = function () {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(
        console.log('database connection successful')

    )
}

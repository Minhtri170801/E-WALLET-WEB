const mongoose = require('mongoose')

const accountSchema = mongoose.Schema({
    name: String,
    phoneNumber: String,
    email: String,
    username: String,
    password: String,
    money: Number,
    historyTransaction: [String],
})

const account = mongoose.model('Account', accountSchema)
module.exports = account
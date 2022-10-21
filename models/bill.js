const mongoose = require('mongoose');
const { NUMBER } = require('sequelize');
const billSchema = mongoose.Schema({
    MaHD: {type: String, default: "HD"+ Date.now()},
    email: String,
    MSSV: String,
    money: Number,
    isPay: { type: Boolean, default: false },
    time: { type: Date, default: Date.now() },
})

const bill = mongoose.model('Bill', billSchema)
module.exports = bill;
const mongoose = require('mongoose');
const randomOTP = require('../lib/randomOTP');

const billSchema = mongoose.Schema({
    MaHD: {type: String, default: "HD"+randomOTP.createNumber()+ Date.now()},
    email: String,
    MSSV: String,
    studentName: String,
    money: Number,
    isPay: { type: Boolean, default: false },
    time: { type: String, default: getTimeNow()},
})

const bill = mongoose.model('Bill', billSchema)
module.exports = bill;

function getTimeNow() {
    var d = new Date(Date.now());
    var dformat = [d.getMonth()+1,
        d.getDate(),
        d.getFullYear()].join('/')+' '+
       [d.getHours(),
        d.getMinutes(),
        d.getSeconds()].join(':');
    return dformat;
}
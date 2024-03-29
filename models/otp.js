const mongoose = require('mongoose')

const otpSchema = mongoose.Schema({
    email: String,
    otp: String,
    time: {type: Date, default: Date.now(), index: {expires: 60}},
})

const otp = mongoose.model('OTP', otpSchema)
module.exports = otp;
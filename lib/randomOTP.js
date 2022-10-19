const otpGenerator = require('otp-generator');
var OTP = require('../models/otp');
var sendMail = require('../lib/sendMail');

module.exports = {
    createOTP: function(email) {
        var otp = otpGenerator.generate(5, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        var newOTP = new OTP({email: email, otp: otp});
        newOTP.save();
        sendMail.sendOTP(email,otp);
    }
}
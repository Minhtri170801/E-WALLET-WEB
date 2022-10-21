const otpGenerator = require('otp-generator');
var OTP = require('../models/otp');
var sendMail = require('../lib/sendMail');

module.exports = {
    createOTP: function(email) {
        var otp = otpGenerator.generate(5, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        //Xoa OTP cu
        OTP.deleteOne({email: email}, (err, result) => {});
        var newOTP = new OTP({email: email, otp: otp});
        newOTP.save();
        //Gui OTP moi
        sendMail.sendOTP(email,otp);
    }
}
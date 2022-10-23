const nodemailer = require('nodemailer');

var mailUsername = process.env.MAIL_USERNAME;
var mailPassword = process.env.MAIL_PASSWORD;

function formatMoney(money) {
    money = money.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
    money = money.replaceAll('.',',')
    return money.replace('VND','đ')
}

var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
        user: mailUsername,
        pass: mailPassword,
    },
});

module.exports = {
    sendOTP: function (email, otp) {
        /* Tạo nội dung mail */
        let mailOption = {
            from: mailUsername,
            to: email,
            subject: 'OTP xác nhận thanh toán',
            text: `Mã OTP của quý khách là: ` + otp
        }

        //Tiến hành gửi mã OTP tới email 
        transporter.sendMail(mailOption, (err, data) => {
            if (err)
                console.log(err.message)
            else
                console.log('Gửi thông tin thành công')
        })
    },

    sendBill: function (email, money, MSSV, MaHD) {
        /* Tạo nội dung mail */
        let mailOption = {
            from: mailUsername,
            to: email,
            subject: 'Hóa đơn thanh toán học phí',
            text: `Đã thanh toán cho sinh viên: ${MSSV}\nMã hóa đơn: ${MaHD}\nSố tiền: ${formatMoney(money)}`
        }

        //Tiến hành gửi mã OTP tới email 
        transporter.sendMail(mailOption, (err, data) => {
            if (err)
                console.log(err.message)
            else
                console.log('Gửi thông tin thành công')
        })
    },
}
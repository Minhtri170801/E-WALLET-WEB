var express = require('express');
var router = express.Router();
var check = require('../lib/check');
var randomOtp = require('../lib/randomOTP');
var Account = require('../models/account');
const fetch = require('node-fetch');
const OTP = require('../models/otp');
const Bill = require('../models/bill');
const sendMail = require('../lib/sendMail');

var linkAPI = `http://localhost:${process.env.PORT}/api`
/* GET home page. */
router.get('/', check.isNotLogin, check.isHasTransaction, async function (req, res) {
  var account = req.session.account;
  var historyTransaction = await Bill.find({ MaHD: { $in: account.historyTransaction }, isPay: true });

  var information = {
    title: 'Đóng học phí',
    fullname: account.name,
    phone: account.phoneNumber,
    email: account.email,
    money: account.money,
    historyTransaction: historyTransaction,
    css: ['style.css', 'form-fee.css', 'login.css', 'transaction-history.css']
  }
  res.render('index', information);
});

/* POST home page. */
router.post('/', function (req, res) {
  var { email, MSSV } = req.body;
  fetch(linkAPI + '/student/' + MSSV)
    .then(res => res.json())
    .then(async (student) => {
      if (student.code == 0) {
        var account = await Account.findOne({ email: email });

        var st = student.student

        if (st.fee == 0) {
          //So tien khong du
          req.session.message = {
            type: "alert-fail",
            message: "Sinh viên này không có học phí!"
          }
          return res.redirect('/');
        }

        if (account.money < st.fee) {
          //So tien khong du
          req.session.message = {
            type: "alert-fail",
            message: "Tài khoản không đủ số tiền để thanh toán!"
          }
          return res.redirect('/');
        }
        //Tao hoa don 
        new Bill({ email: email, MSSV: MSSV, studentName: st.fullName, money: st.fee }).save();
        return res.redirect('/otp'); 
        
      }
      else {
        return res.redirect('/');
      }
    });
})

/* GET OTP page. */
router.get('/otp', check.isNotLogin, check.isNotHasTransaction, function (req, res) {
  var account = req.session.account;
  //Tao ma otp
  randomOtp.createOTP(account.email);
  var information = {
    title: 'OTP',
    email: account.email,
    css: ['otp.css']
  }
  res.render('otp', information);
});

/* POST OTP page */
router.post('/otp', async function (req, res) {
  var account = req.session.account;
  var { ist, sec, third, fourth, fifth } = req.body;
  var inputOTP = ist + sec + third + fourth + fifth;

  //Kiểm tra OTP đúng hay không
  var otp = await OTP.findOne({ email: account.email, otp: inputOTP });
  if (otp) {
    setImmediate(async () => {
      //Lấy thông tin của hóa đơn
      var bill = await Bill.findOne({ email: account.email, isPay: false })
      //Tiến hành xữ lý trừ học phí của sinh viên
      fetch(linkAPI + '/student-pay-fee/', {
        method: 'POST',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({ MSSV: bill.MSSV })
      })
        .then((res) => res.json())
        .then((result) => {
          //Nếu học phí của xinh viên đã thanh toán thành công
          if (result.code == 0) {
            return res.redirect(307, '/pay-success');
          }
          //Nếu học phí của sinh viên đã có người khác thanh toán
          else {
            return res.redirect(307, '/pay-fail');
          }
        })
    })
  }
  else {
    req.session.message = {
      type: "alert-fail",
      message: "Mã OTP không đúng!"
    }
    return res.redirect('/otp')
  }
})

/* POSt handle success */
router.post('/pay-success', async (req, res) => {
  var account = req.session.account;
  //Chuyển trạng thái hóa đơn sang thành công
  var bill = await Bill.findOneAndUpdate({ email: account.email, isPay: false }, { isPay: true });
  //Trừ tiên trong tài khoản
  var account = await Account.findOneAndUpdate({ email: account.email }, { money: account.money - bill.money, $push: { historyTransaction: bill.MaHD } });

  account.money = account.money - bill.money;
  account.historyTransaction.push(bill.MaHD);

  req.session.account = account;

  //Gửi mail hóa đơn
  sendMail.sendBill(account.email, bill.money, bill.MSSV, bill.MaHD);
  req.session.message = {
    type: "alert-success",
    message: "Thanh toán học phí thành công!"
  }
  res.redirect('/')

})

/* POST handle fail */
router.post('/pay-fail', (req, res) => {
  var account = req.session.account
  //Hủy hóa đơn
  Bill.deleteOne({ email: account.email, isPay: false }, (err, bill) => {
    req.session.message = {
      type: "alert-fail",
      message: "Học phí sinh viên này đã được thanh toán trước đó!"
    }
    res.redirect('/');
  })
})
/* GET cancel transaction */
router.get('/cancel-transaction', check.isNotLogin, check.isNotHasTransaction, async function (req, res) {
  var account = req.session.account
  var bill = await Bill.deleteOne({ email: account.email, isPay: false });
  res.redirect('/');
})

/* GET login page. */
router.get('/login', check.isLogin, function (req, res) {
  var account = '' || req.cookies.username;
  res.clearCookie("username");
  var information = {
    title: 'Đăng nhập',
    username: account,
    css: ['style.css', 'form-fee.css', 'login.css']
  }
  res.render('login', information);
});

/* POST login page. */
router.post('/login', async function (req, res) {
  var { username, password } = req.body;
  var account = await Account.findOne({ username: username, password: password })
  if (account == null) {
    res.cookie("username", username);
    req.session.message = {
      type: "alert-fail",
      message: "Tài khoản hoặc mật khẩu không hợp lệ!"
    }
    return res.redirect('/login');
  }
  req.session.account = account;
  return res.redirect('/');
});

/* GET logout. */
router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/login');
})
module.exports = router;
var express = require('express');
var router = express.Router();
var check = require('../lib/check');
var randomOtp = require('../lib/randomOTP');
var Account = require('../models/account');
const fetch = require('node-fetch');
const student = require('../models/student');
const account = require('../models/account');
const OTP = require('../models/otp');
/* GET home page. */
router.get('/', check.isNotLogin, function (req, res) {
  var account = req.session.account;

  var information = {
    title: 'Đóng học phí',
    fullname: account.name,
    phone: account.phoneNumber,
    email: account.email,
    money: account.money,
    css: ['style.css', 'form-fee.css', 'login.css']
  }
  res.render('index', information);
});

/* POST home page. */
router.post('/', function (req, res) {
  var { email, MSSV } = req.body;
  fetch('http://localhost:3000/api/student/' + MSSV)
    .then(res => res.json())
    .then(student => {
      if (student.code == 0) {
        Account.findOne({ email: email }, (err, account) => {
          if (err || account == null)
            return res.redirect('/');
          var st = student.student  
      
          if (account.money < st.fee) {
            //So tien khong du
            return res.redirect('/');
          }
          randomOtp.createOTP(email);
          return res.redirect('/otp');
        })
      }
      else {
        return res.redirect('/');
      }
    });
})

/* GET OTP page. */
router.get('/otp', function (req, res) {
  var account = req.session.account;
  var information = {
    title: 'OTP',
    email: account.email,
    css: ['otp.css']
  }
  res.render('otp', information);
});

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
router.post('/login', function (req, res) {
  var { username, password } = req.body;

  Account.findOne({ username: username, password: password }, (err, account) => {
    if (err || account == null) {
      res.cookie("username", username);
      return res.redirect('/login');
    }
    req.session.account = account;
    return res.redirect('/');
  })
});

/* GET logout. */
router.get('/reset-OTP', function (req,res) {
  var account = req.session.account
  OTP.deleteOne({email: account.email}, (err, result) => {
    randomOtp.createOTP(account.email);
    return res.redirect('/otp');
  })
})
/* GET logout. */
router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/login');
})
module.exports = router;
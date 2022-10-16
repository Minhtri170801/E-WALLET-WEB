var express = require('express');
var router = express.Router();
var check = require('../lib/check')
var Account = require('../models/account') 
/* GET home page. */
router.get('/', check.isNotLogin,function(req, res) {
  var account = req.session.account;

  var information = {
    title: 'Đóng học phí',
    fullname: account.name,
    phone: account.phoneNumber,
    email: account.email,
    money: account.money,
    css: ['style.css','form-fee.css','login.css']
  }
  res.render('index', information);
});

/* GET OTP page. */
router.get('/otp', function(req,res) {
  var information = {
    title: 'OTP',
    css: ['otp.css']
  }
  res.render('otp',information);
});

/* GET login page. */
router.get('/login', check.isLogin,function(req, res) {
  var account = '' || req.cookies.username;
  res.clearCookie("username");
  var information = {
    title: 'Đăng nhập',
    username: account,
    css: ['style.css','form-fee.css','login.css']
  }
  res.render('login', information);
});

/* POST home page. */
router.post('/login', function(req,res) {
  var {username, password} = req.body;

  Account.findOne({username: username, password: password}, (err,account) => {
    if(err || account == null) {
      res.cookie("username", username);
      return res.redirect('/login');
    }
    req.session.account = account;
    return res.redirect('/');

  })
  res.render('login', { title: 'Đăng nhập' });
});

/* GET logout. */
router.get('/logout', function(req,res) {
  req.session.destroy();
  res.redirect('/login');
})
module.exports = router;
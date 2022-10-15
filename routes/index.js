var express = require('express');
var router = express.Router();
var check = require('../lib/check')
var Account = require('../models/account') 
/* GET home page. */
router.get('/', check.isNotLogin, function(req, res) {
  var account = req.session.account;
  console.log(account);
  var information = {
    title: 'Đóng học phí',
    fullname: account.name,
    phone: account.phoneNumber,
    email: account.email,
    money: account.money,
  }
  res.render('index', information);
});

router.get('/login', check.isLogin, function(req, res) {
  var account = '' || req.cookies.username;
  res.clearCookie("username");
  res.render('login', { title: 'Đăng nhập', username: account});
});

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


router.get('/logout', function(req,res) {
  req.session.destroy();
  res.redirect('/login');
})
module.exports = router;
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Đóng học phí' });
});

router.get('/login', function(req, res) {
  res.render('login', { title: 'Đăng nhập' });
});

module.exports = router;
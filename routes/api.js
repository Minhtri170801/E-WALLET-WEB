const { JSONCookie } = require('cookie-parser');
var express = require('express');
var router = express.Router();
var Studnet = require('../models/student')

/* GET users listing. */
router.get('/student/:id', async function(req, res) {
  var id = req.params.id;
  var student = await Studnet.findOne({attributes: ['MSSV','fullName','fee'], where: {MSSV: id}})
  if(student)
    return res.json({code:0, student: student});
  else
    return res.json({code:1});
})

module.exports = router;

const { Op } = require("sequelize");
var express = require('express');
var router = express.Router();
var Student = require('../models/student');
var OTP = require('../models/otp');

/* GET get information student. */
router.get('/student/:id', async function(req, res) {
  var id = req.params.id;
  var student = await Student.findOne({attributes: ['MSSV','fullName','fee'], where: {MSSV: id}})
  if(student)
    return res.json({code:0, student: student});
  else
    return res.json({code:1});
})

router.post('/student-pay-fee', async function(req,res) {
  var MSSV = (req.body.MSSV).toString();

  var student = await Student.update({fee: 0}, {where: {
    fee: {[Op.gt]: 0},
    MSSV: MSSV
  }});
  if(student[0] == 1)
    return res.json({code:0});
  return res.json({code:1});
})

module.exports = router;

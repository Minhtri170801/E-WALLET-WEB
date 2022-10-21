const { findByIdAndDelete } = require('../models/bill');
const Bill = require('../models/bill')

module.exports = {
    isNotLogin: function(req,res,next) {
        if(!req.session.account) 
            return res.redirect('/login');
        
        next();    
    },

    isLogin: function(req,res,next) {
        if(req.session.account) 
            return res.redirect('/');
            
        next();
    },

    isHasTransaction: function(req,res,next) {
        var account = req.session.account;;
        Bill.findOne({email: account.email, isPay: false}, (err, result) => {
            if(result)
                return res.redirect('/otp')       
            next()
        })
    },

    isNotHasTransaction: function(req,res,next) {
        var account = req.session.account;
        Bill.findOne({email: account.email, isPlay: false}, (err, result) => {
            if(result == null)
                return res.redirect('/')       
            next()
        })
    },
}
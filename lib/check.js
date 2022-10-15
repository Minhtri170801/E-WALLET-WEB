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
    }
}
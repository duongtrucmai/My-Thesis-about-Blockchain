const express = require('express')
const router = express.Router();


router.get('/dashboard', function(req, res, next){    
    if(req.session.loggedinUser){
        res.render('dashboard.ejs',{email:req.session.mail})
    }else{
        res.redirect('/xacthuc');
    }
    
})


module.exports = router;
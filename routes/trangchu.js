const express = require('express')
const router = express.Router();

router.get('/trangchu', function(req, res, next){    
    if(req.session.loggedinUser){
        res.render('trangchu.ejs',{cccd:req.session.cccd})
    }else{
        res.redirect('/xacthuc');
    }
})


module.exports = router;
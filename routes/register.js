const express = require('express')
const app = express()
const router = express.Router();
const accountmodel = require('../data2.js')

router.get('/register', function(req, res, next){
  res.render('register.ejs')
})
router.post('/register', (req, res, next) => {
    var fullname = req.body.fullname
    var cccd = req.body.cccd
    var mail = req.body.mail
    var password = req.body.password
    accountmodel.create({
        fullname: fullname,
        cccd: cccd,
        mail: mail,
        password: password,
        role:'3'
    }).then(data=>{    
        res.redirect('/login');
    }).catch(err=>{
      res.status(500).json('Tao tai khoan that bai')
    })
  })

module.exports = router;
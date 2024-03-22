const express = require('express')
const app = express()
const router = express.Router();
const {account} = require('../data.js')

router.get('/login', function(req, res, next){
  res.render('login.ejs')
})
router.post('/login', (req, res, next) => {
  var admin = req.body.admin
  var password = req.body.password
  account.findOne({
    admin: admin,
    password: password
  }).then(data=>{
    if(data.role==1){
      req.session.loggedinUser= true;
      req.session.admin= admin;
      res.render('dashboard.ejs');
    }if(data.role==3){
      req.session.loggedinUser= true;
      req.session.admin= admin;
      //nếu đăng nhập thành công chuyển qua trangchu
      res.redirect('/xacthuc');
    }
  }).catch(err=>{
    res.status(500).json('co loi ben server')
  })
})

module.exports = router;
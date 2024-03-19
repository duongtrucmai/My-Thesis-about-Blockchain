const express = require('express')
const app = express()
const router = express.Router();
const accountmodel = require('../data.js')

router.get('/add', function(req, res, next){
  res.render('add.ejs')
})
router.post('/add', (req, res, next) => {
  var fullname = req.body.fullname
  var cccd = req.body.cccd
  var mssv = req.body.mssv
  var truong = req.body.truong
  var nganh = req.body.nganh
  var  thanhtich= req.body.thanhtich
  var mail = req.body.mail
    accountmodel.create({
        fullname: fullname,
        cccd: cccd,
        mssv: mssv,
        truong: truong,
        nganh: nganh,
        thanhtich: thanhtich,
        mail: mail
    }).then(data=>{    
      res.render('index.html'); 
    }).catch(err=>{
      res.status(500).json('Tao ho so that bai')
    })
  })

module.exports = router;
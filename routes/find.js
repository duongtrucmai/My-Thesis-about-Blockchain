const express = require('express')
const app = express()
const router = express.Router();
const accountmodel = require('../data.js')

router.get('/find', function(req, res, next){
  res.render('find.ejs')
})
router.post('/find', async (req, res, next) => {
  const { mssv, truong } = req.body; // Destructure request body for clarity

  try {
    const foundAccount = await accountmodel.findOne({ mssv, truong }); // Find by both mssv and truong

    if (foundAccount) {
      
      // Found matching data, redirect to ketqua.ejs
      res.render('edit.ejs', { data: foundAccount }); // Pass entire matching document
    } else {
      // No matching data found, display error message
      res.render('find.ejs', { message: 'Invalid MSSV or Truong.' }); // Render the original form with an error message
    }
  } catch (err) {
    res.status(500).json('co loi ben server')}
  })

module.exports = router;
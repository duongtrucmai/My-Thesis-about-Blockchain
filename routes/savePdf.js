// app.js (or your ExpressJS router file)
const express = require('express');
const router = express.Router();
const pdfkit = require('pdfkit');
router.get('/savePdf', function(req, res, next){
    res.render('ketqua.ejs')
  })
router.post('/savePdf', function(req, res, next) {
  const { pdfData } = req.body; // Access PDF information from request body

  const doc = new pdfkit();
  // Add PDF content using the provided pdfData
  doc.text(pdfData); // Replace with appropriate content generation logic
  // ... Add other content

  const filename = `pdf_${Date.now()}.pdf`;
  res.setHeader('Content-Type', 'application/pdf'); // Set content type
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`); // Set filename

  doc.pipe(res); // Send PDF content as response
  doc.end();
});

module.exports = router;

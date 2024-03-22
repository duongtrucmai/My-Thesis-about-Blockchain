const express = require('express');
const router = express.Router();
// ... other imports

router.get('/dsach', (req, res, next) => {
  res.render('dsach.ejs', { data: [] }); // Render with an empty array by default
});

router.post('/dsach', async (req, res) => {
  const { mssv, truong } = req.body;

  try {
    const name = await getNameByMssv(mssv); // Assuming getNameByMssv returns a Promise
    submittedData.push({ mssv, name });

    res.render('dsach.ejs', { data: submittedData });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Tạo tài khoản thất bại' });
  }
});

module.exports = router;

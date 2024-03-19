// Using Node.js `require()`
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/admin');

const Schema = mongoose.Schema;

const dataschema = new Schema({
    fullname: String,
    cccd: String,
    mssv: String,
    truong: String,
    nganh: String,
    thanhtich: String,
    mail: String,
  
},{
    collection: 'data'
});

const accountData1 = mongoose.model('data', dataschema)

module.exports = accountData1
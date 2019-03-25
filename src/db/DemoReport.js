const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
  type: String,
  image: String,
  href: String,
  title: String,
  description: String,
  content: String,
  date: String
}, {
  collection: 'demoReports',
  versionKey: false
});

module.exports = mongoose.model('DemoReport', ReportSchema);

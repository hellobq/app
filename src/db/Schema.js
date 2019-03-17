const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReportSchema = new Schema({
  type: String,
  image: String,
  href: String,
  title: String,
  description: String,
  content: String,
  date: String
}, {
  collection: 'reports',
  versionKey: false
})

const UserSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  pwd: String,
  regDate: Date,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  collections: [{
    type: Schema.Types.ObjectId,
    ref: 'Report'
  }],
  views: [{
    type: Schema.Types.ObjectId,
    ref: 'Report'
  }]
}, {
  collection: 'users',
  versionKey: false
})

const CommentSchema = new Schema({
  content: String,
  date: Date,
  commenter: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  Objects: {
    type: Schema.Types.ObjectId,
    ref: 'Report'
  }
}, {
  collection: 'comments',
  versionKey: false
})

module.exports = {
  Report: mongoose.model('Report', ReportSchema),
  User: mongoose.model('User', UserSchema),
  Comment: mongoose.model('Comment', CommentSchema)
}

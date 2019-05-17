const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
  type: {
    type: String,
    default: 'daily-report',
    required: true
  },
  title: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  originHref: {
    type: String,
    default: '',
    unique: true
  },
  content: {
    type: String,
    default: ''
  },
  date: String,
  viewNum: {
    type: Number,
    default: 0
  },
  keywords: {
    type: String,
    default: ''
  }
}, {
  collection: 'reports',
  versionKey: false
});

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
    ref: 'Collection'
  }],
  views: [{
    type: Schema.Types.ObjectId,
    ref: 'View'
  }],
  thumbs_ups: [{
    type: Schema.Types.ObjectId,
    ref: 'ThumbsUp'
  }]
}, {
  collection: 'users',
  versionKey: false
});

const ViewSchema = new Schema({
  date: Date,
  viewer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  report: {
    type: Schema.Types.ObjectId,
    ref: 'Report'
  }
}, {
  collection: 'views',
  versionKey: false
});

const CommentSchema = new Schema({
  content: String,
  date: Date,
  isDeleted: {
    type: Boolean,
    default: false
  },
  commenter: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  report: {
    type: Schema.Types.ObjectId,
    ref: 'Report'
  }
}, {
  collection: 'comments',
  versionKey: false
});

const ThumbsUpSchema = new Schema({
  date: {
    type: Date,
    default: new Date()
  },
  thumbsUper: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  report: {
    type: Schema.Types.ObjectId,
    ref: 'Report'
  }
}, {
  collection: 'thumbsUps',
  versionKey: false
});

const CollectionSchema = new Schema({
  date: {
    type: Date,
    default: new Date()
  },
  collector: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  report: {
    type: Schema.Types.ObjectId,
    ref: 'Report'
  }
}, {
  collection: 'collections',
  versionKey: false
});

const DemoReportSchema = new Schema({
  type: {
    type: String,
    default: 'daily-report',
    required: true
  },
  title: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  originHref: {
    type: String,
    default: '',
    unique: true
  },
  content: {
    type: String,
    default: ''
  },
  date: String
}, {
  collection: 'demoReports',
  versionKey: false
});

module.exports = {
  Report: mongoose.model('Report', ReportSchema),
  User: mongoose.model('User', UserSchema),
  Comment: mongoose.model('Comment', CommentSchema),
  ThumbsUp: mongoose.model('ThumbsUp', ThumbsUpSchema),
  Collection: mongoose.model('Collection', CollectionSchema),
  View: mongoose.model('View', ViewSchema),
  DemoReport: mongoose.model('DemoReport', DemoReportSchema)
};

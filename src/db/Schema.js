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
    report_id: {
      type: Schema.Types.ObjectId,
      ref: 'Report'
    },
    view_date: Date
  }],
  thumbs_ups: [{
    type: Schema.Types.ObjectId,
    ref: 'ThumbsUp'
  }]
}, {
  collection: 'users',
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
  date: Date,
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
  date: Date,
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

module.exports = {
  Report: mongoose.model('Report', ReportSchema),
  User: mongoose.model('User', UserSchema),
  Comment: mongoose.model('Comment', CommentSchema),
  ThumbsUp: mongoose.model('ThumbsUp', ThumbsUpSchema),
  Collection: mongoose.model('Collection', CollectionSchema)
};

/**
 * Created by yujintang on 2017/7/19.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    author: Object,
    openId: String,
    shareId: String,
    comment: String,
    desc: Object,
    note: String,
    status: {
        type: Boolean,
        default: true
    }
  });

module.exports = mongoose.model('Comment', UserSchema);
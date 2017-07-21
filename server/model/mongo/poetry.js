/**
 * Created by yujintang on 2017/7/19.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    title: String,
    author: Object,
    content: String,
    note: String,
    status: {
        type: Boolean,
        default: true
    }
  });

module.exports = mongoose.model('Poetry', UserSchema);
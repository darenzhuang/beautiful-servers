/**
 * Created by yujintang on 2017/7/19.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    image: String,
    background: String,
    author: Object,
    title: String,
    openId: String,
    poetry: String,
    status: {
        type: Boolean,
        default: true
    }
  });

module.exports = mongoose.model('Share', UserSchema);
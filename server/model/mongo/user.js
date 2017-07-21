/**
 * Created by yujintang on 2017/2/8.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({

    name: String,
    author: Object,
    openId: String,
    status: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('User', UserSchema);
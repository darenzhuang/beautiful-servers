/**
 * Created by yujintang on 2017/7/20.
 */
'use strict';

/**
 * Created by yujintang on 2017/2/13.
 */
'use strict';

const fs = require('fs-extra'),
  _ = require('lodash'),
  path = require('path'),
  my_crypto = require('../lib/crypto'),
  qiniu = require('../lib/qiniu'),
  Mongo = global.mongoDb.models,
  cfg_upload = global.config.path.upload;

var upload = {};

upload.getToken = async (ctx) => {
    try {
        //接收参数
        let qiniu = require('../lib/qiniu');
        let key = my_crypto.UUID()
        console.log(key)
        return ctx.body = {uptoken: qiniu.uptoken(key)};
    } catch (e) {
        ctx.status = 400;
        return ctx.body = e.message
    }
};
module.exports = upload;
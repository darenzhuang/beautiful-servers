/**
 * Created by yujintang on 2017/7/20.
 */
'use strict';

const
  _ = require('lodash'),
  qn_cfg = global.config.qiniu,
  qiniu = require('qiniu');

var qn = {}
/**
 * 获取token
 * @param key
 * @returns {Promise.<void>}
 */
qn.uptoken = (key) => {

    var mac = new qiniu.auth.digest.Mac(qn_cfg.AK, qn_cfg.SK);
    var options = {
        scope: qn_cfg.bucket,
        // callbackUrl: qn_cfg.callbackUrl,
        // callbackBody: `filename=$(fname)&filesize=$(fsize)&filekey=${key}&mimeType=$(mimeType)`
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken=putPolicy.uploadToken(mac);
    return uploadToken;
};

module.exports = qn;
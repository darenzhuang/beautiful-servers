/**
 * Created by yujintang on 2017/2/13.
 */
'use strict';

/**
 * 提供各种加解密算法
 */

const uuid = require('uuid'),
    crypto = require('crypto');

module.exports = function () {

    let cj = {};

    cj.UUID = () => {
        return uuid.v4().replace(/[-]/g, '')
    };
    cj.MD5 = text => {
        return crypto.createHash('md5').update(text +='').digest('hex');
    };
    cj.SHA1 = text => {
        return crypto.createHash('sha1').update(text +='').digest('hex');
    };
    cj.SHA256 = text => {
        return crypto.createHash('sha1').update(text +='').digest('hex');
    };
    cj.EncryptDES = (data, key, vi) => {
        return cipheriv(crypto.createCipheriv('aes-128-cbc', key, vi), 'utf8', data).toString('base64');
    };
    cj.DecryptDES = (data, key, vi) => {
        return cipheriv(crypto.createDecipheriv('aes-128-cbc', key, vi), 'base64', data) .toString('utf8');
    };
    return cj;
}();

var cipheriv = function (en, code, data) {
    var buf1 = en.update(data, code), buf2 = en.final();
    var r = new Buffer(buf1.length + buf2.length);
    buf1.copy(r); buf2.copy(r, buf1.length);
    return r;
};
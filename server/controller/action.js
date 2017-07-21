/**
 * Created by yujintang on 2017/7/19.
 */
'use strict';

const Mongo = global.mongoDb.models,
  Crypto = require('../lib/crypto'),
  redis = global.redisDb,
  config = global.config,
  _ = require('lodash'),
  ck = require('../lib/check'),
  crypto = require('crypto'),
  myCrypto = require('../lib/crypto'),
  qs = require('querystring'),
  axios = require('axios');
const LIMIT = 50, SKIP = 0;

var action = {};

action.login = async (ctx) => {
    try {
        //接收参数
        let fields = ctx.fields;
        let {code} = fields;

        //验证参数
        ck.params(fields, ['code']);

        //逻辑
        let cfg_wx = config.miniProgram;
        let cfg_crypto = config.openidCrypto;

        let wxBody = await axios({
            method: 'POST',
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                appid: cfg_wx.appid,
                secret: cfg_wx.secret,
                js_code: code,
                grant_type: cfg_wx.grant_type
            })
        });
        wxBody = wxBody.data;
        if (!wxBody.openid) {
            throw new Error(wxBody.errmsg)
        }
        let sessionId = myCrypto.EncryptDES(JSON.stringify(wxBody), cfg_crypto.key, cfg_crypto.vi);
        return ctx.body = {sessionId: sessionId};
    } catch (e) {
        ctx.status = 400;
        return ctx.body = e.message
    }
};

action.getPoetry = async (ctx) => {
    try {
        //接收参数
        let fields = ctx.fields;

        //验证参数
        ck.params(fields, []);

        //逻辑
        let poetryInfo = await Mongo.Poetry.aggregate([{$sample:{size:1}}])
        return ctx.body = poetryInfo;
    } catch (e) {
        ctx.status = 400;
        return ctx.body = e.message
    }
};

action.savePoetry = async (ctx) => {
    try {
        //接收参数
        let fields = ctx.fields;
        let {title, author, content} = fields;

        //逻辑
        let entity = _.merge({}, fields);
        let poetryInfo = await Mongo.Poetry.create(entity);
        return ctx.body = poetryInfo;
    } catch (e) {
        ctx.status = 400;
        return ctx.body = e.message
    }
};

action.saveShare = async (ctx) => {
    try {
        //接收参数
        let fields = ctx.fields;
        let {} = fields;

        //逻辑
        let entity = _.merge({}, fields);
        let shareInfo = await Mongo.Share.create(entity);
        return ctx.body = shareInfo;
    } catch (e) {
        ctx.status = 400;
        return ctx.body = e.message
    }
};
action.findShare = async (ctx) => {
    try {
        //接收参数
        let fields = ctx.query;
        let {_id} = fields;

        //验证参数
        ck.params(fields, ['_id']);

        //逻辑
        let shareInfo = await Mongo.Share.findOne({_id: _id},{openId: 0});
        return ctx.body = shareInfo;
    } catch (e) {
        ctx.status = 400;
        return ctx.body = e.message
    }
};

action.saveComment = async (ctx) => {
    try {
        //接收参数
        let fields = ctx.fields;
        let {shareId} = fields;

        //验证参数
        ck.params(fields, ['shareId']);

        //逻辑
        let entity = _.merge({}, fields);
        let commentInfo = await Mongo.Comment.create(entity);
        return ctx.body = commentInfo;
    } catch (e) {
        ctx.status = 400;
        return ctx.body = e.message
    }
};

action.commentList = async (ctx) => {
    try {
        //接收参数
        let fields = ctx.query;
        let {shareId, limit, skip} = fields;

        //验证参数
        limit || (limit = LIMIT);
        skip || (skip = SKIP);
        ck.params(fields, ['shareId']);

        //逻辑
        let shareInfo = await Mongo.Comment.find({shareId: shareId},{openId: 0}).limit(+limit).skip(+skip).sort({'_id.getTimestamp()': -1});
        return ctx.body = shareInfo;
    } catch (e) {
        ctx.status = 400;
        return ctx.body = e.message
    }
};
module.exports = action;
/**
 * Created by yujintang on 2017/2/22.
 */
'use strict';

/**
 * auth 中间件，所有需要验证路由，必须有 '/auth_'
 * @param ctx
 * @param next
 */
module.exports = async (ctx, next) => {

    try {
        const myCrypto = require('../lib/crypto');
        const cfg_crypto = global.config.openidCrypto;

        let route = ctx.originalUrl;
        let reg = /\/auth_/;
        if(reg.test(route)){
            let field  = ctx.query;
            let fields = ctx.fields;
            let {sessionId} = fields;
            if(!sessionId){
                throw new Error('必须传递sessionId')
            };
            let session = myCrypto.DecryptDES(sessionId, cfg_crypto.key, cfg_crypto.vi);
            let {openid} = JSON.parse(session);
            ctx.fields.openId = openid
        }
        await next();
    } catch (e) {
        ctx.status = 401;
        ctx.body = e.message
    }
};
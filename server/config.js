/**
 * Created by yujintang on 2017/3/15.
 */
'use strict';

const configure = function () {

    const path = require('path'),
    _ = require('lodash'),
    fs = require('fs-extra');

    let config = {
        system: {
            port: 2222,
            cookieKey: 'koa project'
        },
        mongo: {
            host: '127.0.0.1',
            port: '27017',
            db: 'koa2',
            user: 'mongo',
            pass: 'mongo'
        },
        redis: {
            host: '127.0.0.1',
            port: '6379',
            db: 0,
            pass: 'redis666'
        },
        qiniu:{
            AK: 'UFmgps',
            SK: '40HFTp',
            bucket: 'beautiful'
        },
        path: {
            log_path: path.resolve(process.cwd(), 'logs'),
            upload: path.resolve(process.cwd(), 'upload'),
            mongo_model: path.resolve(process.cwd(), 'server/model/mongo')
        },
        miniProgram:{
          appid:'***',
          secret: '***',
          grant_type: 'authorization_code'
        },
        openidCrypto:{
            key:'b35ee9b0467c0666',
            vi: 'b35ee9b0467c0666'
        }
    };

    //目录不存在，则创建
    let keys = Object.keys(config.path);
    keys.forEach(key => {
        fs.ensureDirSync(config.path[key])
    });

    //合并临时环境变量
    const envJsonPath = process.cwd() + '/.env/' + (process.env.NODE_ENV||'dev') + '.json';
    fs.ensureFileSync(envJsonPath);
    let envConfig = fs.readJsonSync(envJsonPath, {throws: false});

    return _.merge({}, config, envConfig);
}();

module.exports = configure;
global.config = configure;

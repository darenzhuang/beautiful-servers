/**
 * Created by yujintang on 2017/2/8.
 */

"use strict";

const redis = require('redis'),
  bluebird = require('bluebird'),
  cfg_rds = global.config.redis;

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const redisDb = redis.createClient({
    host: cfg_rds.host,
    port: cfg_rds.port,
    password: cfg_rds.pass,
    db: cfg_rds.db,
    socket_keepalive: true,
    retry_unfulfilled_commands: true
});


global.redisDb = redisDb;
module.exports = redisDb;
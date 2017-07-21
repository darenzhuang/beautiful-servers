/**
 * Created by yujintang on 2017/2/7.
 */

'use strict';

var log4js = function () {

    const log4js = require('log4js'),
      log_path = global.config.path.log_path,
      fs = require('fs'),
      path = require('path');

    // trace debug  info  warn  error  fatal //
    const appenders = {
        out: {type: 'console'},
        db: {
            type: 'dateFile',
            filename: path.resolve(log_path, 'db.log'),
            pattern: '-yyyy-MM-dd',
            alwaysIncludePattern: true,
            level: 'ALL'
        },
        default: {
            type: 'dateFile',
            filename: path.resolve(log_path, 'action.log'),
            pattern: '-yyyy-MM-dd',
            alwaysIncludePattern: true,
            level: 'ALL'
        },
        system: {
            type: 'dateFile',
            filename: path.resolve(log_path, 'system.log'),
            pattern: '-yyyy-MM-dd',
            alwaysIncludePattern: true,
            level: 'ALL'
        }
    };
    log4js.configure({
        appenders: appenders,
        categories: {
            default: {appenders: ['default', 'out'], level: 'info'},
            db: {appenders: ['db'], level: 'info'},
            system: {appenders: ['system'], level: 'error'}
        }
    });

    var logger_export = {};

    for (let name in appenders){
        logger_export[name] = log4js.getLogger(name)
    }


        return logger_export;
}();

global.log = log4js;
module.exports = log4js;
/**
 * 开发者：yujintang
 * 开发时间: 2017/2/4
 */

const start_time = new Date();

const Koa = require('koa'),
  https = require('https'),
  session = require('koa-session-minimal'),
  Router = require('koa-router'),
  logger = require('koa-logger'),
  body = require('koa-better-body');

const app = new Koa();
const router = new Router();

const config = require('./config'),
  log = require('./init/log4js'),
  mongo = require('./init/mongoose'),
  redis = require('./init/redis'),
  cfg_sys = config.system,
  auth_check = require('./middlewares/auth_check'),
  obj_add = require('./middlewares/obj_add'),
  ctx_body = require('./middlewares/ctx_body');

app.keys = [cfg_sys.cookieKey];
app.use(session(require('./init/session_rds').opt_rds));
app.use(body({
    IncomingForm: require('./init/formidable')
}));

app.use(obj_add);
app.use(ctx_body);

process.env.NODE_ENV !== 'real' && app.use(logger());

app.use(auth_check);
var index = require('./routes/index');
var api = require('./routes/api');
router.use('/', index.routes(), index.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());
app.use(router.routes());

app.listen(cfg_sys.port);
log.system.info(((ms) => `Server startup in ${ms} ms, Address: http://localhost:${cfg_sys.port}`)(Date.now() - start_time));

//bind exception event to log
process.on('uncaughtException', function (e) {
    log.system.error('uncaughtException from process', e);
});
process.on('unhandledRejection', (e) => {
    log.system.warn('unhandledRejection from process', e);
});
process.on('rejectionHandled', (e) => {
    log.system.warn('rejectionHandled from process', e);
});

module.exports = app;


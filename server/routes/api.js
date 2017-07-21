/**
 * Created by yujintang on 2017/7/19.
 */
'use strict';

const router = require('koa-router')(),
  upload = require('../controller/upload'),
  action = require('../controller/action');


router.post('/login', action.login);
router.get('/getPoetry', action.getPoetry);
router.post('/savePoetry', action.savePoetry);
router.post('/auth_saveShare', action.saveShare);
router.get('/findShare', action.findShare);
router.post('/auth_saveComment', action.saveComment);
router.get('/commentList', action.commentList);

router.get('/pure_getUpToken', upload.getToken);



module.exports = router;
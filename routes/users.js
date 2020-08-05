var express = require('express');
var router = express.Router();
const querySql = require('../db/index.js')
const {PWD_SALT, PRIVATE_KEY, EXPIRESD} = require('../utils/constant')
const {md5, upload} = require('../utils/index')
const jwt = require('jsonwebtoken')
const multer = require('multer') // 文件上传中间件

/* GET users listing. */
/*
 * 注册
 * username（用户名）, password（密码）, nickname（昵称）
*/
router.post('/register', async (req, res, next) => {
  let {username, password, nickname} = req.body
  try{
    let user = await querySql('select * from users where username = ?', [username])
    if (!user || user.length === 0){
      password = md5(`${password}${PWD_SALT}`)
      console.log(password)
      await querySql('insert into users(username, password, nickname) value(?,?,?)', [username, password, nickname])
      res.send({code: 0, msg: '注册成功！'})
    } else {
      res.send({code: -1, msg: '该账号已注册！'})
    }
  }catch(e){
    next(e)
  }
})
/*
 * 登录
 * username（用户名）, password（密码）, nickname（昵称）
*/
router.post('/login', async (req, res, next) => {
  let {username, password} = req.body
  try{
    let user = await querySql('select * from users where username = ?', [username])
    if (!user || user.length === 0){
      res.send({code: -1, msg: '该账号不存在！'})
    } else {
      password = md5(`${password}${PWD_SALT}`)
      let result = await querySql('select * from users where username = ? and password = ?', [username, password])
      if (!result || result.length === 0) {
        res.send({code: -1, msg: '账号或密码错误，请重新输入！'})
      } else {
        // 生成token
        let token = jwt.sign({username}, PRIVATE_KEY, {expiresIn: EXPIRESD})
        res.send({code: 0, msg: '登录成功！', token: token})
      }
    }
  }catch(e){
    next(e)
  }
})
/*
 * 获取用户信息
*/
router.get('/info', async (req, res, next) => {
  let {username} = req.user
  try{
    let userinfo = await querySql('select nickname,head_img from users where username = ?', [username])    
    res.send({code: 0, msg: '成功', data: userinfo[0]})
  }catch(e){
    next(e)
  }
})
/*
 * 头像上传
*/
router.post('/upload', upload.single('head_img'), async (req, res, next) => {
  console.log(req.file)
  let imgPath = req.file.path.split('public')[1]
  let imgUrl = 'http://127.0.0.1:3000'+imgPath
  res.send({code: 0, msg: '上传成功', data: imgUrl})
})
/*
 * 用户信息更新
*/
router.post('/updateUser', async (req, res, next) => {
  let {nickname, head_img} = req.body
  let {username} = req.user
  try{
    let userinfo = await querySql('update users set nickname = ?, head_img = ? where username = ?', [nickname, head_img, username])    
    res.send({code: 0, msg: '成功', data: userinfo[0]})
  }catch(e){
    next(e)
  }
})

module.exports = router;

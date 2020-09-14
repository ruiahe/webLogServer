var express = require('express')
var router = express.Router()
const querySql = require('../db/index.js')

// 发表评论
router.post('/publish', async(req, res, next) => {
  let {article_id, content} = req.body
  let {username} = req.user
  try{
    let result = await querySql('select id, nickname, head_img from users where username = ?', [username])    
    let {id: user_id, head_img, nickname} = result[0]
    let sql = 'insert into comment(user_id, article_id, cm_content, head_img, nickname, create_time) values(?, ?, ?, ?, ?, NOW())'
    await querySql(sql, [user_id, article_id, content, head_img, nickname])
    res.send({code: 0, msg: '发表成功'})
  }catch(e){
    next(e)
  }
})

// 获取全部博客列表
router.post('/alllist', async(req, res, next) => {
  let {article_id} = req.body
  try{
    let sql = 'select head_img, nickname, cm_content, DATE_FORMAT(create_time, "%Y-%m-%d %H:%i:%s") AS create_time from comment where id = ?'
    let result = await querySql(sql, [article_id])
    res.send({code: 0, msg: '', data: result})
  }catch(e){
    next(e)
  }
})

module.exports = router
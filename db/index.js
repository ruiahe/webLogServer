const mysql = require('mysql')
const dbOption = require('./config.js')

// 创建连接池
const pool = mysql.createPool(dbOption)

function querySql(sql, params) {
  return new Promise((resolve, reject) => {
    // 获取连接
    pool.getConnection((err, conn) => {
      if (err) {
        reject(err)
        return
      }
      // 执行sql语句
      conn.query(sql, params, (err2, result) => {
        conn.release()
        if (err2) {
          reject(err2)
          return
        }
        console.log('result', result)
        resolve(result)
      })
    })
  })
}

module.exports = querySql
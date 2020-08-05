module.exports = {
  apps : [{
    name: 'app', // 进程名称
    script: './bin/www', // 执行的地址
    // args: '', // 传参用的
    instances: 1, // 开启的进程数
    sutorestart: true, // 是否自动重启
    watch: true, // 监听文件变化，自动重启
    max_memory_restart: '1G', // 设置内存的最大容量
    ignore_watch: [ // 不用监听的文件
      "node_modules",
      "logs"
    ],
    "error_file": "./logs/app-error.log", // 错误日志路径
    "out_file": "./logs/app-out.log", // 输出文件
    "log_date_format": "YYYY-MM-DD HH:mm:ss", // 给每行日志标记一个时间
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  }],
  deploy: {
    production: {
      user: 'root',
      host: '1'
    }
  }
};

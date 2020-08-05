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
      user: 'root', // 服务器上用户名
      host: '192.168.56.137', // 服务器host
      ref: 'origin/master', // git分支（自动化部署，自动远程拉取git仓库到服务器clone下来，后自动安装依赖启动pm2去部署项目）
      repo: 'https://github.com/ruiahe/web-blog-server.git',
      path: '/usr/local/myProject', // 服务器上的存放地址
      ssh_options: 'StrictHostKeyChecking=no',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production', // 部署后自动运行的命令
    }
  }
};

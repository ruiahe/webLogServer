module.exports = {
  apps : [{
    name: 'app', // 进程名称
    script: './bin/www', // 执行的地址
    // args: '', // 传参用的
    instances: 1, // 开启的进程数
    sutorestart: true, // 是否自动重启
    watch: true, // 监听文件变化，自动重启
    max_memory_restart: '1G', // 设置内存的最大容量(超过这个内存最大容量之后会自动重启)
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
  deploy: { //  自动化部署配置
    production: {
      user: 'root',
      host: '192.168.8.128', //  虚拟机ip
      ref: 'origin/master', //  远程地址分支
      repo: 'https://github.com/ruiahe/webLogServer.git',  // 远程地址
      path: '/usr/local/myProject',  //  存放在服务器上的路径
      ssh_options: 'StrictHostKeyChecking=no',  //  设置是否确认秘钥检测，此处设置为no
      "pre-deploy": 'git fetch',
      "post-deploy": 'npm install && pm2 reload ecosystem.config.js --env production', //  部署后，自动运行的命令
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
};

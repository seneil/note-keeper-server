module.exports = {
  apps: [{
    name: 'application',
    script: './application/index.js',
    ignore_watch: ['.git', 'node_modules', 'mdb', 'assets', 'storage', 'coverage'],
    max_memory_restart: '150M',
    max_restarts: 10,
    env: {
      NODE_ENV: 'development',
      NODE_APP_INSTANCE: '',
    },
    env_staging: {
      NODE_ENV: 'development',
      NODE_APP_INSTANCE: 'staging',
    },
    env_production: {
      NODE_ENV: 'deployment',
      NODE_APP_INSTANCE: 'deployment',
    },
  }],
  deploy: {
    staging: {
      user: 'dshster',
      host: '192.168.56.5',
      ref: 'origin/master',
      repo: 'https://github.com/seneil/note-keeper-server.git',
      path: '/var/www/api.keeper.shvalyov.ru',
      'pre-deploy': 'git fetch --all',
      'post-setup': 'ls -la',
      'post-deploy': 'npm install --production && pm2 startOrRestart ecosystem.config.js --env staging',
    },
    production: {
      user: 'dshster',
      host: '188.226.132.111',
      ref: 'origin/master',
      repo: 'https://github.com/seneil/note-keeper-server.git',
      path: '/var/www/api.keeper.shvalyov.ru',
      'post-setup': 'ls -la',
      'post-deploy': 'npm install --production && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};

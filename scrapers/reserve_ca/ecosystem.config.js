module.exports = {
  apps: [
    {
      name: 'ScraperReserveCA',
      script: 'src/index.js',
      node_args: '-r esm',
      instances: 1,
      autorestart: true,
      ignore_watch: ['node_modules', 'tmp'],
      watch: true,
      max_memory_restart: '1G',
      cron_restart: '0 * * * *',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};

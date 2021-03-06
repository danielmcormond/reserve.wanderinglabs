module.exports = {
  apps: [
    {
      name: 'ScraperReserveAmerica',
      script: 'src/index.js',
      node_args: '-r esm',
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};

module.exports = {
  apps: [
    {
      name: "rxtrade-frontend",
      exec_mode: "fork",
      instance: 1,
      script: "node_modules/next/dist/bin/next",
      args: "start",
      port: 3000,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env_prod: {
        APP_ENV: "prod",
      },
    },
  ],
};

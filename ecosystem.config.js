module.exports = {
  apps: [
    {
      name: "backend",
      script: "node",
      args: "services/dist/src/main.js",
    },
    {
      name: "nginx",
      script: "nginx",
      args: "-g 'daemon off;'",
    },
  ],
};

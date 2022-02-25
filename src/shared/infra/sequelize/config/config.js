const config = require("config");

module.exports = {
  development: {
    username: config.get("postgres.username"),
    password: config.get("postgres.password"),
    database: config.get("postgres.database"),
    host: config.get("postgres.host"),
    dialect: config.get("postgres.dialect"),
  },

  test: {
    username: config.get("postgres.username"),
    password: config.get("postgres.password"),
    database: config.get("postgres.database"),
    host: config.get("postgres.host"),
    dialect: config.get("postgres.dialect"),
  },

  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
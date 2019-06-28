const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || "development";
// const { username, password } = require("./config");
const { username, password } =
  process.env.NODE_ENV === "production" ? process.env : require("./config");

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfig = {
  development: {
    connection: {
      database: "nc_news",
      username: username,
      password: password
    }
  },
  test: {
    connection: {
      database: "nc_news_test",
      username: username,
      password: password
    }
  },
  production: {
    connection: `${DB_URL}?ssl=true`,
    username: username,
    password: password
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };

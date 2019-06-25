const connection = require("../db/connection");

function fetchTopics() {
  return connection.select("*").from("topics");
}
function fetchUser(username) {
  return connection
    .select("*")
    .from("users")
    .where(username);
}

module.exports = { fetchTopics, fetchUser };

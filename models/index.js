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

function fetchArticle(article_id) {
  return connection
    .select("*")
    .from("articles")
    .where(article_id);
}

module.exports = { fetchTopics, fetchUser, fetchArticle };

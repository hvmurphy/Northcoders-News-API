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

function fetchArticle({ article_id }) {
  return connection
    .select("articles.*")
    .count({ comment_count: "comments.comment_id" })
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .modify(query => {
      if (article_id) query.where({ "articles.article_id": article_id });
    });
}

function updateArticleVotes(article_id, votesToAdd) {
  return connection("articles")
    .where(article_id)
    .returning("*")
    .then(article => {
      const voteTotal = votesToAdd["inc_votes"] + article[0].votes;
      return connection("articles")
        .where(article_id)
        .update({ votes: voteTotal })
        .returning("*");
    })
    .then(updatedArticle => updatedArticle[0]);
}

module.exports = { fetchTopics, fetchUser, fetchArticle, updateArticleVotes };

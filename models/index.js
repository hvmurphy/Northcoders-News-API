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
  // if (isNan(article_id)) {
  //   return Promise.reject({
  //     status: 422,
  //     msg: "Invalid Article ID"
  //   });
  // }
  return connection("articles")
    .where(article_id)
    .returning("*")
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({
          status: 422,
          msg: "Article ID does not exist"
        });
      }
      if (isNaN(votesToAdd["inc_votes"])) {
        return Promise.reject({
          status: 400,
          msg: "Bad Request"
        });
      } else {
        const voteTotal = votesToAdd["inc_votes"] + article[0].votes;
        return connection("articles")
          .where(article_id)
          .update({ votes: voteTotal })
          .returning("*");
      }
    })
    .then(updatedArticle => updatedArticle[0]);
}

module.exports = { fetchTopics, fetchUser, fetchArticle, updateArticleVotes };

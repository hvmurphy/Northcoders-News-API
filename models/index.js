///if time seperate into seperate model files

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
      if (article.length === 0) {
        return Promise.reject({
          status: 422,
          msg: "Article ID does not exist"
        });
      }
      const voteTotal = votesToAdd["inc_votes"] + article[0].votes;
      return connection("articles")
        .where(article_id)
        .update({ votes: voteTotal })
        .returning("*");
    })
    .then(updatedArticle => updatedArticle[0]);
}

function addComment({ article_id }, comment) {
  const newComment = {
    author: comment.username,
    article_id: article_id,
    body: comment.body
  };
  return connection
    .insert(newComment)
    .into("comments")
    .returning("*")
    .then(comments => comments[0]);
}

function fetchComments(article_id, { sortBy, order }) {
  console.log(sortBy);
  return connection
    .select("comment_id", "votes", "created_at", "author", "body")
    .from("comments")
    .where(article_id)
    .orderBy("created_at");
}

module.exports = {
  fetchTopics,
  fetchUser,
  fetchArticle,
  updateArticleVotes,
  addComment,
  fetchComments
};

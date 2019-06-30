const connection = require("../db/connection");
const { createComment } = require("../db/utils/utils");

exports.fetchArticle = ({ article_id }, { sort_by, order, author, topic }) => {
  return connection
    .select("articles.*")
    .count({ comment_count: "comments.comment_id" })
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by || "articles.created_at", order || "desc")
    .modify(query => {
      if (article_id) query.where({ "articles.article_id": article_id });
      if (author) query.where({ "articles.author": author });
      if (topic) query.where({ "articles.topic": topic });
    });
};

exports.updateArticleVotes = (article_id, votesToAdd) => {
  if (!votesToAdd) {
    votesToAdd = 0;
  }
  return connection("articles")
    .where(article_id)
    .increment("votes", votesToAdd)
    .returning("*");
};

exports.addComment = ({ article_id }, comment) => {
  const newComment = createComment(article_id, comment);
  return connection
    .insert(newComment)
    .into("comments")
    .returning("*")
    .then(comments => comments[0]);
};

exports.fetchComments = (article_id, { sort_by, order }) => {
  return connection
    .select("*")
    .from("articles")
    .where(article_id)
    .returning("*")
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Article Does Not Exist"
        });
      } else {
        return connection
          .select("comment_id", "votes", "created_at", "author", "body")
          .from("comments")
          .where(article_id)
          .orderBy(sort_by || "created_at", order || "desc");
      }
    });
};

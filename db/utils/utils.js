exports.formatDate = list => {
  return list.reduce((arr, article) => {
    arr.push({ ...article, created_at: new Date(article["created_at"]) });
    return arr;
  }, []);
};

exports.makeRefObj = list => {
  return list.reduce((obj, article) => {
    obj[article["title"]] = article["article_id"];
    return obj;
  }, {});
};

exports.formatComments = (comments, articleRef) => {
  return comments.reduce((arr, comment) => {
    const amendedComment = {
      ...comment,
      created_at: new Date(comment["created_at"]),
      author: comment["created_by"],
      article_id: comment["belongs_to"]
    };
    amendedComment.article_id = articleRef[amendedComment["article_id"]];
    delete amendedComment.created_by;
    delete amendedComment.belongs_to;
    arr.push(amendedComment);
    return arr;
  }, []);
};

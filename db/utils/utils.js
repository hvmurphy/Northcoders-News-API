exports.formatDate = list => {
  return list.reduce((arr, element) => {
    arr.push({ ...element, created_at: new Date(element["created_at"]) });
    return arr;
  }, []);
};

exports.makeRefObj = list => {
  return list.reduce((obj, article) => {
    obj[article["title"]] = article["article_id"];
    return obj;
  }, {});
};

exports.formatComments = (comments, articleRef) => {};

exports.formatDate = list => {
  const newList = list.reduce((arr, element) => {
    arr.push({ ...element, created_at: new Date(element["created_at"]) });
    return arr;
  }, []);
  return newList;
};

exports.makeRefObj = list => {
  //list = [{article_id:1, title:A},{aticle_id:2, title:B}]
  // tor return {A:1, B:2}
};

exports.formatComments = (comments, articleRef) => {};

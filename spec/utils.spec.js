const { expect } = require("chai");
const {
  formatDate,
  makeRefObj,
  formatComments,
  createComment
} = require("../db/utils/utils");

describe.only("formatDate", () => {
  it("returns a new array", () => {
    const testList = [
      {
        article_id: 1,
        title: "A",
        body: "hey",
        votes: 0,
        topic: "topic1",
        created_at: Date.now()
      }
    ];
    const returnValue = formatDate(testList);

    expect(testList).to.not.equal(returnValue);
  });
  it("does not mutate the input array", () => {
    const testList = [
      {
        article_id: 1,
        title: "A",
        body: "hey",
        votes: 0,
        topic: "topic1",
        created_at: 1561389315280
      }
    ];
    formatDate(testList);
    expect(testList).to.eql([
      {
        article_id: 1,
        title: "A",
        body: "hey",
        votes: 0,
        topic: "topic1",
        created_at: 1561389315280
      }
    ]);
  });
  it("returns empty array when provided an empty array", () => {
    expect(formatDate([])).to.eql([]);
  });
  it("changes date for a one object array", () => {
    const testList = [
      {
        article_id: 1,
        title: "A",
        body: "hey",
        votes: 0,
        topic: "topic1",
        created_at: Date.now()
      }
    ];
    const result = [
      {
        article_id: 1,
        title: "A",
        body: "hey",
        votes: 0,
        topic: "topic1",
        created_at: new Date()
      }
    ];
    console.log(result);
    expect(formatDate(testList)).to.eql(result);
  });
  it("changes date for a multi object array", () => {
    const testList = [
      {
        article_id: 1,
        title: "A",
        body: "hey",
        votes: 0,
        topic: "topic1",
        created_at: Date.now()
      },
      {
        article_id: 2,
        title: "B",
        body: "bye",
        votes: 0,
        topic: "topic2",
        created_at: Date.now()
      }
    ];
    const result = [
      {
        article_id: 1,
        title: "A",
        body: "hey",
        votes: 0,
        topic: "topic1",
        created_at: new Date()
      },
      {
        article_id: 2,
        title: "B",
        body: "bye",
        votes: 0,
        topic: "topic2",
        created_at: new Date()
      }
    ];

    expect(formatDate(testList)).to.eql(result);
  });
});

describe("makeRefObj", () => {
  it("does not mutate the input array", () => {
    const testList = [
      {
        article_id: 1,
        title: "A",
        body: "hey",
        votes: 0,
        topic: "topic1",
        created_at: 1561389315280
      }
    ];
    makeRefObj(testList);
    expect(testList).to.eql([
      {
        article_id: 1,
        title: "A",
        body: "hey",
        votes: 0,
        topic: "topic1",
        created_at: 1561389315280
      }
    ]);
  });
  it("returns an empty object, when provided an empty array", () => {
    expect(makeRefObj([])).to.eql({});
  });
  it("returns a reference object, when provide an array with one value", () => {
    const testList = [
      {
        article_id: 1,
        title: "A",
        body: "hey",
        votes: 0,
        topic: "topic1",
        created_at: new Date()
      },
      {
        article_id: 2,
        title: "B",
        body: "bye",
        votes: 0,
        topic: "topic2",
        created_at: new Date()
      }
    ];
    const result = {
      A: 1,
      B: 2
    };
    expect(makeRefObj(testList)).to.eql(result);
  });
  it("returns a reference object, when provide an array with multiple values", () => {
    const testList = [
      {
        article_id: 1,
        title: "A",
        body: "hey",
        votes: 0,
        topic: "topic1",
        created_at: new Date()
      }
    ];
    const result = {
      A: 1
    };
    expect(makeRefObj(testList)).to.eql(result);
  });
});

describe("formatComments", () => {
  it("returns a new array", () => {
    const testRefObj = {
      A: 1,
      B: 2
    };
    const testComments = [
      {
        body: "hey",
        belongs_to: "A",
        created_by: "hvmurphy",
        votes: 16,
        created_at: Date.now()
      }
    ];
    const returnValue = formatComments(testComments, testRefObj);
    expect(testComments).to.not.equal(returnValue);
  });
  it("does not mutate the input array", () => {
    const testRefObj = {
      A: 1,
      B: 2
    };
    const testComments = [
      {
        body: "hey",
        belongs_to: "A",
        created_by: "hvmurphy",
        votes: 16,
        created_at: Date.now()
      }
    ];
    formatComments(testComments, testRefObj);
    expect(testComments).to.eql([
      {
        body: "hey",
        belongs_to: "A",
        created_by: "hvmurphy",
        votes: 16,
        created_at: Date.now()
      }
    ]);
  });
  it("formats comments when passed an array of a single comment", () => {
    const testRefObj = {
      A: 1,
      B: 2
    };
    const testComments = [
      {
        body: "hey",
        belongs_to: "A",
        created_by: "hvmurphy",
        votes: 16,
        created_at: Date.now()
      },
      {
        body: "bye",
        belongs_to: "B",
        created_by: "hvmurphy",
        votes: 1,
        created_at: Date.now()
      }
    ];
    expect(formatComments(testComments, testRefObj)).to.eql([
      {
        body: "hey",
        article_id: 1,
        author: "hvmurphy",
        votes: 16,
        created_at: new Date()
      },
      {
        body: "bye",
        article_id: 2,
        author: "hvmurphy",
        votes: 1,
        created_at: new Date()
      }
    ]);
  });
  it("formats comments when passed an array of multiple comments", () => {
    const testRefObj = {
      A: 1,
      B: 2
    };
    const testComments = [
      {
        body: "hey",
        belongs_to: "A",
        created_by: "hvmurphy",
        votes: 16,
        created_at: Date.now()
      }
    ];
    expect(formatComments(testComments, testRefObj)).to.eql([
      {
        body: "hey",
        article_id: 1,
        author: "hvmurphy",
        votes: 16,
        created_at: new Date()
      }
    ]);
  });
});

describe("createComment", () => {
  it("returns an object when passed both articleId and comment", () => {
    const testID = 1;
    const testComment = { username: "lurker", body: "I love to comment" };
    const outcome = {
      author: "lurker",
      article_id: 1,
      body: "I love to comment"
    };
    expect(createComment(testID, testComment)).to.eql(outcome);
  });
});

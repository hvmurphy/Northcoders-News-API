const { expect } = require("chai");
const { formatDate, makeRefObj, formatComments } = require("../db/utils/utils");

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
  it("", () => {});
});

describe("formatComments", () => {
  it("", () => {});
});

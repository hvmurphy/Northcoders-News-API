process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = chai;
const app = require("../app");
const request = require("supertest")(app);
const connection = require("../db/connection");

describe("/api", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    connection.destroy();
  });
  it("returns 404 when provided invalid path", () => {
    return request
      .get("/api/dogs")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).to.eql("Page Not Found");
      });
  });
  describe("/topics", () => {
    describe("GET", () => {
      it("responds with a status of 200 and includes relevant keys ", () => {
        return request
          .get("/api/topics")
          .expect(200)
          .then(({ body: { topics } }) => {
            expect(topics[0]).to.contain.keys("slug", "description");
          });
      });
    });
  });
  describe("/users", () => {
    describe("GET", () => {
      it("responds with a status of 200 and user at parametric endpoint", () => {
        return request
          .get("/api/users/lurker")
          .expect(200)
          .then(({ body: { user } }) => {
            expect(user[0]["username"]).to.eql("lurker");
            expect(user.length).to.equal(1);
          });
      });
      it("responds with a status 404 when  username does not exist", () => {
        return request
          .get("/api/users/9")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("User Not Found");
          });
      });
    });
  });
  describe("/articles", () => {
    describe("GET", () => {
      it("responds with a status of 200 & returns article at parametric endpoint", () => {
        return request
          .get("/api/articles/1")
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article[0]["article_id"]).to.eql(1);
            expect(article.length).to.equal(1);
          });
      });
      it("responds with a status of 200 & returns count of article comments as a key", () => {
        return request
          .get("/api/articles/1")
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article[0]["comment_count"]).to.eql("13");
          });
      });
      it("responds with a status 404 with an article_id that does not exist", () => {
        return request
          .get("/api/articles/9999")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("User Not Found");
          });
      });
      // error handling needed for invalid article_id
    });
    describe("PATCH", () => {
      it("responds with a status of 200 & updates votes on specified article", () => {
        return request
          .patch("/api/articles/1")
          .send({ inc_votes: 4 })
          .expect(200)
          .then(({ body: { changedArticle } }) => {
            expect(changedArticle["votes"]).to.eql(104);
          });
      });
      it("returns status 400 for invalid inc_vote value", () => {
        return request
          .patch("/api/articles/1")
          .send({ inc_votes: "hey" })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("Bad Request");
          });
      });
      it("returns status 400 for invalid body", () => {
        return request
          .patch("/api/articles/1")
          .send({ hey: "hi" })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("Bad Request");
          });
      });
      it("returns status 422 for article that does not exist", () => {
        return request
          .patch("/api/articles/600")
          .send({ inc_votes: 2 })
          .expect(422)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("Article ID does not exist");
          });
      });
      // it("returns status 422 for invalid article", () => {
      //   return request
      //     .patch("/api/articles/hey")
      //     .send({ inc_votes: 2 })
      //     .expect(422)
      //     .then(({ body: { msg } }) => {
      //       expect(msg).to.eql("Invalid Article ID");
      //     });
      // }); /// need to fix
    });
    describe.only("/comments", () => {
      describe("POST", () => {
        it("Posts a comment with a status of 200", () => {
          return request
            .post("/api/articles/1/comments")
            .send({ username: "lurker", body: "I love to comment" })
            .expect(200)
            .then(({ body: { newComment } }) => {
              expect(newComment["author"]).to.eql("lurker");
              expect(newComment["body"]).to.eql("I love to comment");
              expect(newComment["article_id"]).to.eql(1);
            });
        });
      });
    });
  });
});

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
  it("returns 404 when provide invalid path", () => {
    return request
      .get("/api/dogs")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).to.eql("Page Not Found");
      });
  });
  describe("/topics", () => {
    describe("GET", () => {
      it("responds with a status of 200 and include relevant keys ", () => {
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
      it("responds with a status of 200 and user at parmetric endpoint", () => {
        return request
          .get("/api/users/lurker")
          .expect(200)
          .then(({ body: { user } }) => {
            expect(user[0]["username"]).to.eql("lurker");
            expect(user.length).to.equal(1);
          });
      });
      it("responds with a status 404 with a username that does not exist", () => {
        return request
          .get("/api/users/9")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("User Not Found");
          });
      });
    });
  });
  describe.only("/articles", () => {
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
    });
  });
});

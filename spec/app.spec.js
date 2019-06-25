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
      it("responds with a status 400 with an invalid username", () => {
        return request
          .get("/api/users/9")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("Bad Request");
          });
      });
      it("responds with a status 404 with username that does not exist", () => {
        return request
          .get("/api/users/holly")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("User Not Found");
          });
      });
    });
  });
});

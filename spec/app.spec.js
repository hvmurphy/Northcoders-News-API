process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = chai;
const app = require("../app");
const request = require("supertest")(app);
const connection = require("../db/connection");
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);

describe("/api", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    connection.destroy();
  });
  // it.only("returns a status of 200 and GETs JSON file", () => {
  //   return request.get("/api").expect(200);
  //   // .then(({ body: { msg } }) => {
  //   //   expect(msg).to.eql("Page Not Found");
  //   // });
  // });
  it("returns 404 when provided invalid path", () => {
    return request
      .get("/api/dogs")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).to.eql("Page Not Found");
      });
  });
  it("returns 405 for invalid methods", () => {
    const invalidMethods = ["put", "patch", "get", "delete", "post"];
    const methodPromises = invalidMethods.map(method => {
      return request[method]("/api")
        .expect(405)
        .then(({ body: { msg } }) => {
          expect(msg).to.eql("Method not allowed");
        });
    });
    return Promise.all(methodPromises);
  });
  describe("/topics", () => {
    it("returns 405 for invalid methods", () => {
      const invalidMethods = ["patch", "put", "post", "delete"];
      const methodPromises = invalidMethods.map(method => {
        return request[method]("/api/topics")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("Method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
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
    it("returns 405 for invalid methods", () => {
      const invalidMethods = ["patch", "put", "post", "delete"];
      const methodPromises = invalidMethods.map(method => {
        return request[method]("/api/users/lurker")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("Method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
    describe("GET", () => {
      it("responds with a status of 200 and user at parametric endpoint", () => {
        return request
          .get("/api/users/lurker")
          .expect(200)
          .then(({ body: { user } }) => {
            expect(user.username).to.eql("lurker");
            expect(user).to.have.keys("username", "avatar_url", "name");
          });
      });
      it("responds with a status 404 when username is valid but does not exist", () => {
        return request
          .get("/api/users/fakeusername")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("User Not Found");
          });
      });
    });
  });
  describe("/articles", () => {
    it("returns 405 for invalid methods", () => {
      const invalidMethods = ["put", "patch", "post", "delete"];
      const methodPromises = invalidMethods.map(method => {
        return request[method]("/api/articles/")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("Method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
    describe("GET", () => {
      it("responds with a status of 200 & returns all articles if no article ID provided", () => {
        return request
          .get("/api/articles/")
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles[0]).to.contain.keys(
              "author",
              "title",
              "article_id",
              "topic",
              "created_at",
              "votes"
            );
            expect(articles.length).to.equal(12);
          });
      });
      it("responds with a status of 200 & articles are sorted by a default of created_at descending when no article ID provided ", () => {
        return request
          .get("/api/articles")
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.be.descendingBy("created_at");
          });
      });
      it("articles can be sorted by other columns when passed a valid column as a query", () => {
        return request
          .get("/api/articles?sort_by=author")
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.be.descendingBy("author");
          });
      });
      it("articles can be sorted by other asc when passed order as a query", () => {
        return request
          .get("/api/articles?order=asc")
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.be.sortedBy("created_at");
          });
      });
      it("filters articles by author specified in query", () => {
        return request
          .get("/api/articles?author=butter_bridge")
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles.length).to.equal(3);
            expect(articles[0].author).to.eql("butter_bridge");
          });
      });
      it("filters articles by topic specified in query", () => {
        return request
          .get("/api/articles?topic=cats")
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles.length).to.equal(1);
            expect(articles[0].topic).to.eql("cats");
          });
      });
      it("returns status of 404 if topic/author does not exist", () => {
        return request
          .get("/api/articles?topic=dogs")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("No Articles Found");
          });
      });
      it("returns status of 400 with invalid sort by query", () => {
        return request
          .get("/api/articles?sort_by=dogs")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("Bad Request");
          });
      });
      describe("/:article_id", () => {
        it("returns 405 for invalid methods", () => {
          const invalidMethods = ["post", "put", "delete"];
          const methodPromises = invalidMethods.map(method => {
            return request[method]("/api/articles/1")
              .expect(405)
              .then(({ body: { msg } }) => {
                expect(msg).to.eql("Method not allowed");
              });
          });
          return Promise.all(methodPromises);
        });
        describe("GET", () => {
          it("responds with a status of 200 & returns article at parametric endpoint", () => {
            return request
              .get("/api/articles/1")
              .expect(200)
              .then(({ body: { article } }) => {
                expect(article["article_id"]).to.eql(1);
              });
          });
          it("responds with a status of 200 & returns count of article comments as a key", () => {
            return request
              .get("/api/articles/1")
              .expect(200)
              .then(({ body: { article } }) => {
                expect(article["comment_count"]).to.eql("13");
              });
          });
          it("responds with a status 404 with an article_id that does not exist", () => {
            return request
              .get("/api/articles/9999")
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.eql("No Article Found");
              });
          });
          it("responds with a status 422 with an invalid article_id ", () => {
            return request
              .get("/api/articles/dogs")
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.eql("Bad Request");
              });
          });
        });
        describe("PATCH", () => {
          it("responds with a status of 200 & updates votes on specified article", () => {
            return request
              .patch("/api/articles/1")
              .send({ inc_votes: 4 })
              .expect(200)
              .then(({ body: { article } }) => {
                expect(article["votes"]).to.eql(104);
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
          it("returns status 200 and returns article with original votes for invalid body", () => {
            return request
              .patch("/api/articles/1")
              .send({})
              .expect(200)
              .then(({ body: { article } }) => {
                expect(article["votes"]).to.eql(100);
              });
          });
          it("returns status 404 for article that does not exist", () => {
            return request
              .patch("/api/articles/600")
              .send({ inc_votes: 2 })
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.eql("Article ID does not exist");
              });
          });
          it("returns status 400 for invalid article", () => {
            return request
              .patch("/api/articles/hey")
              .send({ inc_votes: 2 })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.eql("Bad Request");
              });
          });
        });

        describe("/comments", () => {
          it("returns 405 for invalid methods", () => {
            const invalidMethods = ["patch", "put", "delete"];
            const methodPromises = invalidMethods.map(method => {
              return request[method]("/api/topics")
                .expect(405)
                .then(({ body: { msg } }) => {
                  expect(msg).to.eql("Method not allowed");
                });
            });
            return Promise.all(methodPromises);
          });
          describe("POST", () => {
            it("Posts a comment to a specified article with a status of 201", () => {
              return request
                .post("/api/articles/1/comments")
                .send({ username: "lurker", body: "I love to comment" })
                .expect(201)
                .then(({ body: { comment } }) => {
                  expect(comment["comment_id"]).to.eql(19);
                  expect(comment["author"]).to.eql("lurker");
                  expect(comment["body"]).to.eql("I love to comment");
                  expect(comment["article_id"]).to.eql(1);
                });
            });
            it("returns status 400 for missing required keys", () => {
              return request
                .post("/api/articles/1/comments")
                .send({ fakeKey: "hi" })
                .expect(400)
                .then(({ body: { msg } }) => {
                  expect(msg).to.eql("Bad Request");
                });
            });
            it("returns status 422 for invalid username", () => {
              return request
                .post("/api/articles/1/comments")
                .send({ username: "JR", body: "I love to comment" })
                .expect(422)
                .then(({ body: { msg } }) => {
                  expect(msg).to.eql("Foreign Key Does Not Exist");
                });
            });
          });
          describe("GET", () => {
            it("gets comments for specified article with a status of 200", () => {
              return request
                .get("/api/articles/1/comments")
                .expect(200)
                .then(({ body: { comments } }) => {
                  expect(comments.length).to.equal(13);
                });
            });
            it("gets an array of empty comments when there no comments for specified article, returing a status of 200", () => {
              return request
                .get("/api/articles/4/comments")
                .expect(200)
                .then(({ body: { comments } }) => {
                  expect(comments.length).to.equal(0);
                });
            });
            it("sorts by created_at descending as the default ", () => {
              return request
                .get("/api/articles/1/comments")
                .expect(200)
                .then(({ body: { comments } }) => {
                  expect(comments).to.be.descendingBy("created_at");
                });
            });
            it("comments can be sorted by other columns when passed a valid column as a query", () => {
              return request
                .get("/api/articles/1/comments?sort_by=author")
                .expect(200)
                .then(({ body: { comments } }) => {
                  expect(comments).to.be.descendingBy("author");
                });
            });
            it("comments can be ordered by asc when passed a valid column as a query", () => {
              return request
                .get("/api/articles/1/comments?order=asc")
                .expect(200)
                .then(({ body: { comments } }) => {
                  expect(comments).to.be.sortedBy("created_at");
                });
            });
            it("returns status of 400 with invalid query", () => {
              return request
                .get("/api/articles/1/comments?sort_by=dogs")
                .expect(400)
                .then(({ body: { msg } }) => {
                  expect(msg).to.eql("Bad Request");
                });
            });
            it("returns status 400 for invalid article", () => {
              return request
                .get("/api/articles/hey/comments?sort_by=author")
                .expect(400)
                .then(({ body: { msg } }) => {
                  expect(msg).to.eql("Bad Request");
                });
            });
            it("returns status 404 valid article that does not exist", () => {
              return request
                .get("/api/articles/5000/comments?sort_by=author")
                .expect(404)
                .then(({ body: { msg } }) => {
                  expect(msg).to.eql("Article Does Not Exist");
                });
            });
          });
        });
      });
    });
  });

  describe("/comments", () => {
    it("returns 405 for invalid methods", () => {
      const invalidMethods = ["put", "post", "get"];
      const methodPromises = invalidMethods.map(method => {
        return request[method]("/api/comments/1")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("Method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
    describe("PATCH", () => {
      it("responds with a status of 200 & updates votes on specified comment", () => {
        return request
          .patch("/api/comments/1")
          .send({ inc_votes: 4 })
          .expect(200)
          .then(({ body: { comment } }) => {
            expect(comment["votes"]).to.eql(20);
          });
      });

      it("returns status 400 for invalid inc_vote value", () => {
        return request
          .patch("/api/comments/1")
          .send({ inc_votes: "hey" })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("Bad Request");
          });
      });
      it("returns status 200 and  returns comment with original votes for invalid body", () => {
        return request
          .patch("/api/comments/1")
          .send({})
          .expect(200)
          .then(({ body: { comment } }) => {
            expect(comment["votes"]).to.eql(16);
          });
      });
      it("returns status 404 for a valid comment_id that does not exist", () => {
        return request
          .patch("/api/comments/600")
          .send({ inc_votes: 2 })
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("Comment ID does not exist");
          });
      });
      it("returns status 400 for invalid comment", () => {
        return request
          .patch("/api/comments/hey")
          .send({ inc_votes: 2 })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("Bad Request");
          });
      });
    });
    describe("DELETE", () => {
      it("responds with status 204 and no content", () => {
        return request.delete("/api/comments/1").expect(204);
      });
      it("responds with status 404 when passed a valid comment_id that does not exist", () => {
        return request
          .delete("/api/comments/1000")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("Comment Not Found");
          });
      });
      it("responds with status 400 when passed and invalid comment_id", () => {
        return request
          .delete("/api/comments/hey")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.eql("Bad Request");
          });
      });
    });
  });
});

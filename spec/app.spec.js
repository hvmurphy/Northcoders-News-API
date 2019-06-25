process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = chai;
const app = require("../app");
const request = require("supertest")(app);
const connection = require("../db/connection");

describe("/api", () => {
  after(() => {
    connection.destroy();
  });
  describe("/topics", () => {
    describe("GET", () => {
      it("GET repsonds with a status of 200", () => {
        return request.get("/api/topics").expect(200);
      });
    });
  });
});

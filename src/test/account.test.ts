import { TestFactory } from "./factory";
import { assert, expect } from "chai";
import { throwError } from "../utils/helpers";

describe("Testing the account component", () => {
  const factory: TestFactory = new TestFactory();
  const testAccount = { username: "test", authId: "test" };
  const wrongAccount = { username: "test1", authId: "test" };

  before((done) => {
    factory.init().then(done);
  });

  after((done) => {
    factory.close().then(done);
  });

  describe("POST /accounts/login", () => {
    it("respond with a token on successful login", (done) => {
      factory.app
        .post("/accounts/login")
        .send(testAccount)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          try {
            if (err) throwError(err);
            const { token, message } = res.body;

            assert.isString(token, "token should be string");
            expect(message).eq(
              "Login successful",
              "Login message does not match"
            );
            return done();
          } catch (err) {
            return done(err);
          }
        });
    });

    it("responds with status 403 when wrong credential is provided", (done) => {
      factory.app
        .post("/accounts/login")
        .send(wrongAccount)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(403, done);
    });
  });

  describe("GET /accounts", () => {
    it("fetch accounts successfully", (done) => {
      factory.app
        .get("/accounts")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });
});

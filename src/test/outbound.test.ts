import { TestFactory } from "./factory";
import { assert, expect } from "chai";
import { throwError } from "../utils/helpers";
import { it } from "mocha";
import { generateTestJwt } from "./__test_utils__/helpers";

describe("Testing the outbound route", () => {
  const factory: TestFactory = new TestFactory();
  const testAccount = { id: 1, authId: "test" };

  before((done) => {
    factory.init().then(done);
  });

  after((done) => {
    factory.close().then(done);
  });

  describe("POST /outbound/sms", () => {
    const correctData = {
      from: "492419550484",
      to: "4924195509196",
      text: "message",
    };
    const badData = { from: "1234", text: "message" };
    const badData2 = {
      to: "492419550484",
      from: "1234556784",
      text: "message",
    };

    it("throw 401 error when not authenticated", (done) => {
      factory.app
        .post("/outbound/sms")
        .send(correctData)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(401, done);
    });

    it("sends message when all check passes", (done) => {
      factory.app
        .post("/outbound/sms")
        .send(correctData)
        .set("Accept", "application/json")
        .set({ authorization: `Bearer ${generateTestJwt(testAccount)}` })
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          try {
            if (err) throwError(err);
            const { error, message } = res.body;

            assert.isEmpty(error, "error should be empty");
            expect(message).eq("outbound sms ok", "Response message incorrect");
            return done();
          } catch (err) {
            return done(err);
          }
        });
    });

    it("throw 400 error when some required data is missing", (done) => {
      factory.app
        .post("/outbound/sms")
        .send(badData)
        .set("Accept", "application/json")
        .set({ authorization: `Bearer ${generateTestJwt(testAccount)}` })
        .expect("Content-Type", /json/)
        .expect(400, done);
    });

    it("throw 400 error when to is not in database", (done) => {
      factory.app
        .post("/outbound/sms")
        .send(badData2)
        .set("Accept", "application/json")
        .set({ authorization: `Bearer ${generateTestJwt(testAccount)}` })
        .expect("Content-Type", /json/)
        .expect(400)
        .end((err, res) => {
          try {
            if (err) throwError(err);
            const { error, message } = res.body;

            assert.isEmpty(message, "message should be empty");
            expect(error).eq(
              "from parameter not found",
              "Response error message incorrect"
            );
            return done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });
});

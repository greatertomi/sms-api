import { TestFactory } from "./factory";
import { assert } from "chai";

describe("Testing the account component", () => {
  const factory: TestFactory = new TestFactory();
  const testAccount = { username: "test", authId: "test" };

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
        .expect(200, done);
    });
  });
});

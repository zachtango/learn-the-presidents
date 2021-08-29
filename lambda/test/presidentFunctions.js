const { assert } = require("chai")
const { getRandomPresident } = require("../functions/presidentFunctions")

describe("getRandomPresident()", function() {
  const pres = getRandomPresident();

  it("should be an object", function() {
    assert.isObject(pres);
  })
  it("should have an array of names", function() {
    assert.isArray(pres.names);
  })
  it("should have an array of facts", function() {
    assert.isArray(pres.facts);
  })
})
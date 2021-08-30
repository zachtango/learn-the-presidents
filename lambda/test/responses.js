const { assert } = require("chai")
const { getCasualResponse } = require("../functions/responses");

describe("getCasualResponse()", function() {
  it("should return a string of length greater than 0", function() {
    let response = getCasualResponse();
    assert.isTrue((response.length > 0) && (typeof response === "string"))
  })
})

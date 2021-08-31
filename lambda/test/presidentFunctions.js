const { assert } = require("chai")
const { getRandomPresident, getRandomPresidentText, getPresDescription } = require("../functions/presidentFunctions")
const PRESIDENTS = require("../data/president_info.json");

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

describe("getRandomPresidentText()", function() {
  const text = getRandomPresidentText();
  // console.log(text);

  it("should be a string", function() {
    assert.isString(text);
  })
  it("should have a length greater than 0", function() {
    assert.isTrue(text.length > 0);
  })
})

describe("getPresDescription()", function() {
  const text = getPresDescription(PRESIDENTS[0]);

  it("should be a string", function() {
    assert.isString(text);
  })
  it("should have a length of greater than 0", function() {
    assert.isTrue(text.length > 0);
  })

  const randomText = getPresDescription(PRESIDENTS[0], "RANDOM");
  it("random version should start with 'Your random president is'", function() {
    assert.isTrue(randomText.includes("Your random president is"));
  })
})
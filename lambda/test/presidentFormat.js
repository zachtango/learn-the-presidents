/*
This file defines tests to validate that the president data contained in president_info.json
is of valid format.
*/
const { assert } = require("chai");
const PRESIDENTS = require("../data/president_info.json");

describe("Presidents Data (president_info.json)", function () {
  it("every president should have an array for names", function () {
    let everyNameArray = PRESIDENTS.every((el) => Array.isArray(el.names));
    if (!everyNameArray) {
      for (let president of PRESIDENTS) {
        if (!Array.isArray(president.names)) {
          console.log(president.names);
        }
      }
    }
    assert.isTrue(PRESIDENTS.every((el) => Array.isArray(el.names)));
  });

  it("every president should have an array for facts", function () {
    assert.isTrue(PRESIDENTS.every((el) => Array.isArray(el.facts)));
  });

  it("there should be 46 presidents", function () {
    assert.strictEqual(PRESIDENTS.length, 46);
  });
});

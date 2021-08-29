// Lodash is a library that contains a bunch of "helper functions" that probably should've been included in JS in
// the first place. We can use it in our project to assist with getting random values & randomly shuffling our array.
const _ = require("lodash");
const PRESIDENTS = require('../data/president_info.json');

/**
 * Provides a random president.
 * @returns An object with a random president's information
 */
function getRandomPresident() {
  return _.sample(PRESIDENTS);
}

module.exports = { getRandomPresident }
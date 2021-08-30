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

/**
 * @returns A string fluidly describing the president's name and each fact about him/her.
 */
function getRandomPresidentText() {
  const CONJUNCTIONS = ["Also", "Additionally", "Furthermore"]
  const president = getRandomPresident();
  const presidentFirstName = president.names[0];

  let responseText = `Okay. Your random president is ${presidentFirstName}. He ${president.facts[0]}.`
  for (let additionalFact of president.facts.splice(1)) {
      responseText += ` ${_.sample(CONJUNCTIONS)}, he ${additionalFact}.`
  }
  return responseText;
}

module.exports = { getRandomPresident, getRandomPresidentText }
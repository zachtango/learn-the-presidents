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
  const president = getRandomPresident();
  const responseText = getPresDescription(president);
  return responseText;
}

function getPresDescription(president) {
  const CONJUNCTIONS = ["Also", "Additionally", "Furthermore"]
  const presidentFirstName = president.names[0];
  const position = getPresPosition(president);

  let responseText = `Okay. Your random president is ${presidentFirstName}. He was the ${position} president. He ${president.facts[0]}.`
  for (let additionalFact of president.facts.splice(1)) {
      responseText += ` ${_.sample(CONJUNCTIONS)}, he ${additionalFact}.`
  }
  return responseText;
}

function getPresDescriptionFromId(id) {
  const president = PRESIDENTS[id];
  return getPresDescription(president);
}

function getPresId(president) {
  for (let i = 0; i < PRESIDENTS.length; ++i) {
    testPres = PRESIDENTS[i];
    if (_.isEqual(testPres, president)) {
      return i;
    }
  }
}

function getPresPosition(president) {
  const id = getPresId(president);
  const humanId = String(id + 1);
  const lastChar = humanId[humanId.length - 1]
  if (lastChar == '1') {
    return `${humanId}st`
  } else if (lastChar == '2') {
    return `${humanId}nd`
  } else if (lastChar == '3') {
    return `${humanId}rd`
  } else {
    return `${humanId}th`
  }
}

module.exports = { getRandomPresident, getRandomPresidentText, getPresDescriptionFromId }
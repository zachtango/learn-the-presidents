const _ = require("lodash");

const CASUAL_RESPONSES = ["Okay", "Alright", "No Problem"];
const CORRECTION_RESPONSES = ["The correct answer was", "The president was", "The right answer was"];
const WRONG_RESPONSES = ["Not quite", "Good try", "Incorrect"];
const TRY_AGAIN_RESPONSES = ["Give it another try", "Take another go", "Try one more time"];
const RIGHT_RESPONSES = ["Good work", "Nicely done", "Great job"];

function getCasualResponse() {
  return _.sample(CASUAL_RESPONSES);
}

function getCorrectionResponse() {
  return _.sample(CORRECTION_RESPONSES);
}

function getWrongResponse() {
  return _.sample(WRONG_RESPONSES);
}

function getTryAgainResponse() {
  return _.sample(TRY_AGAIN_RESPONSES);
}

function getRightResponse() {
  return _.sample(RIGHT_RESPONSES);
}

module.exports = {
  getCasualResponse,
  getCorrectionResponse,
  getWrongResponse,
  getTryAgainResponse,
  getRightResponse,
};

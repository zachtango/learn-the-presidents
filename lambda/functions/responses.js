const _ = require("lodash");

const CASUAL_RESPONSES = ["Okay", "Alright", "No Problem"]

function getCasualResponse() {
  return _.sample(CASUAL_RESPONSES);
}

module.exports = { getCasualResponse }
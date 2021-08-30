// https://gist.github.com/habuma/675a4efb4a657391a4b0159e9fda78f5

const QUESTION_NAMES = {
  RandomPresIntent: "RandomPresIntent"
}

function setQuestion(handlerInput, questionAsked) {
  const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
  sessionAttributes.questionAsked = questionAsked;
  handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
}

function clearQuestion(handlerInput) {
  setQuestion(handlerInput, null);
}

module.exports = { setQuestion, clearQuestion, QUESTION_NAMES };
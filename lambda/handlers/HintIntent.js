const {genHint} = require('../functions/presidentFunctions');

const HintIntentHandler = {
  canHandle(handlerInput) {
    console.log('HINT INTENT CAN HANDLE');

    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
        && request.intent.name === 'HintIntent'
        && sessionAttributes.test
        && sessionAttributes.test.isRunning;
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const test = sessionAttributes.test;

    const speakOutput = genHint(test.problems[test.questionNum].answer);

    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
  }
};

module.exports = HintIntentHandler;
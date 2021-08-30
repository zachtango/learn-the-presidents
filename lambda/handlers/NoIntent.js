const Alexa = require('ask-sdk-core');
const { clearQuestion } = require('../functions/setQuestion');
const { getCasualResponse } = require("../functions/responses");

const NoIntentHandler = {
  canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
          && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent';
  },
  handle(handlerInput) {
      clearQuestion();

      return handlerInput.responseBuilder
          .speak(`${getCasualResponse()}.`)
          .getResponse();
  }
};

module.exports = NoIntentHandler;
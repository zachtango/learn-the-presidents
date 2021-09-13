const Alexa = require("ask-sdk-core");
const { clearQuestion } = require("../functions/questionManagement");
const { getCasualResponse } = require("../functions/responses");

const NoIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.NoIntent"
    );
  },
  handle(handlerInput) {
    clearQuestion(handlerInput);
    const response = `${getCasualResponse()}.`;

    return handlerInput.responseBuilder.speak(response).getResponse();
  },
};

module.exports = NoIntentHandler;

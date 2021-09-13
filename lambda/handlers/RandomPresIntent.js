const Alexa = require("ask-sdk-core");
const { setQuestion, QUESTION_NAMES } = require("../functions/questionManagement");
const { getRandomPresidentText } = require("../functions/presidentFunctions");

const RandomPresIntentHandler = {
  canHandle(handlerInput) {
    const userWantsThisAgain =
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.YesIntent" &&
      handlerInput.attributesManager.getSessionAttributes().questionAsked === QUESTION_NAMES.RandomPresIntent;

    return (
      (Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
        Alexa.getIntentName(handlerInput.requestEnvelope) === "RandomPresIntent") ||
      userWantsThisAgain
    );
  },
  handle(handlerInput) {
    const responseText = getRandomPresidentText();
    setQuestion(handlerInput, QUESTION_NAMES.RandomPresIntent);

    return handlerInput.responseBuilder
      .speak(`${responseText} Would you like to learn about another random president?`)
      .reprompt("Sorry, would you like to learn about another random president?")
      .getResponse();
  },
};

module.exports = RandomPresIntentHandler;

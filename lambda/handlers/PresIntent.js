const Alexa = require("ask-sdk-core");
const { getPresDescriptionFromId } = require("../functions/presidentFunctions");

const PresIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "PresIntent"
    );
  },
  handle(handlerInput) {
    const presidentSlot = Alexa.getSlot(handlerInput.requestEnvelope, "president");
    const presidentId = presidentSlot.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    console.log(`President ID is ${presidentId}.`);
    const presDescription = getPresDescriptionFromId(presidentId);

    return handlerInput.responseBuilder.speak(presDescription).getResponse();
  },
};

module.exports = PresIntentHandler;

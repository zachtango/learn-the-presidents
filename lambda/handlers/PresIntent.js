const Alexa = require('ask-sdk-core');
const { getSlotId } = require("../functions/getSlotId");

const PresIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PresIntent';
    },
    handle(handlerInput) {
        const presidentSlot = Alexa.getSlot(requestEnvelope, 'president');
        const presidentId = presidentSlot.resolutions.resolutionsPerAuthority[0].values[0].value.id;
        console.log(presidentId)

        return handlerInput.responseBuilder
            .speak("Gekko")
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

module.exports = PresIntentHandler;
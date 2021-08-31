const Alexa = require('ask-sdk-core');

const PresIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PresIntent';
    },
    handle(handlerInput) {
        const president_id = handlerInput.requestEnvelope.request.getIntentName.slots.president.id;
        console.log(president_id)

        return handlerInput.responseBuilder
            .speak("Gekko")
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

module.exports = PresIntentHandler;
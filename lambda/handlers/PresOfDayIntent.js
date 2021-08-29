const Alexa = require('ask-sdk-core');

const PresOfDayIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PresOfDayIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World! Test';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

module.exports = PresOfDayIntentHandler;
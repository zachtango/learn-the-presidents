const Alexa = require('ask-sdk-core');
const { getRandomPresidentText } = require('../functions/presidentFunctions');

const RandomPresIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RandomPresIntent';
    },
    handle(handlerInput) {
        const responseText = getRandomPresidentText();

        return handlerInput.responseBuilder
            .speak(responseText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

module.exports = RandomPresIntentHandler;
const Alexa = require('ask-sdk-core');

const QuestionTestIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TestIntent';
    },
    handle(handlerInput) {

        const speakOutput = 'Let me get that started for you';
        const DIFFICULTY = handlerInput.requestEnvelope.request.intent.slots.difficulty.value;

        return handlerInput.responseBuilder
            .addDelegateDirective({
                name: 'AnswerIntent',
                confirmationStatus: 'NONE',
                slots: {}// difficulty
            })
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

module.exports = QuestionTestIntentHandler;
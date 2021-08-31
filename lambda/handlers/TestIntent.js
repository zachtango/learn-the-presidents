const Alexa = require('ask-sdk-core');

// Session attributes to persist throughout lifespan of current skill session
const TestIntentHandler = {
    canHandle(handlerInput) {
        console.log('TEST INTENT CAN HANDLE');
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TestIntent';
    },
    handle(handlerInput) {
        console.log('TEST INTENT HANDLER');
        const DIFFICULTY = handlerInput.requestEnvelope.request.intent.slots.difficulty.value;
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        sessionAttributes.test = {
            difficulty: DIFFICULTY,
            questionNum: 1
        };

        const speakOutput = 'Let me get that started for you';

        return handlerInput.responseBuilder
            .addDelegateDirective({
                name: 'AnswerIntent',
                confirmationStatus: 'NONE',
                slots: {}
            })
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

module.exports = TestIntentHandler;
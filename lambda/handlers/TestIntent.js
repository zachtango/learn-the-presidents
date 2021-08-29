
const TestIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TestIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World! Test';

        const DIFFICULTY = handlerInput.requestEnvelope.request.intent.slots.difficulty.value;

        return handlerInput.responseBuilder
            .speak(speakOutput + DIFFICULTY)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

module.exports = TestIntentHandler;
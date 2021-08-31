const Alexa = require('ask-sdk-core');
const { S3PersistenceAdapter } = require('ask-sdk-s3-persistence-adapter');

// Session attributes to persist throughout lifespan of current skill session
const TestIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TestIntent';
    },
    handle(handlerInput) {
        const DIFFICULTY = handlerInput.requestEnvelope.request.intent.slots.difficulty.value;
        const sessionAttributes = handlerInput.attributesManger.getSessionAttributes();

        sessionAttributes.test = {
            difficulty: DIFFICULTY,
            questionNum: 1
        };

        const speakOutput = 'Let me get that started for you';
        
        S3PersistenceAdapter;

        return handlerInput.responseBuilder
            .addDelegateDirective({
                name: 'QuestionIntent',
                confirmationStatus: 'NONE',
                slots: {}
            })
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

module.exports = TestIntentHandler;
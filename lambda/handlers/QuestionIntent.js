const Alexa = require('ask-sdk-core');

const QuestionIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'QuestionIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManger.getSessionAttributes();

        const DIFFICULTY = sessionAttributes.test.DIFFICULTY;
        const questionNum = sessionAttributes.test.questionNum;
        
        const speakOutput = DIFFICULTY + questionNum;
        
        return handlerInput.responseBuilder
            .addDelegateDirective({
                name: 'AnswerIntent',
                confirmationStatus: 'NONE',
                slots: {}
            })
            .speak(speakOutput)
            .getResponse();
    }
};

module.exports = QuestionIntentHandler;
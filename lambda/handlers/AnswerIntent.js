const Alexa = require('ask-sdk-core');

const AnswerIntentHandler = {
    canHandle(handlerInput) {
        console.log('ANSWER INTENT CAN HANDLE');

        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'TestIntent'
            && sessionAttributes.test
            && sessionAttributes.test.isRunning;
    },
    handle(handlerInput) {
        console.log('ANSWER INTENT HANDLER');

        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        const presidentSlot = Alexa.getSlot(handlerInput.requestEnvelope, 'president');
        const presidentId = presidentSlot.resolutions.resolutionsPerAuthority[0].values[0].value.id;
        const correct = true;

        if(correct){ // check answer
            sessionAttributes.test.questionNum += 1;    
            
        }

        const speakOutput = `question ${session.test.questionNum}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

module.exports = AnswerIntentHandler;
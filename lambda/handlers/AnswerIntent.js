const Alexa = require('ask-sdk-core');

const AnswerIntentHandler = {
    canHandle(handlerInput) {
        console.log('ANSWER INTENT CAN HANDLE');

        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AnswerIntent';
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

        return handlerInput.responseBuilder
            .addDelegateDirective({
                name: 'TestIntent',
                confirmationStatus: 'NONE'
            })
            .speak(presidentId)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

module.exports = AnswerIntentHandler;
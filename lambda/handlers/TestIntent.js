// Session attributes to persist throughout lifespan of current skill session
const TestIntentHandler = {
    canHandle(handlerInput) {
        console.log('STARTED TEST INTENT CAN HANDLE');

        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'TestIntent';
    },
    handle(handlerInput) {
        console.log('STARTED TEST INTENT HANDLER');
        const DIFFICULTY = handlerInput.requestEnvelope.request.intent.slots.difficulty;
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        // test just started
        sessionAttributes.test = {
            difficulty: DIFFICULTY,
            questionNum: 1,
            attempts: 0,
            isRunning: true,
            numCorrect: 0,
            hintMessageGiven: false
        };

        const speakOutput = 'question 1';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

module.exports = TestIntentHandler;
// Session attributes to persist throughout lifespan of current skill session
const TestIntentHandler = {
    canHandle(handlerInput) {
        console.log('TEST INTENT CAN HANDLE');

        const request = handlerInput.requestEnvelope.request;
        
        console.log(request);
        return request.type === 'IntentRequest'
            && request.intent.name === 'TestIntent';
    },
    handle(handlerInput) {
        console.log('TEST INTENT HANDLER');

        const DIFFICULTY = handlerInput.requestEnvelope.request.intent.slots.difficulty.value;
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let speakOutput;
        if(!sessionAttributes.test){
            // test just started

            sessionAttributes.test = {
                difficulty: DIFFICULTY,
                questionNum: 1
            };

            speakOutput = 'Let me get that started for you. Question 1';

            

        } else{
            // test in progress
            speakOutput = `Question ${sessionAttributes.test.questionNum}`;
        }

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

module.exports = TestIntentHandler;
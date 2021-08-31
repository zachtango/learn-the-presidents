// Session attributes to persist throughout lifespan of current skill session
const StartedInProgressTestIntentHandler = {
    canHandle(handlerInput) {
        console.log('STARTED TEST INTENT CAN HANDLE');

        const request = handlerInput.requestEnvelope.request;
        
        console.log(request);
        return request.type === 'IntentRequest'
            && request.intent.name === 'TestIntent'
            && request.dialogState !== 'COMPLETED';
    },
    handle(handlerInput) {
        console.log('STARTED TEST INTENT HANDLER');
        const DIFFICULTY = handlerInput.requestEnvelope.request.intent.slots.difficulty;
       
        if(DIFFICULTY){
            return handlerInput.responseBuilder
                .addDelegateDirective(handlerInput.requestEnvelope.request.intent)
                .getResponse();
        } else{
            const speakOutput = 'What difficulty would you like to take the test at?';

            return handlerInput.responseBuilder
                .speak(speakOutput)
                .addElicitSlotDirective('difficulty')
                .getResponse();
        }

        
    }
};

const CompletedTestIntentHandler = {
    canHandle(handlerInput){
        const request = handlerInput.requestEnvelope.request;
        console.log('COMPELTED INTENT CAN HANDLE', request)
        return request.type === "IntentRequest"
            && request.intent.name === "TestIntent"
            && request.dialogState === "COMPLETED";
    },
    handle(handlerInput){
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
                confirmationStatus: 'NONE'
            })
            .speak(speakOutput)
            .getResponse();
    }
}

module.exports = {StartedInProgressTestIntentHandler, CompletedTestIntentHandler};
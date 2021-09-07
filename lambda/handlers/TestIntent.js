const Alexa = require('ask-sdk-core');

const { genNormalProblems, genHardProblems } = require('../functions/presidentFunctions');



// Session attributes to persist throughout lifespan of current skill session
const StartTestIntentHandler = {
    canHandle(handlerInput) {
        console.log('STARTED TEST INTENT CAN HANDLE');

        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'TestIntent';
    },
    handle(handlerInput) {
        console.log('STARTED TEST INTENT HANDLER');
        const DIFFICULTY = Alexa.getSlot(handlerInput.requestEnvelope, 'difficulty').value;
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        console.log(JSON.stringify(sessionAttributes));
        // test just started
        sessionAttributes.test = {
            difficulty: DIFFICULTY,
            questionNum: 0,
            attempts: 0,
            isRunning: true,
            numCorrect: 0,
            hintMessageGiven: false
        };

        console.log(JSON.stringify(sessionAttributes));

        const test = sessionAttributes.test;
        console.log(DIFFICULTY);
        if(DIFFICULTY === 'normal'){

            test.problems = genNormalProblems();
        
        } else if(DIFFICULTY === 'hard'){
            
            test.problems = genHardProblems();

        } else{
            console.log('invalid value in DIFFICULTY');
            return 0;
        }
        
        const speakOutput = test.problems[0].question;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const ResumeTestIntentHandler = {
    canHandle(handlerInput) {
        console.log('RESUME TEST INTENT CAN HANDLE');

        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'TestIntent';
    },
    handle(handlerInput) {
        console.log('RESUME TEST INTENT HANDLER');
        const DIFFICULTY = Alexa.getSlot(handlerInput.requestEnvelope, 'difficulty').value;
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        console.log(JSON.stringify(sessionAttributes));
        // test just started
        sessionAttributes.test = {
            difficulty: DIFFICULTY,
            questionNum: 0,
            attempts: 0,
            isRunning: true,
            numCorrect: 0,
            hintMessageGiven: false
        };

        console.log(JSON.stringify(sessionAttributes));

        const test = sessionAttributes.test;
        console.log(DIFFICULTY);
        if(DIFFICULTY === 'normal'){

            test.problems = genNormalProblems();
        
        } else if(DIFFICULTY === 'hard'){
            
            test.problems = genHardProblems();

        } else{
            console.log('invalid value in DIFFICULTY');
            return 0;
        }
        
        const speakOutput = test.problems[0].question;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

module.exports = {StartTestIntentHandler, ResumeTestIntentHandler};
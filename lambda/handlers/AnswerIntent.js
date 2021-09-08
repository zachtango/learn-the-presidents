const Alexa = require('ask-sdk-core');

const {getPresName} = require('../functions/presidentFunctions');

const AnswerIntentHandler = {
    canHandle(handlerInput) {
        console.log('ANSWER INTENT CAN HANDLE');

        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const request = handlerInput.requestEnvelope.request;
        console.log(JSON.stringify(sessionAttributes));
        return request.type === 'IntentRequest'
            && request.intent.name === 'AnswerIntent'
            && sessionAttributes.test
            && sessionAttributes.test.isRunning;
    },
    handle(handlerInput) {
        console.log('ANSWER INTENT HANDLER');

        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        const presidentSlot = Alexa.getSlot(handlerInput.requestEnvelope, 'president');
        const presidentId = presidentSlot.resolutions.resolutionsPerAuthority[0].values[0].value.id;

        const test = sessionAttributes.test;
        const NUM_PROBLEMS = 5;

        const answerIsCorrect = parseInt(presidentId) === test.problems[test.questionNum].answer;

        let speakOutput;
        if(answerIsCorrect){ // check answer
            test.questionNum++;
            test.numCorrect++;
            test.attempts = 0;
            speakOutput = test.problems[test.questionNum].question;
        } else{
            
            test.attempts++;

            if(test.attempts >= 2){
                test.questionNum++;
                test.attempts = 0;
                speakOutput = `Wrong. The correct answer is ${getPresName(presidentId)}. ${test.problems[test.questionNum].question}`;
                
            } else{
                if(!test.hintMessageGiven){
                    speakOutput = 'Wrong! If you\'d like a hint. Just say, give me a hint.';
                    test.hintMessageGiven = true;
                } else{
                    speakOutput = 'Wrong! Try again';
                }
            }
        }

        if(test.questionNum === NUM_PROBLEMS){
            speakOutput = `The test is finished. Great job. You got ${test.numCorrect} questions correct out of ${NUM_PROBLEMS}. `;

            if(test.difficulty === 'normal'){
                if(sessionAttributes.normalHS){
                    if(test.numCorrect > sessionAttributes.normalHS){
                        sessionAttributes.normalHS = test.numCorrect;
                        speakOutput += `Wow! You set a new personal record of ${test.numCorrect} correct answers for the normal test!`;
                    }
                }
            } else{
                if(sessionAttributes.hardHS){
                    if(test.numCorrect > sessionAttributes.hardHS){
                        sessionAttributes.hardHS = test.numCorrect;
                        speakOutput += `Wow! You set a new personal record of ${test.numCorrect} correct answer for the hard test!`;
                    }
                }
            }

            sessionAttributes.test = null;
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

module.exports = AnswerIntentHandler;
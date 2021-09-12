const Alexa = require('ask-sdk-core');

const {getPresName} = require('../functions/presidentFunctions');
const {getCasualResponse, getCorrectionResponse, getWrongResponse, getTryAgainResponse, getRightResponse} = require('../functions/responses');

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
        const presidentId = parseInt(presidentSlot.resolutions.resolutionsPerAuthority[0].values[0].value.id);

        const test = sessionAttributes.test;
        const NUM_PROBLEMS = 46;

        const answerIsCorrect = presidentId === test.problems[test.questionNum].answer;
        console.log('ANSWER ID: ', presidentId);
        let speakOutput = '';
        if(answerIsCorrect){ // Correct answer
            test.questionNum++;
            test.numCorrect++;
            test.attempts = 0;
            
            if(test.questionNum !== NUM_PROBLEMS){
                speakOutput = `${getRightResponse()}. ${test.problems[test.questionNum].question}`;
            }

        } else if(presidentId === -1){ // User wants to skip
            speakOutput = `${getCasualResponse()}. ${getCorrectionResponse()} ${getPresName(test.problems[test.questionNum].answer)}. `
            
            test.attempts = 0;
            test.questionNum++;
            if(test.questionNum !== NUM_PROBLEMS){
                speakOutput += `${test.problems[test.questionNum].question}`
            }
        } else{ // Incorrect Answer
            
            test.attempts++;

            if(test.attempts >= 2){
                speakOutput = `${getWrongResponse()}. ${getCorrectionResponse()} ${getPresName(test.problems[test.questionNum].answer)}. `;
                
                test.attempts = 0;
                test.questionNum++;
                if(test.questionNum !== NUM_PROBLEMS){
                    speakOutput += `${test.problems[test.questionNum].question}`;
                }
                
            } else{
                if(!test.hintMessageGiven){
                    speakOutput = `${getWrongResponse()}. Just let me know if you need a hint.`;
                    test.hintMessageGiven = true;
                } else{
                    speakOutput = `${getWrongResponse()}. ${getTryAgainResponse()}`;
                }
            }
        }

        if(test.questionNum === NUM_PROBLEMS){
            speakOutput += `The test is finished. Great job. You got ${test.numCorrect} questions correct out of ${NUM_PROBLEMS}. `;

            if(test.difficulty === 'normal'){

                if(sessionAttributes.normalHS){
                    if(test.numCorrect > sessionAttributes.normalHS){
                        sessionAttributes.normalHS = test.numCorrect;
                        speakOutput += `Wow! You set a new personal record of ${test.numCorrect} correct answers for the normal test!`;
                    }
                } else{
                    sessionAttributes.normalHS = test.numCorrect;
                }
            } else{
                if(sessionAttributes.hardHS){
                    if(test.numCorrect > sessionAttributes.hardHS){
                        sessionAttributes.hardHS = test.numCorrect;
                        speakOutput += `Wow! You set a new personal record of ${test.numCorrect} correct answer for the hard test!`;
                    }
                } else{
                    sessionAttributes.hardHS = test.numCorrect;
                }
            }

            sessionAttributes.test = null;
            
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .withShouldEndSession(true)
                .getResponse();
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

module.exports = AnswerIntentHandler;
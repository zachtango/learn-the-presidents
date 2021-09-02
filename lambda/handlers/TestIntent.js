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
            questionNum: 0,
            attempts: 0,
            isRunning: true,
            numCorrect: 0,
            hintMessageGiven: false
        };

        const test = sessionAttributes.test;

        if(DIFFICULTY === 'normal'){
            test.problems = Array.from(new Array(46), (elem, index) => {
                let presidentNumber = `${index + 1}`;

                switch(index + 1){
                    case 1:
                        presidentNumber += 'st';
                        break;
                    case 2:
                        presidentNumber += 'nd';
                        break;
                    case 3:
                        presidentNumber += 'rd';
                        break;
                    default:
                        presidentNumber += 'th';
                }

                return {
                    question: `Who was the ${presidentNumber} president?`,
                    answer: index
                };
            });
        } else if(DIFFICULTY === 'hard'){
            test.problems = [];
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

module.exports = TestIntentHandler;
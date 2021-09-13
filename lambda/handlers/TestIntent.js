const Alexa = require("ask-sdk-core");

const { genTest } = require("../functions/presidentFunctions");
const { getCasualResponse } = require("../functions/responses");

// Session attributes to persist throughout lifespan of current skill session
const StartTestIntentHandler = {
  canHandle(handlerInput) {
    console.log("STARTED TEST INTENT CAN HANDLE");

    const request = handlerInput.requestEnvelope.request;
    return request.type === "IntentRequest" && request.intent.name === "TestIntent";
  },
  handle(handlerInput) {
    console.log("STARTED TEST INTENT HANDLER");
    const DIFFICULTY = Alexa.getSlot(handlerInput.requestEnvelope, "difficulty").value;
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    console.log(JSON.stringify(sessionAttributes.test));
    let speakOutput;

    if (sessionAttributes.test) {
      sessionAttributes.resumeTest = true;
      sessionAttributes.difficulty = DIFFICULTY;
      speakOutput = "I have a previous test saved that has not been completed. Would you like to resume this test?";
    } else {
      speakOutput = genTest(sessionAttributes, DIFFICULTY);
    }

    return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
  },
};

const ResumeTestIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === "IntentRequest" && request.intent.name === "ResumeTestIntent";
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    let speakOutput;
    if (sessionAttributes.test) {
      const test = sessionAttributes.test;
      test.isRunning = true;

      speakOutput = test.problems[test.questionNum].question;
    } else {
      speakOutput = "Hmmm. I dont have a previous test saved. Try to start a new one.";
    }

    return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
  },
};

const ResumeStartTestIntentHandler = {
  canHandle(handlerInput) {
    console.log("RESUME TEST INTENT CAN HANDLE");

    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === "IntentRequest" && request.intent.name === "AMAZON.YesIntent" && sessionAttributes.resumeTest
    );
  },
  handle(handlerInput) {
    console.log("RESUME TEST INTENT HANDLER");

    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    sessionAttributes.resumeTest = null;
    sessionAttributes.difficulty = null;

    // resume test
    const test = sessionAttributes.test;
    test.isRunning = true;
    console.log(JSON.stringify(sessionAttributes));
    const speakOutput = test.problems[test.questionNum].question;

    return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
  },
};

const DontResumeStartTestIntentHandler = {
  canHandle(handlerInput) {
    console.log("DONT RESUME TEST INTENT CAN HANDLE");

    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === "IntentRequest" && request.intent.name === "AMAZON.NoIntent" && sessionAttributes.resumeTest
    );
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const DIFFICULTY = sessionAttributes.difficulty;
    sessionAttributes.resumeTest = null;
    sessionAttributes.difficulty = null;

    const speakOutput = genTest(sessionAttributes, DIFFICULTY);

    console.log(sessionAttributes.test);

    return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
  },
};

const HighscoreIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === "IntentRequest" && request.intent.name === "HighscoreIntent";
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    let speakOutput = `${getCasualResponse()}. `;
    if (sessionAttributes.normalHS || sessionAttributes.hardHS) {
      if (sessionAttributes.normalHS) {
        speakOutput += `Your highest score on the normal test is ${sessionAttributes.normalHS}. `;
      }

      if (sessionAttributes.hardHS) {
        speakOutput += `Your highest score on the hard test is ${sessionAttributes.hardHS}`;
      }
    } else {
      speakOutput = "It seems that I dont have a highest test score saved. Try and set a new one by taking the test.";
    }

    return handlerInput.responseBuilder.speak(speakOutput).withShouldEndSession(true).getResponse();
  },
};

module.exports = {
  StartTestIntentHandler,
  ResumeTestIntentHandler,
  ResumeStartTestIntentHandler,
  DontResumeStartTestIntentHandler,
  HighscoreIntentHandler,
};

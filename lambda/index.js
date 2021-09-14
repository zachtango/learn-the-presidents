/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require("ask-sdk-core");
const { S3PersistenceAdapter } = require("ask-sdk-s3-persistence-adapter");

const persistenceAdapter = new S3PersistenceAdapter({
  bucketName: process.env.S3_PERSISTENCE_BUCKET,
});

const {
  StartTestIntentHandler,
  ResumeTestIntentHandler,
  ResumeStartTestIntentHandler,
  DontResumeStartTestIntentHandler,
  HighscoreIntentHandler,
} = require("./handlers/TestIntent");
const PresIntentHandler = require("./handlers/PresIntent");
const RandomPresIntentHandler = require("./handlers/RandomPresIntent");
const PresOfDayIntentHandler = require("./handlers/PresOfDayIntent");
const NoIntentHandler = require("./handlers/NoIntent");
const AnswerIntentHandler = require("./handlers/AnswerIntent");
const HintIntentHandler = require("./handlers/HintIntent");

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest";
  },
  handle(handlerInput) {
    const speakOutput =
      "Welcome! I have a lot of interesting facts about the presidents to share, or I can test your knowledge on the presidents. Just let me know what you'd like to do.";

    return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
  },
};

const IntentHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput){
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        if(sessionAttributes.test && sessionAttributes.test.isRunning){
            switch(intentName){
              case 'AnswerIntent':
                return AnswerIntentHandler.handle(handlerInput);
              case 'HintIntent':
                return HintIntent.handle(handlerInput);
              default:
                return handlerInput.responseBuilder
                  .speak("Unfortunately, I cannot complete your request because the test is currently running.")
                  .getResponse();
            }
            
        } else{
            const testErrorMsg = "Sorry, I can't do that because a test is not running. Let me know if you'd like to start a test.";

            switch(intentName){
                case 'PresIntent':
                    return PresIntentHandler.handle(handlerInput);
                    
                case 'RandomPresIntent':
                    return RandomPresIntentHandler.handle(handlerInput);

                case 'PresOfDayIntent':
                    return PresOfDayIntentHandler.handle(handlerInput);
                
                case 'TestIntent':
                    return StartTestIntentHandler.handle(handlerInput);
                
                case 'ResumeTestIntent':
                    return ResumeTestIntentHandler.handle(handlerInput);
                
                case 'HintIntent':
                    return handlerInput.responseBuilder
                      .speak(testErrorMsg)
                      .getResponse();

                case 'AnswerIntent':
                  return handlerInput.responseBuilder
                    .speak(testErrorMsg)
                    .getResponse();

                case 'HighscoreIntent':
                    return HighscoreIntentHandler.handle(handlerInput);

                case 'AMAZON.YesIntent':
                    if(sessionAttributes.resumeTest)
                        return ResumeStartTestIntentHandler.handle(handlerInput);
                    
                    break;
                
                case 'AMAZON.NoIntent':
                    if(sessionAttributes.resumeTest)
                        return DontResumeStartTestIntentHandler.handle(handlerInput);
            }
        }

        return handlerInput.responseBuilder
            .speak("Sorry, I don't know that one. Please try a different request.")
            .getResponse();
    }
}

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    const speakOutput =
      "I can share my knowledge about any president. Also, I can give challenging tests on one's knowledge about the presidents. Which one interests you?";

    return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.CancelIntent" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.StopIntent")
    );
  },
  handle(handlerInput) {
    const speakOutput = "Goodbye!";

    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet
 * */
const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.FallbackIntent"
    );
  },
  handle(handlerInput) {
    const speakOutput = "Sorry, I don't know about that. Please try again.";

    return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
  },
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs
 * */
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === "SessionEndedRequest";
  },
  handle(handlerInput) {
    console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    // Any cleanup logic goes here.
    return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
  },
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents
 * by defining them above, then also adding them to the request handler chain below
 * */
const IntentReflectorHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest";
  },
  handle(handlerInput) {
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    const speakOutput = `You just triggered ${intentName}`;

    return (
      handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below
 * */
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    const speakOutput = "Sorry, I had trouble doing what you asked. Please try again.";
    console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

    return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
  },
};

// get persistent attributes
const LoadAttributesRequestInterceptor = {
  async process(handlerInput) {
    const { attributesManager, requestEnvelope } = handlerInput;
    if (Alexa.isNewSession(requestEnvelope)) {
      const persistentAttributes = (await attributesManager.getPersistentAttributes()) || {};
      console.log("Loading from persistent storage: " + JSON.stringify(persistentAttributes));
      // copy persistent attributes to session attributes
      attributesManager.setSessionAttributes(persistentAttributes);
      const sessionAttributes = attributesManager.getSessionAttributes();

      if (sessionAttributes.test) sessionAttributes.test.isRunning = false;
    }
  },
};

const SaveAttributesResponseInterceptor = {
  async process(handlerInput) {
    //if (!response) return; // avoid intercepting calls that have no outgoing response due to errors
    const { attributesManager } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();

    // we make ALL session attributes persistent
    console.log("Saving to persistent storage:" + JSON.stringify(sessionAttributes));
    attributesManager.setPersistentAttributes(sessionAttributes);
    await attributesManager.savePersistentAttributes();
  },
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        IntentHandler,
        NoIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        LoadAttributesRequestInterceptor
    )
    .addResponseInterceptors(
        SaveAttributesResponseInterceptor
    )
    //.withCustomUserAgent('sample/hello-world/v1.2')
    .withPersistenceAdapter(persistenceAdapter)
    .withApiClient(new Alexa.DefaultApiClient())
    .lambda();

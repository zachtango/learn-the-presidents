const Alexa = require('ask-sdk-core');
const { getPresidentOfDayResponse } = require("../functions/getPresidentOfDay");

const PresOfDayIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PresOfDayIntent';
    },
    async handle(handlerInput) {
        // Getting user's time zone
        const serviceClientFactory = handlerInput.serviceClientFactory;
        const deviceId = handlerInput.requestEnvelope.context.System.device.deviceId;
        let userTimeZone;
        try {
            const upsServiceClient = serviceClientFactory.getUpsServiceClient();
            userTimeZone = await upsServiceClient.getSystemTimeZone(deviceId);
        } catch (error) {
            if (error.name !== 'ServiceError') {
                return handlerInput.responseBuilder.speak("There was a problem connecting to the service").getResponse();
            }
            console.log('error', error.message);
        }
        console.log(`User time zone: ${userTimeZone}`);
        // Generate response accordingly
        const response = getPresidentOfDayResponse(userTimeZone);

        return handlerInput.responseBuilder
            .speak(response)
            .getResponse();
    }
};

module.exports = PresOfDayIntentHandler;
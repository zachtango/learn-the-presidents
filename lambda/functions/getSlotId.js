function getSlotId(handlerInput) {
  return handlerInput.requestEnvelope.request.slots.president.resolutions.resolutionsPerAuthority[0].values[0].value.id;
}

module.exports = { getSlotId };
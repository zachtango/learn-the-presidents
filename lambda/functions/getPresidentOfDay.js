const PRESIDENTS = require('../data/president_info.json');
const RANDOM_PRES_ORDER = require('../data/random_pres_order.json');
const { getPresDescription } = require('./presidentFunctions');

/**
 * Given a timezone, returns a string describing the president of the day.
 */
function getPresidentOfDayResponse(timeZone) {
  let president = getPresidentOfDay(timeZone);
  return getPresDescription(president, "POTD");
}

/**
 * Returns a president object for the president of the day for a given timezone.
 * @param {String} timeZone 
 * @returns A president
 */
function getPresidentOfDay(timeZone) {
  // the current time adjusted to the user's time zone
  const currentDateTime = new Date(new Date().toLocaleString("en-US", { timeZone: timeZone }));
  // the arbitrarily-defined start date adjusted to the user's Alexa's time zone
  const startDate = new Date(new Date("1/1/2020").toLocaleDateString("en-US", { timeZone: timeZone }));
  const daysSince = daysInBetween(startDate, currentDateTime);
  const adjustedDayIndex = daysSince % PRESIDENTS.length;
  const todayPresIndex = RANDOM_PRES_ORDER[adjustedDayIndex];
  return PRESIDENTS[todayPresIndex];
}

/**
 * Calculates and returns the number of days between two dates.
 * @param {Date} start 
 * @param {Date} end 
 * @returns The number of days in between the two dates
 */
function daysInBetween(start, end) {
  const oneDay = 1000 * 60 * 60 * 24;
  const timeDiff = end.getTime() - start.getTime();
  const dayDiff = Math.round(timeDiff / oneDay);
  return dayDiff;
}

// testing
if (require.main === module) {
  // console.log(getPresidentOfDay("America/New_York"));
  console.log(getPresidentOfDayResponse("America/Chicago"));
}

module.exports = { getPresidentOfDayResponse };
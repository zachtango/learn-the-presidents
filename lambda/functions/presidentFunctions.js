// Lodash is a library that contains a bunch of "helper functions" that probably should've been included in JS in
// the first place. We can use it in our project to assist with getting random values & randomly shuffling our array.
const _ = require("lodash");
const PRESIDENTS = require('../data/president_info.json');

/**
 * Provides a random president.
 * @returns An object with a random president's information
 */
function getRandomPresident() {
  return _.sample(PRESIDENTS);
}

/**
 * @returns A string fluidly describing the president's name and each fact about him/her.
 */
function getRandomPresidentText() {
  const president = getRandomPresident();
  const responseText = getPresDescription(president, DESC_TYPES.RANDOM);
  return responseText;
}

const DESC_TYPES = {
  RANDOM: "RANDOM",
  POTD: "POTD"
}

/**
 * 
 * @param {Object} president 
 * @param {String} descType 
 * @returns a string describing the president based on what information is desired
 */
function getPresDescription(president, descType) {
  const CONJUNCTIONS = ["Also", "Additionally", "Furthermore"]
  const presidentFirstName = president.names[0];
  const position = getPresPosition(president);
  
  let responseText = "Okay. "
  switch(descType) {
    case DESC_TYPES.RANDOM: {
      responseText  += `Your random president is ${presidentFirstName}. He`;
      break;
    }
    case DESC_TYPES.POTD: {
      responseText += `The president of the day is ${presidentFirstName}`;
      break;
    }
    default: {
      responseText += presidentFirstName;
    }
  }
  responseText = `${responseText} was the ${position} president. He ${president.facts[0]}.`

  for (let additionalFact of president.facts.splice(1)) {
      responseText += ` ${_.sample(CONJUNCTIONS)}, he ${additionalFact}.`
  }
  return responseText;
}

function getPresDescriptionFromId(id) {
  const president = PRESIDENTS[id];
  return getPresDescription(president);
}

function getPresId(president) {
  for (let i = 0; i < PRESIDENTS.length; ++i) {
    testPres = PRESIDENTS[i];
    if (_.isEqual(testPres, president)) {
      return i;
    }
  }
}

function getPresPosition(president) {
  const id = getPresId(president);
  const humanId = String(id + 1);
  const lastChar = humanId[humanId.length - 1]
  if (lastChar == '1') {
    return `${humanId}st`
  } else if (lastChar == '2') {
    return `${humanId}nd`
  } else if (lastChar == '3') {
    return `${humanId}rd`
  } else {
    return `${humanId}th`
  }
}


/**
 *  
 * @returns an array of objects (problems), a list of normal difficulty problems
 */
function genNormalProblems(){

  return Array.from(new Array(46), (elem, index) => {
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
        question: `Who was the ${presidentNumber} president?`, // FIXME: switch up sayings
        answer: index
    };
  });
}

/**
 *  
 * @returns an array of objects (problems), a list of hard difficulty problems
 */
function genHardProblems(){
  // randomize order of presidents
  const order = _.shuffle(
    Array.from(new Array(46), (elem, index) => {
        return index;
    })
  );

  return Array.from(order, (elem) => {
      return { // FIXME: make question be asked in different ways
          question: `Who ${PRESIDENTS[elem].facts[Math.floor(Math.random() * 3)]}?`, // random number between 0 and 2 (3 facts total in array)
          answer: elem
      };
  });
}

/**
 *  
 * @returns a string that is the hint dialogue for a given president
 */
function genHint(index){

  const fact = PRESIDENTS[index].facts[Math.floor(Math.random() * 3)];

  const speakOutput = `This president ${fact}`; // FIXME: SWITCH UP SAYINGS

  return speakOutput;
}

module.exports = { 
  getRandomPresident, 
  getRandomPresidentText, 
  getPresDescriptionFromId, 
  getPresDescription, 
  genNormalProblems, 
  genHardProblems, 
  genHint 
};
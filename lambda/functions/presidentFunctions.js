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
      responseText += `The president of the day is ${presidentFirstName}. He`;
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

function getPresName(id){
  return PRESIDENTS[id].names[0];
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
  if (lastChar == '1' && humanId != 11) {
    return `${humanId}st`
  } else if (lastChar == '2' && humanId != 12) {
    return `${humanId}nd`
  } else if (lastChar == '3' && humanId != 13) {
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
        answer: (index === 23) ? 21 : index
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

  const factId = Math.floor(Math.random() * 3);

  return Array.from(order, (elem) => {
      return { // FIXME: make question be asked in different ways
          question: `Who ${PRESIDENTS[elem].facts[factId]}?`, // random number between 0 and 2 (3 facts total in array)
          answer: (elem === 23) ? 21 : elem,
          factId: factId
      };
  });
}

/**
 *  
 * @returns a string that is the hint dialogue for a given president
 */
function genHint(index, factId = -1){
  let hintId = Math.floor(Math.random() * 3);
  
  while(hintId === factId){
    hintId = Math.floor(Math.random() * 3);
  }

  const fact = PRESIDENTS[index].facts[hintId];
  
  const speakOutput = `This president ${fact}`; // FIXME: SWITCH UP SAYINGS

  return speakOutput;
}

/** Generates a test and saves it to sessionAttributes
 * @param {Object} sessionAttributes
 * @returns a string that asks a question abt a president
 */
function genTest(sessionAttributes, DIFFICULTY){
  // no test saved
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

  return test.problems[0].question;
}

module.exports = { 
  getRandomPresident, 
  getRandomPresidentText,
  getPresName,
  getPresDescriptionFromId, 
  getPresDescription, 
  genNormalProblems, 
  genHardProblems, 
  genHint,
  genTest
};
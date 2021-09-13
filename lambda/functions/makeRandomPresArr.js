const _ = require("lodash");
const PRESIDENTS = require("../data/president_info.json");

/**
 * A function to produce a deterministic random order of the presidents so that
 * we can consistently deliver a "President of the Day" unassociated with the previous
 * president. This function is primarily meant for use to generate an array that will
 * be placed somewhere in data.
 * @returns an array of numbers representing a unique order of presidents
 */
function makeRandomPresArr() {
  let pres_ind_arr = [];
  for (let ind in PRESIDENTS) {
    pres_ind_arr.push(Number(ind));
  }
  let shuffledArray = _.shuffle(pres_ind_arr);
  return shuffledArray;
}

if (require.main === module) {
  let new_arr = makeRandomPresArr();
  console.log(new_arr);
}

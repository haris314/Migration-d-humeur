const MOODFLOW_SKELETON_OBJECT = require("./moodflow-skeleton.js");

const RATING_MOOD_MAP = {
  5: "Awesome",
  4: "Good",
  3: "Okay",
  2: "Bad",
  1: "Horrible"
},

const getMoodflowSkeletonObject = () => {
  return JSON.parse(JSON.stringify(MOODFLOW_SKELETON_OBJECT));
};

const convertSadHappyToMoodRating = (sadHappy) => {
  if (sadHappy >= 80) return 5;
  if (sadHappy >= 60) return 4;
  if (sadHappy >= 50) return 3;
  if (sadHappy >= 40) return 2;
  return 1;
}

/**
 * Converts a Mood Pattern Entry to a Moodflow Entry and returns it
 * @param {Object} moodPatternEntry: One record of Mood Pattern Entry
 */
const convert = (moodPatternEntry) => {
  const moodflowObject = getMoodflowSkeletonObject();
  const moodRating = convertSadHappyToMoodRating(moodPatternEntry.sad_happy);
  return {
    ...moodflowObject,
    timestamp: moodPatternEntry.start_unixtime,
    mood: RATING_MOOD_MAP[moodRating],
    rating: moodRating
  }
};

module.exports = {
  convert,
};

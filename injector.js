/**
 * Exports two methods
 * 1. injector:         Injects one entry of Mood Patterns to Moodflow database object
 * 2. postProcessor:    Processes the Moodflow database object after all the injections are done
 *                          This would include two operations-
 *                              i)  Calculating avgRating
 *                              ii) Sorting the entries in a single day according to timestamp
 *
 */

const inject = (moodflowEntry, moodflowDb) => {
  const date = new Date(moodflowEntry.timestamp);
  ((((moodflowDb.data.moods[date.getFullYear()] ??= {})[date.getMonth() + 1] ??=
    {})[date.getDate()] ??= {}).entries ??= []).push(moodflowEntry);
};

const postProcess = (moodflowDb) => {
  for (const year in moodflowDb.data.moods) {
    for (const month in moodflowDb.data.moods[year]) {
      for (const day in moodflowDb.data.moods[year][month]) {
        processInternal(
          moodflowDb.data.moods[year][month][day],
          year,
          month,
          day
        );
      }
    }
  }
};

const processInternal = (dayObject, year, month, day) => {
  dayObject.entries.sort((o1, o2) => {
    if (o1.timestamp < o2.timestamp) return -1;
    else return 1;
  });

  dayObject.day = parseInt(day);
  dayObject.month = parseInt(month);
  dayObject.year = parseInt(year);
  dayObject.avgRating =
    dayObject.entries.reduce(
      (totalRating, entry) => totalRating + entry.rating,
      0
    ) / dayObject.entries.length;
};

module.exports = { inject, postProcess };

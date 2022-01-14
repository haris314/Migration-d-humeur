const FileSystem = require("fs");
const moodflowDb = require("./databases/moodflow_backup.json");
const dbOperations = require("./database-operations.js");
const convert = require("./converter.js");
const injector = require("./injector.js");

const main = async () => {
  console.info("Starting Conversion");
  const rows = await dbOperations.getAllValidSurveyEntries();
  rows.forEach((moodPatternEntry) => {
    const moodFlowEntry = convert(moodPatternEntry);
    injector.inject(moodFlowEntry, moodflowDb);
  });

  console.info("Post processing");
  injector.postProcess(moodflowDb);

  console.info("Writing to json file");
  FileSystem.writeFile(
    "./output/moodflow_backup.json",
    JSON.stringify(moodflowDb),
    (error) => {
      if (error) throw error;
    }
  );
  console.info("Successfully completed the migration process");
};

main();

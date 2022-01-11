const db_operations = require("./database-operations.js");

const main = async () => {
  await db_operations.printSurveyTable();
};

main();

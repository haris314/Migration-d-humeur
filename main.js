const sqlite3 = require("sqlite3").verbose();
const Dao = require("./dao");

const printTableSummaries = async (dao) => {
  const tables = await dao.all(
    "SELECT name FROM sqlite_master WHERE type='table'"
  );
  console.log(tables);

  tables.forEach(async (table) => {
    console.log("SUMMARY OF TABLE " + table.name);
    const rows = await dao.all(`SELECT * FROM ${table.name} LIMIT 3`, []);
    console.log(rows);
  });
};

const printSurveyTable = async (dao) => {
  const rows = await dao.all(
    `
    SELECT start_unixtime, start_date, start_time, sad_happy, discontent_content, stressed_relaxed
    FROM survey
    ORDER BY start_unixtime DESC
    LIMIT 100
    `,
    []
  );
  // console.log(rows);
};

const main = async () => {
  // const resultRows = await db.query(sql, []);
  const dao = new Dao("databases/2022_01_08_19_55_58.db");
  // await printTableSummaries(dao);
  await printSurveyTable(dao);
};

main();

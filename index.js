const cron = require("node-cron");
const { checkSlots } = require("./notifier");

/* -----------------------  CONFIGURATIONS ------------------------ */

// Basic Filters
const AGE = 18;
const DATE = "19-05-2021";
const DOSE = 1;

// Other Options
const type = process.env.TYPE || "pincode"; // Find slots by "pincode" or "dist"
const PINCODES = ["360004"];
const DISTRICT_IDS = [775]; //Rajkot Corp

const SCHEDULE = "*/3 * * * * *"; // Every 3 second
SOUND_ALERT = true;

/* --------------------------------CRON JOB--------------------------------- */

const filters = { age: AGE, date: DATE, dose: DOSE };

const job = cron.schedule(SCHEDULE, function () {
  const values = type === "dist" ? DISTRICT_IDS : PINCODES;

  console.log("\n"); // just to divide each cron logs
  const promises = values.map(async (value) => {
    await checkSlots(type, value, { value, ...filters });
  });

  return Promise.all(promises);
});

console.log(`Looking for an available slot on ${DATE}\nScheduled: ${SCHEDULE}`);

job.start();

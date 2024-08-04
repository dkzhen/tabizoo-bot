const cron = require("node-cron");
const express = require("express");

const { configDotenv } = require("dotenv");
const { checkIn } = require("./func/checkIn");
const { claimRewards } = require("./func/claimRewards");
const { levelUp } = require("./func/levelUp");
configDotenv();

const main = async () => {
  await checkIn();
  await claimRewards();
  await levelUp();
};
main();
cron.schedule("0 * * * *", checkIn);
cron.schedule("0 * * * *", claimRewards);
cron.schedule("0 * * * *", levelUp);

// Start the server
const port = process.env.PORT || 103;
const app = express();

app.get("/", (req, res) => {
  res.send("API cron job server is running");
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});

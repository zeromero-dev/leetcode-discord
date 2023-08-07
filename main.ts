const utils = require("./scrape.js");
const cron = require("node-cron");
const fs = require("fs");

type Config = {
  [key: string]: {
    endpoint: string;
    hours: string;
  };
}

(() => {
  // To specify minutes use :. (15:25)
  const HOURS = "6,8,14:52";
  const SERVER_NAME = "ByteBusters";
  const CHANNEL_NAME = "problems";
  // config for each channel
  let config: Config = {
    "ByteBusters#problems": {
      endpoint: `${process.env.WEBHOOK}`,
      hours: `${HOURS}`,
    },
  };

  // goes through all channels and sends them on their requried hours
  Object.keys(config).forEach((channel) => {
    // calc cron expr
    const cronExpr = "* " + config[channel]["hours"] + " * * *";

    // scrape and send on whatever hours are required
    cron.schedule(cronExpr, () => {
      utils.scrape_leetcode_and_send(config[channel]["endpoint"]);
    });
  });
})();

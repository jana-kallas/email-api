const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: "46f3614a5147e377b881a776b3a77d34-us1",
  server: "us1",
});

module.exports = client;
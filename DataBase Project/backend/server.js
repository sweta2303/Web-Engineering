
/*
* Author : Jeevan Srinivasalureddy (616476 )
*/

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var path = require("path");
const cron = require("node-cron");
const db = require("./queries");
const test = require("./proxy-test");
const update = require("./proxy-update.js");
const cleanOldAge = require("./proxy-delete-age.js");
require('dotenv').config()

const port = process.env.SERVER_PORT;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(path.join(__dirname, "..", "frontend")));

app.get("/", (request, response) => {
  response.sendFile("index.html", {
    root: path.join(__dirname, "..", "frontend"),
  });
});

app.get("/proxyList", db.getProxyList);
app.get("/proxy", db.getProxy);
app.get("/proxyList/:proxy_list_id", db.getProxyListById);
app.get("/proxy/:proxy_id", db.getProxyById);
app.post("/proxy", db.createProxy);
app.post("/proxyList", db.createProxyList);
app.delete("/proxyList/:proxy_list_id", db.deleteProxyList);
app.put("/testProxy",test.testProxyAndUpdateToDB)
app.post("/testURL",db.createTestURL)
app.get("/testURL",db.getTestURL)
app.delete("/testURL/:test_url_id",db.deleteTestURL)
app.get("/testSummary",test.getTestSummary)
app.get("/updateSummary",update.getUpdateSummary)
app.delete("/updateSummary/:update_summary_id",update.deleteUpdateSummary)
app.delete("/testSummary/:test_summary_id",test.deleteTestSummary)
app.post("/updateProxyList",update.checkForUpdate)
app.put("/updateProxyList",update.updateProxyList)

/*
* Cron Jon to delete proxies after age expiration as per 2.2.1.6 and 2.2.5.2
*/
cron.schedule("* 12 * * *", function() {
  console.log("Running this Job for every 12 hours");
  cleanOldAge.deleteOldProxies()
  
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

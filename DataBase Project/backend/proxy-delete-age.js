/*
* Author : Jeevan Srinivasalureddy (616476 )
*/
const request = require("request");
const cheerio = require("cheerio");
const Pool = require("pg").Pool;

require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_POSR,
});

let proxyList = [];

/*
* Assumption here is that whenever the proxies are extracted from the 
* proxy provider , last_test_success column in proxy table is updated with
* current date stamp when the proxy was extracted . 
*
* Now when the proxies tested , only the proxies which are test pass are updated with
* last_test_success column . 
*
*/

/* Logic :
*
* Get all the proxy provider's and their Age 
* Get all the proxies for each proxy provider
* If  last_test_success >= Age , delete the proxy
* Else do nothing
*/
const deleteOldProxies = () => {
  pool.query(
    "SELECT proxy_list_id,url,age from proxy_list",
    [],
    (error, results) => {
      if (!error) {
        proxyList = results.rows;
       
        for (i = 0; i < proxyList.length; i++) {
            computeAgeDifference(i)
        }
      }
    }
  );
};

const computeAgeDifference = (i) => {
    let proxyFromProxyList = [];
    pool.query(
      "SELECT proxy_id,last_test_success from proxy where proxy_list_id=$1",
      [proxyList[i].proxy_list_id],
      (error, results) => {
        if (!error) {
          proxyFromProxyList = results.rows;

          for (j = 0; j < proxyFromProxyList.length; j++) {
            let dbDate = new Date(
              proxyFromProxyList[j].last_test_success
            );
            let curretDate = new Date();
            let difference = curretDate.getTime() - dbDate.getTime();
            let diff_hours = Math.round(difference / 3600000);

            if (diff_hours >= proxyList[i].age * 24) {
              pool.query(
                "DELETE * from proxy where proxy_id=$1",
                [proxyFromProxyList[j].proxy_id],
                (error, results) => {
                  if (error) {
                    console.log(error.message.toString());
                  }
                }
              );
            } else {
              console.log("Age did not exceed");
            }
          }
        }
      }
    );
}

module.exports = {
  deleteOldProxies,
};

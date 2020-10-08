/*
* Author : Jeevan Srinivasalureddy (616476 )
*/
const request = require("request");
const cheerio = require("cheerio");
const { html } = require("cheerio");
const Pool = require("pg").Pool;

require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_POSR,
});

const getProxiesFromProxyProviderInHTMLAndInsertToDB = (url, proxyListID) => {
  const date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
  let options = {
    url: url,
    method: "GET",
  };
  if (url === "https://free-proxy-list.net/") {
    request(options, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        let proxies = $(".modal-body")
          .text()
          .split(/\n\s*\n/)[1];
        let ipArray = proxies.split(/\n\s*\n/)[0].split(/\r\n|\r|\n/);

        for (var i = 0; i < 100; i++) {
          var splitIp = ipArray[i].split(":");
          var ip = splitIp[0];
          var port = splitIp[1];
          pool.query(
            "INSERT INTO proxy (ip, port,last_test_success,last_found_in_list,first_found_in_list ,proxy_list_id) VALUES ($1, $2 ,CURRENT_TIMESTAMP(0),$3 ,$4 , $5)",
            [ip, port, date, date, parseInt(proxyListID)],
            (error, results) => {
              if (error) {
                console.log(error);
              }
            }
          );
        }
      }
      if (error) {
        console.log(error);
      }
    });
  }if(url==='https://www.proxy-list.download/api/v1/get?type=http'){

    request(options, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        let ipArray = response.body.split(/\n\s*\n/)[0].split(/\r\n|\r|\n/);
       // console.log(ipArray)

        for (var i = 0; i < 10; i++) {
          var splitIp = ipArray[i].split(":");
          var ip = splitIp[0];
          var port = splitIp[1];
          pool.query(
            "INSERT INTO proxy (ip, port,last_test_success,last_found_in_list,first_found_in_list ,proxy_list_id) VALUES ($1, $2 ,CURRENT_TIMESTAMP(0),$3 ,$4 , $5)",
            [ip, port, date, date, parseInt(proxyListID)],
            (error, results) => {
              if (error) {
                console.log(error);
              }
            }
          );
        }
      }
      if (error) {
        console.log(error);
      }
    });
  }
};

const getProxiesFromProxyProviderInJSONAndInsertToDB = (url, proxyListID) => {
  const date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");

  if (url === "https://api.getproxylist.com/proxy") {

    request(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        let ip = JSON.parse(body).ip;
        let port = JSON.parse(body).port;
        
          pool.query(
            "INSERT INTO proxy (ip, port,last_test_success,last_found_in_list,first_found_in_list ,proxy_list_id) VALUES ($1, $2 ,CURRENT_TIMESTAMP(0),$3 ,$4 , $5)",
            [
              ip,
              port,
              date,
              date,
              parseInt(proxyListID),
            ],
            (error, results) => {}
          );
        
      } else {
        console.log(error);
      }
    });


  } else {
    request(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        console.log(JSON.parse(body).data.length);

        for (var i = 0; i < JSON.parse(body).data.length; i++) {
          pool.query(
            "INSERT INTO proxy (ip, port,last_test_success,last_found_in_list,first_found_in_list ,proxy_list_id) VALUES ($1, $2 ,CURRENT_TIMESTAMP(0),$3 ,$4 , $5)",
            [
              JSON.parse(body).data[i].ip,
              JSON.parse(body).data[i].port,
              date,
              date,
              parseInt(proxyListID),
            ],
            (error, results) => {}
          );
        }
      } else {
        console.log(error);
      }
    });
  }
};

module.exports = {
  getProxiesFromProxyProviderInJSONAndInsertToDB,
  getProxiesFromProxyProviderInHTMLAndInsertToDB,
};

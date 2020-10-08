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

const updateProxyList = (req, res) => {
  const { proxy_list, proxy_list_id } = req.body;
  let isProxyMatch = false;
  pool.query(
    "SELECT ip,port from proxy where proxy_list_id=$1",
    [proxy_list_id],
    (error, results) => {
      if (error) {
        res.status(400).send(error.message.toString());
      } else {
        if(proxy_list === 'https://www.proxy-list.download/api/v1/get?type=http') {
          request(proxy_list, (error, response, html) => {
            if (!error && response.statusCode === 200) {
      
              let  ipArray = response.body.split(/\n\s*\n/)[0].split(/\r\n|\r|\n/);
              console.log(ipArray.length);

              // check for proxies from latest data to the data in the DB
              for (var i = 0; i < 10; i++) {
                var splitIp = ipArray[i].split(":");
                var ip = splitIp[0];
                var port = splitIp[1];
                // console.log("---Outer Loop---"+JSON.parse(body).data[i].ip)
                for (var j = 0; j < results.rows.length; j++) {
                  // console.log("---- Inner Loop----"+results.rows[j].ip)
                  if (results.rows[j].ip === ip) {
                    pool.query(
                      "UPDATE proxy SET last_found_in_list=CURRENT_TIMESTAMP(0) where ip=$1",
                      [ip],
                      (error, results) => {
                        if (error) {
                          console.log(error.message.toString());
                        }
                      }
                    );
                    console.log(
                      "Matched Proxy is " + ip
                    );
                    isProxyMatch = true;
                  }
                }
                if (!isProxyMatch) {
                  pool.query(
                    "INSERT INTO proxy (ip , port , last_test_success,last_found_in_list,first_found_in_list , proxy_list_id) VALUES ($1,$2,CURRENT_TIMESTAMP(0),CURRENT_TIMESTAMP(0),CURRENT_TIMESTAMP(0),$3)",
                    [
                      ip,
                      port,
                      proxy_list_id,
                    ],
                    (error, results) => {
                      if (error) {
                        console.log(error.message.toString());
                      }
                    }
                  );
                  console.log("New Proxy is " + ip);
                }
              }
              pool.query(
                "INSERT INTO update_summary (proxy_list,start_time,status) VALUES ($1,CURRENT_TIMESTAMP(0),$2)",
                [proxy_list, "Completed"],
                (error, results) => {
                  if (!error) {
                    res.status(200).send("Proxy Update is Success");
                  }
                }
              );
            } else {
              console.log(error);
            }
          });
        }
       else if (proxy_list === "https://free-proxy-list.net/") {

          request(proxy_list, (error, response, html) => {
            if (!error && response.statusCode === 200) {
              const $ = cheerio.load(html);
              let proxies = $(".modal-body")
                .text()
                .split(/\n\s*\n/)[1];
              let ipArray = proxies.split(/\n\s*\n/)[0].split(/\r\n|\r|\n/);
              console.log(ipArray.length);

              // check for proxies from latest data to the data in the DB
              for (var i = 0; i < 100; i++) {
                var splitIp = ipArray[i].split(":");
                var ip = splitIp[0];
                var port = splitIp[1];
                // console.log("---Outer Loop---"+JSON.parse(body).data[i].ip)
                for (var j = 0; j < results.rows.length; j++) {
                  // console.log("---- Inner Loop----"+results.rows[j].ip)
                  if (results.rows[j].ip === ip) {
                    pool.query(
                      "UPDATE proxy SET last_found_in_list=CURRENT_TIMESTAMP(0) where ip=$1",
                      [ip],
                      (error, results) => {
                        if (error) {
                          console.log(error.message.toString());
                        }
                      }
                    );
                    console.log(
                      "Matched Proxy is " + ip
                    );
                    isProxyMatch = true;
                  }
                }
                if (!isProxyMatch) {
                  pool.query(
                    "INSERT INTO proxy (ip , port , last_test_success,last_found_in_list,first_found_in_list , proxy_list_id) VALUES ($1,$2,CURRENT_TIMESTAMP(0),CURRENT_TIMESTAMP(0),CURRENT_TIMESTAMP(0),$3)",
                    [
                      ip,
                      port,
                      proxy_list_id,
                    ],
                    (error, results) => {
                      if (error) {
                        console.log(error.message.toString());
                      }
                    }
                  );
                  console.log("New Proxy is " + ip);
                }
              }
              pool.query(
                "INSERT INTO update_summary (proxy_list,start_time,status) VALUES ($1,CURRENT_TIMESTAMP(0),$2)",
                [proxy_list, "Completed"],
                (error, results) => {
                  if (!error) {
                    res.status(200).send("Proxy Update is Success");
                  }
                }
              );
            } else {
              console.log(error);
            }
          });

        } else if (proxy_list==='https://api.getproxylist.com/proxy'){

          request(proxy_list, (error, response, body) => {
            if (!error && response.statusCode === 200) {
              

              // check for proxies from latest data to the data in the DB
              let ip = JSON.parse(body).ip;
              let port = JSON.parse(body).port;
                
                // console.log("---Outer Loop---"+JSON.parse(body).data[i].ip)
                for (var j = 0; j < results.rows.length; j++) {
                  // console.log("---- Inner Loop----"+results.rows[j].ip)
                  if (results.rows[j].ip === ip) {
                    pool.query(
                      "UPDATE proxy SET last_found_in_list=CURRENT_TIMESTAMP(0) where ip=$1",
                      [ip],
                      (error, results) => {
                        if (error) {
                          console.log(error.message.toString());
                        }
                      }
                    );
                    console.log(
                      "Matched Proxy is " + JSON.parse(body).data[i].ip
                    );
                    isProxyMatch = true;
                  }
                }
                if (!isProxyMatch) {
                  pool.query(
                    "INSERT INTO proxy (ip , port , last_test_success,last_found_in_list,first_found_in_list , proxy_list_id) VALUES ($1,$2,CURRENT_TIMESTAMP(0),CURRENT_TIMESTAMP(0),CURRENT_TIMESTAMP(0),$3)",
                    [
                      ip,
                      port,
                      proxy_list_id,
                    ],
                    (error, results) => {
                      if (error) {
                        console.log(error.message.toString());
                      }
                    }
                  );
                  console.log("New Proxy is " + ip);
                }
              
              pool.query(
                "INSERT INTO update_summary (proxy_list,start_time,status) VALUES ($1,CURRENT_TIMESTAMP(0),$2)",
                [proxy_list, "Completed"],
                (error, results) => {
                  if (!error) {
                    res.status(200).send("Proxy Update is Success");
                  }
                }
              );
            } else {
              console.log(error);
            }
          });
        }else {
          request(proxy_list, (error, response, body) => {
            if (!error && response.statusCode === 200) {
              console.log(JSON.parse(body).data.length);

              // check for proxies from latest data to the data in the DB
              for (var i = 0; i < JSON.parse(body).data.length; i++) {
                
                // console.log("---Outer Loop---"+JSON.parse(body).data[i].ip)
                for (var j = 0; j < results.rows.length; j++) {
                  // console.log("---- Inner Loop----"+results.rows[j].ip)
                  if (results.rows[j].ip === JSON.parse(body).data[i].ip) {
                    pool.query(
                      "UPDATE proxy SET last_found_in_list=CURRENT_TIMESTAMP(0) where ip=$1",
                      [JSON.parse(body).data[i].ip],
                      (error, results) => {
                        if (error) {
                          console.log(error.message.toString());
                        }
                      }
                    );
                    console.log(
                      "Matched Proxy is " + JSON.parse(body).data[i].ip
                    );
                    isProxyMatch = true;
                  }
                }
                if (!isProxyMatch) {
                  pool.query(
                    "INSERT INTO proxy (ip , port , last_test_success,last_found_in_list,first_found_in_list , proxy_list_id) VALUES ($1,$2,CURRENT_TIMESTAMP(0),CURRENT_TIMESTAMP(0),CURRENT_TIMESTAMP(0),$3)",
                    [
                      JSON.parse(body).data[i].ip,
                      JSON.parse(body).data[i].port,
                      proxy_list_id,
                    ],
                    (error, results) => {
                      if (error) {
                        console.log(error.message.toString());
                      }
                    }
                  );
                  console.log("New Proxy is " + JSON.parse(body).data[i].ip);
                }
              }
              pool.query(
                "INSERT INTO update_summary (proxy_list,start_time,status) VALUES ($1,CURRENT_TIMESTAMP(0),$2)",
                [proxy_list, "Completed"],
                (error, results) => {
                  if (!error) {
                    res.status(200).send("Proxy Update is Success");
                  }
                }
              );
            } else {
              console.log(error);
            }
          });
        }
      }
    }
  );
};

const checkForUpdate = (req, res) => {
  const { proxy_list } = req.body;

  pool.query(
    "SELECT * FROM update_summary where proxy_list = $1 ORDER BY update_summary_id desc",
    [proxy_list],
    (error, results) => {
      if (error) {
        res.status(400).json(error.message.toString);
      } else if (results.rows.length < 1) {
        res
          .status(200)
          .send(
            "There are no update entries for this proxy list , Please continue"
          );
      } else if (results.rows.length >= 1) {
        // Write logic to check the time difference and send corresposnding status code
        let dbDate = new Date(results.rows[0].start_time);
        let curretDate = new Date();
        let difference = curretDate.getTime() - dbDate.getTime();
        let diff_mins = Math.round(difference / 60000);
        // let elapsed = curretDate - dbDate;
        // let difference = new Date(elapsed);
        // let diff_mins = difference.getMinutes();
        pool.query(
          "SELECT * from proxy_list where url=$1",
          [proxy_list],
          (error, results) => {
            if (!error) {
              if (diff_mins > results.rows[0].update_time) {
                res
                  .status(200)
                  .send(
                    `Last update was ${diff_mins} mins ago and Update interval is ${results.rows[0].update_time} mins, you may proceed with update`
                  );
              } else {
                res
                  .status(400)
                  .send(
                    `Last update was only ${diff_mins} mins ago and Update interval is ${results.rows[0].update_time} mins, Please wait`
                  );
              }
            } else {
              console.log(error.message.toString());
            }
          }
        );
      }
    }
  );
};

const getUpdateSummary = (request, response) => {
  pool.query(
    "SELECT * FROM update_summary ORDER BY update_summary_id",
    (error, results) => {
      if (error) {
        response.status(400).json(error.message.toString);
      } else response.status(200).json(results.rows);
    }
  );
};

const deleteUpdateSummary = (request, response) => {
  const update_summary_id = parseInt(request.params.update_summary_id);

  pool.query(
    "DELETE FROM update_summary WHERE update_summary_id = $1",
    [update_summary_id],
    (error, results) => {
      if (error) {
        response
          .status(400)
          .send(
            `Unable to Delete Update Summary with ID : ${update_summary_id}` +
              `\nError : ${error.message.toString()}`
          );
      } else {
        response
          .status(200)
          .send(`Update Summary deleted with ID: ${update_summary_id}`);
      }
    }
  );
};

module.exports = {
  checkForUpdate,
  getUpdateSummary,
  deleteUpdateSummary,
  updateProxyList,
};

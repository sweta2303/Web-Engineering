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

const date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
let total_proxy_count;
let total_proxy_pass=0;
let total_proxy_fail=0;
let test_summary_id;

const testProxyAndUpdateToDB = (req, res) => {
  const test_url = req.body.test_url;
  const proxy_list = req.body.proxy_list;
  const proxy_list_id = req.body.proxy_list_id;


  let jsonProxies;

  pool.query(
    "INSERT INTO test_summary (test_url, proxy_list,start_time,test_status ) VALUES ($1, $2 ,$3 ,$4) RETURNING *",
    [test_url, proxy_list, date, "In Progress"],
    (error, results) => {
      if (error) {
        res.status(400).send(error.message.toString());
      } else {
        test_summary_id = JSON.stringify(results.rows[0].test_summary_id);
        console.log(test_summary_id)
        pool.query(
          "SELECT ip,port from proxy where proxy_list_id= $1",
          [proxy_list_id],
          (error, results) => {
            if (error) {
              console.log(error.message.toString());
              res
              .status(400)
              .send(
                error.message.toString()
              );
            } else {
              jsonProxies = JSON.stringify(results.rows);
              console.log(JSON.stringify(results.rows[0].ip));
              console.log(results.rows.length);
              total_proxy_count = results.rows.length;
              for (var i = 0; i < results.rows.length; i++) {
                proxyTest(test_url, results.rows[i].ip, results.rows[i].port,i);
              }
              res
                .status(202)
                .send(
                  "Test Request for " +
                    proxy_list +
                    " with test url " +
                    test_url +
                    " is posted successfully"
                );
            }
          }
        );
      }
    }
  );
};

const proxyTest = (testUrl, ip, port,i) => {
  request(
    {
      url: testUrl,
      method: "GET",
      proxy: "http://" + ip + ":" + port,
    },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        let anonLevel;
        // Anonymity Logic
        for(var item in response.headers) {
          if( item == 'x-forwaded-for'){
            anonLevel = 3
          }
          else if(item=='via'){
            anonLevel = 2
          }else{
            anonLevel = 1
          }
        }
        //console.log(response.headers)
        total_proxy_pass=total_proxy_pass+1;
        console.log(body);
        pool.query(
          "UPDATE proxy SET last_test_success=CURRENT_TIMESTAMP(0) , test_result=($1) , anonymity=($2) WHERE ip=($3)",
          ["Pass", anonLevel,ip],
          (err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log(res.rows[0]);
            }
          }
        );
      } else {
        total_proxy_fail=total_proxy_fail+1;
        pool.query(
          "UPDATE proxy SET  test_result=($1),anonymity=($2) WHERE ip=($3)",
          ["Fail", "NA",ip],
          (err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log(res.rows[0]);
            }
          }
        );
        console.log(body);
      }
    }
  );
  if(i===(total_proxy_count-1)){
    pool.query("UPDATE test_summary SET total_proxy_tested=($1), total_proxy_test_pass=($2), total_proxy_test_fail=($3) , test_status=($4) WHERE test_summary_id=($5)",[
      total_proxy_count,
      total_proxy_pass,
      total_proxy_fail,
      'Completed',
      test_summary_id
    ])
  }

};

const getTestSummary = (request, response) => {
  pool.query(
    "SELECT * FROM test_summary ORDER BY test_summary_id ",
    (error, results) => {
      if (error) {
        response.status(400).json(error.message.toString);
      } else response.status(200).json(results.rows);
    }
  );
};
const deleteTestSummary = (request, response) => {
  const test_summary_id = parseInt(request.params.test_summary_id);

  pool.query(
    "DELETE FROM test_summary WHERE test_summary_id = $1",
    [test_summary_id],
    (error, results) => {
      if (error) {
        response
          .status(400)
          .send(
            `Unable to Delete Test Summary with ID : ${test_summary_id}` +
              `\nError : ${error.message.toString()}`
          );
      } else {
        response
          .status(200)
          .send(`Test Summary deleted with ID: ${test_summary_id}`);
      }
    }
  );
};
module.exports = {
  testProxyAndUpdateToDB,
  getTestSummary,
  deleteTestSummary
};

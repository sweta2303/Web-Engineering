/*
* Author : Jeevan Srinivasalureddy (616476 )
*/

const Pool = require("pg").Pool;
const extraction = require("./proxy-extraction");
require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_POSR,
});

const getProxyList = (request, response) => {
  pool.query(
    "SELECT * FROM proxy_list ORDER BY proxy_list_id ASC",
    (error, results) => {
      if (error) {
        response.status(400).json(error.message.toString);
      } else response.status(200).json(results.rows);
    }
  );
};

const getProxy = (request, response) => {
  pool.query("SELECT * FROM proxy ORDER BY proxy_id ASC", (error, results) => {
    if (error) {
      response.status(400).json(error.message.toString);
    } else response.status(200).json(results.rows);
  });
};

const getProxyListById = (request, response) => {
  const proxy_list_id = parseInt(request.params.proxy_list_id);
  pool.query(
    "SELECT * FROM proxy_list where proxy_list_id = $1",
    [proxy_list_id],
    (error, results) => {
      if (error) {
        response.status(400).json(error.message.toString);
      } else response.status(200).json(results.rows);
    }
  );
};

const getProxyById = (request, response) => {
  const proxy_id = parseInt(request.params.proxy_id);
  pool.query(
    "SELECT * FROM proxy where proxy_id = $1",
    [proxy_id],
    (error, results) => {
      if (error) {
        response.status(400).json(error.message.toString);
      } else response.status(200).json(results.rows);
    }
  );
};

const getTestURL = (request, response) => {
  pool.query(
    "SELECT * FROM test_url ORDER BY test_url_id ASC",
    (error, results) => {
      if (error) {
        response.status(400).json(error.message.toString);
      } else response.status(200).json(results.rows);
    }
  );
};
const createTestURL = (request, response) => {
  const { test_url } = request.body;

  pool.query(
    "INSERT INTO test_url (test_url) VALUES ($1)",
    [test_url],
    (error, results) => {
      if (error) {
        response.status(400).send(error.message.toString());
      } else {
        response.status(201).send(`Test URL added Successfully`);
      }
    }
  );
};

const createProxyList = (request, response) => {
  const { url, extraction_type, update_time, age } = request.body;

  pool.query(
    "INSERT INTO proxy_list (url, extraction_type,last_success_update,last_update_attempt,update_time,age ) VALUES ($1, $2 ,$3 ,$4,$5,$6) RETURNING *",
    [
      url,
      extraction_type,
      new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
      new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
      update_time,
      age,
    ],
    (error, results) => {
      if (error) {
        response.status(400).send(error.message.toString());
      } else {
        if (extraction_type === "JSON") {
          extraction.getProxiesFromProxyProviderInJSONAndInsertToDB(
            url,
            JSON.stringify(results.rows[0].proxy_list_id)
          );
          response
            .status(201)
            .send(
              `ProxyList added Successfully through JSON with ID ${JSON.stringify(
                results.rows[0].proxy_list_id
              )}`
            );
        }
        if (extraction_type === "HTML") {
          extraction.getProxiesFromProxyProviderInHTMLAndInsertToDB(
            url,
            JSON.stringify(results.rows[0].proxy_list_id)
          );
          response
            .status(201)
            .send(
              `ProxyList added Successfully through HTML with ID ${JSON.stringify(
                results.rows[0].proxy_list_id
              )}`
            );
        }
      }
    }
  );
};

const createProxy = (request, response) => {
  const { ip, port } = request.body;
  const date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");

  // FK is hardcoded to 3
  pool.query(
    "INSERT INTO proxy (ip, port,last_test_success,last_found_in_list,first_found_in_list ,proxy_list_id) VALUES ($1, $2 ,$3 ,$4 , $5 , $6)",
    [ip, port, date, date, date, 64],
    (error, results) => {
      if (error) {
        response.status(400).send(error.message.toString());
      } else response.status(201).send(`Proxy added Successfully`);
    }
  );
};

const deleteProxyList = (request, response) => {
  const proxy_list_id = parseInt(request.params.proxy_list_id);

  pool.query(
    "DELETE FROM proxy WHERE proxy_list_id = $1",
    [proxy_list_id],
    (error, results) => {
      if (error) {
        response
          .status(400)
          .send(
            `Unable to Delete Proxy with ID : ${proxy_list_id}` +
              `\nError : ${error.message.toString()}`
          );
      } else {
        pool.query(
          "DELETE from proxy_list WHERE proxy_list_id = $1",
          [proxy_list_id],
          (error, results) => {
            if (error) {
              response
                .status(400)
                .send(
                  `Unable to Delete Proxy with ID : ${proxy_list_id}` +
                    `\nError : ${error.message.toString()}`
                );
            }
          }
        );
        response
          .status(200)
          .send(`Proxy List deleted with ID: ${proxy_list_id}`);
      }
    }
  );
};

const deleteTestURL = (request, response) => {
  const test_url_id = parseInt(request.params.test_url_id);

  pool.query(
    "DELETE FROM test_url WHERE test_url_id = $1",
    [test_url_id],
    (error, results) => {
      if (error) {
        response
          .status(400)
          .send(
            `Unable to Delete Test URL with ID : ${test_url_id}` +
              `\nError : ${error.message.toString()}`
          );
      } else {
        response.status(200).send(`Test URL deleted with ID: ${test_url_id}`);
      }
    }
  );
};

module.exports = {
  getProxyList,
  getProxy,
  getProxyListById,
  getProxyById,
  createProxy,
  createProxyList,
  deleteProxyList,
  createTestURL,
  getTestURL,
  deleteTestURL,
};

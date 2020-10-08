/*
* Author : Sweta ( 616463 )
*/
function loadExportText() {

  var modalText = '';

  var table = document.getElementById('table_proxy')

  for(var i = 0 ; i< table.rows.length ;i++){

    if(!(table.rows[i].hasAttribute('style')) || (table.rows[i].getAttribute('style')=='')){
      var ip = table.rows[i].cells[1].textContent;
      var port = table.rows[i].cells[2].textContent;
      modalText = modalText + ip+":"+port+"\n";
    }
  }
  document.getElementById('modal-body').innerHTML = modalText;
}

function countProxy() {
  alert(document.getElementById("table_proxy").rows.length);
}
function disableUpdate() {
  var operation = document.getElementById("select_operation").value;
  if (operation === "Update") {
    document.getElementById("addOperation").disabled = true;
    document.getElementById("checkUpdatePossible").disabled = false;
    document.getElementById("select_test_url").disabled = true;
  } else if (operation === "Test") {
    document.getElementById("checkUpdatePossible").disabled = true;
    document.getElementById("addOperation").disabled = false;
    document.getElementById("select_test_url").disabled = false;
  } else {
    document.getElementById("addOperation").disabled = true;
    document.getElementById("checkUpdatePossible").disabled = true;
    document.getElementById("select_test_url").disabled = false;
  }
}
function checkIfUpdateIsPossible() {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/updateProxyList");
  var proxy_list = document.getElementById("select_proxy_provider").options[
    document.getElementById("select_proxy_provider").selectedIndex
  ].text;

  var payload = { proxy_list: proxy_list };
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {
    if (xhr.status != 200) {
      alert(xhr.responseText);
    } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      alert(xhr.responseText);
      document.getElementById("addOperation").disabled = false;
      document.getElementById("checkUpdatePossible").disabled = true;
    }
  };
  xhr.send(JSON.stringify(payload));
}
function loadProxyProviderInSelect() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/proxyList");
  xhr.send();
  var jsonResp;

  xhr.onload = function () {
    if (xhr.status != 200) {
      alert(`Error ${xhr.status}: ${xhr.statusText}`);
    } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      jsonResp = JSON.parse(xhr.responseText);
      var rowCount = jsonResp.length;
      var select = document.getElementById("select_proxy_provider");
      for (var i = 0; i < rowCount; i++) {
        select.innerHTML =
          select.innerHTML +
          '<option value="' +
          jsonResp[i].proxy_list_id +
          '">' +
          jsonResp[i].url +
          "</option>";
      }
    }
  };
}
function loadTestURLInSelect() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/testURL");
  xhr.send();
  var jsonResp;

  xhr.onload = function () {
    if (xhr.status != 200) {
      alert(`Error ${xhr.status}: ${xhr.statusText}`);
    } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      jsonResp = JSON.parse(xhr.responseText);
      var rowCount = jsonResp.length;
      var select = document.getElementById("select_test_url");
      for (var i = 0; i < rowCount; i++) {
        select.innerHTML =
          select.innerHTML +
          '<option value="' +
          jsonResp[i].test_url_id +
          '">' +
          jsonResp[i].test_url +
          "</option>";
      }
    }
  };
}
function loadUpdateSummary() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/updateSummary");
  xhr.send();
  var jsonResp;

  xhr.onload = function () {
    if (xhr.status != 200) {
      alert(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
      jsonResp = JSON.parse(xhr.responseText);
      var rowCount = jsonResp.length;
      var exitingRows = document.getElementById("table_update_summary").rows
        .length;
      var rowsToCreate = rowCount - exitingRows;
      var table = document.getElementById("table_update_summary");
      if (rowsToCreate >= 1) {
        for (var i = 0; i < rowCount; i++) {
          var tr = document.createElement("tr");
          for (var j = 0; j <= 4; j++) {
            var td = document.createElement("td");
            tr.appendChild(td);
          }
          table.appendChild(tr);
        }

        for (var k = 0; k < rowsToCreate; k++) {
          //var td = document.createElement("td");
          var button = document.createElement("button");
          button.innerHTML = "X";
          button.addEventListener("click", function () {
            deleteUpdateSummary(this.parentElement.rowIndex);
          });
          button.setAttribute("class", "btn btn-link");
          // td.appendChild(button);
          table.rows[k].appendChild(button);
        }

        for (var i = 0; i < table.rows.length; i++) {
          table.rows[i].cells[0].innerHTML = jsonResp[i].update_summary_id;
          table.rows[i].cells[1].innerHTML = jsonResp[i].proxy_list;
          var d = new Date(jsonResp[i].start_time);
          table.rows[i].cells[2].innerHTML =
            d.getDate() +
            "-" +
            (d.getMonth() + 1) +
            "-" +
            d.getFullYear() +
            " " +
            d.getHours() +
            ":" +
            d.getMinutes();
          table.rows[i].cells[3].innerHTML = jsonResp[i].status;
        }
      } else {
        var tr = document.createElement("tr");
        tr.innerHTML = "No Data in Data Base";
        tr.setAttribute("colspan", "5");
        table.appendChild(tr);
      }
    }
  };
}
function loadTestSummary() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/testSummary");
  xhr.send();
  var jsonResp;

  xhr.onload = function () {
    if (xhr.status != 200) {
      alert(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
      jsonResp = JSON.parse(xhr.responseText);
      var rowCount = jsonResp.length;
      var exitingRows = document.getElementById("table_test_summary").rows
        .length;
      var rowsToCreate = rowCount - exitingRows;
      var table = document.getElementById("table_test_summary");
      if (rowsToCreate >= 1) {
        for (var i = 0; i < rowCount; i++) {
          var tr = document.createElement("tr");
          for (var j = 0; j <= 4; j++) {
            var td = document.createElement("td");
            tr.appendChild(td);
          }
          table.appendChild(tr);
        }

        for (var k = 0; k < rowsToCreate; k++) {
          //var td = document.createElement("td");
          var button = document.createElement("button");
          button.innerHTML = "X";
          button.addEventListener("click", function () {
            deleteTestSummary(this.parentElement.rowIndex);
          });
          button.setAttribute("class", "btn btn-link");
          // td.appendChild(button);
          table.rows[k].appendChild(button);
        }

        for (var i = 0; i < table.rows.length; i++) {
          table.rows[i].cells[0].innerHTML = jsonResp[i].test_summary_id;
          table.rows[i].cells[1].innerHTML = jsonResp[i].test_url;
          table.rows[i].cells[2].innerHTML = jsonResp[i].proxy_list;
          var d = new Date(jsonResp[i].start_time);
          table.rows[i].cells[3].innerHTML =
            d.getDate() +
            "-" +
            (d.getMonth() + 1) +
            "-" +
            d.getFullYear() +
            " " +
            d.getHours() +
            ":" +
            d.getMinutes();
          table.rows[i].cells[4].innerHTML = jsonResp[i].test_status;
        }
      } else {
        var tr = document.createElement("tr");
        tr.innerHTML = "No Data in Data Base";
        tr.setAttribute("colspan", "5");
        table.appendChild(tr);
      }
    }
  };
}
function loadTestURL() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/testURL");
  xhr.send();
  var jsonResp;

  xhr.onload = function () {
    if (xhr.status != 200) {
      alert(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
      jsonResp = JSON.parse(xhr.responseText);
      var rowCount = jsonResp.length;
      var exitingRows = document.getElementById("table_test_url").rows.length;
      var rowsToCreate = rowCount - exitingRows;
      var table = document.getElementById("table_test_url");
      if (rowsToCreate >= 1) {
        for (var i = 0; i < rowCount; i++) {
          var tr = document.createElement("tr");
          for (var j = 0; j <= 1; j++) {
            var td = document.createElement("td");
            tr.appendChild(td);
          }
          table.appendChild(tr);
        }

        for (var k = 0; k < rowsToCreate; k++) {
          //var td = document.createElement("td");
          var button = document.createElement("button");
          button.innerHTML = "X";
          button.addEventListener("click", function () {
            deleteTestURL(this.parentElement.rowIndex);
          });
          button.setAttribute("class", "btn btn-link");
          // td.appendChild(button);
          table.rows[k].appendChild(button);
        }

        for (var i = 0; i < table.rows.length; i++) {
          table.rows[i].cells[0].innerHTML = jsonResp[i].test_url_id;
          table.rows[i].cells[1].innerHTML = jsonResp[i].test_url;
        }
      } else {
        var tr = document.createElement("tr");
        tr.innerHTML = "No Data in Data Base";
        tr.setAttribute("colspan", "5");
        table.appendChild(tr);
      }
    }
  };
}
function loadProxyList() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/proxyList");
  xhr.send();
  var jsonResp;

  xhr.onload = function () {
    if (xhr.status != 200) {
      alert(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
      jsonResp = JSON.parse(xhr.responseText);
      var rowCount = jsonResp.length;
      var exitingRows = document.getElementById("table_proxy_list").rows.length;
      var rowsToCreate = rowCount - exitingRows;
      var table = document.getElementById("table_proxy_list");
      if (rowsToCreate >= 1) {
        for (var i = 0; i < rowCount; i++) {
          var tr = document.createElement("tr");
          for (var j = 0; j <= 6; j++) {
            var td = document.createElement("td");
            tr.appendChild(td);
          }
          table.appendChild(tr);
        }

        for (var k = 0; k < rowsToCreate; k++) {
          //var td = document.createElement("td");
          var button = document.createElement("button");
          button.innerHTML = "X";
          button.addEventListener("click", function () {
            deleteProxyList(this.parentElement.rowIndex);
          });
          button.setAttribute("class", "btn btn-link");
          // td.appendChild(button);
          table.rows[k].appendChild(button);
        }

        for (var i = 0; i < table.rows.length; i++) {
          table.rows[i].cells[0].innerHTML = jsonResp[i].proxy_list_id;
          table.rows[i].cells[1].innerHTML = jsonResp[i].url;
          table.rows[i].cells[2].innerHTML = jsonResp[i].extraction_type;
          var d = new Date(jsonResp[i].last_success_update);
          table.rows[i].cells[3].innerHTML =
            d.getDate() +
            "-" +
            (d.getMonth() + 1) +
            "-" +
            d.getFullYear() +
            " " +
            d.getHours() +
            ":" +
            d.getMinutes();

          d = new Date(jsonResp[i].last_update_attempt);
          table.rows[i].cells[4].innerHTML =
            d.getDate() +
            "-" +
            (d.getMonth() + 1) +
            "-" +
            d.getFullYear() +
            " " +
            d.getHours() +
            ":" +
            d.getMinutes();
          table.rows[i].cells[5].innerHTML = jsonResp[i].test_url_id;
        }
      } else {
        var tr = document.createElement("tr");
        tr.innerHTML = "No Data in Data Base";
        tr.setAttribute("colspan", "5");
        table.appendChild(tr);
      }
    }
  };
}

function loadProxies() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/proxy");
  xhr.send();
  var jsonResp;

  xhr.onload = function () {
    if (xhr.status != 200) {
      alert(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
      jsonResp = JSON.parse(xhr.responseText);
      var rowCount = jsonResp.length;
      var table = document.getElementById("table_proxy");
      var exitingRows = document.getElementById("table_proxy").rows.length;
      var rowsToCreate = rowCount - exitingRows;
      if (rowsToCreate >= 1) {
        //Creating empty rows
        for (var i = 0; i < rowsToCreate; i++) {
          var tr = document.createElement("tr");
          for (var j = 0; j <= 9; j++) {
            var td = document.createElement("td");
            tr.appendChild(td);
          }
          table.appendChild(tr);
        }

        // Inserting data from JSON response
        for (var i = 0; i < table.rows.length; i++) {
          table.rows[i].cells[0].innerHTML = jsonResp[i].proxy_id;
          table.rows[i].cells[1].innerHTML = jsonResp[i].ip;
          table.rows[i].cells[2].innerHTML = jsonResp[i].port;
          var d = new Date(jsonResp[i].last_test_success);
          table.rows[i].cells[3].innerHTML =
            d.getDate() +
            "-" +
            (d.getMonth() + 1) +
            "-" +
            d.getFullYear() +
            " " +
            d.getHours() +
            ":" +
            d.getMinutes();

          d = new Date(jsonResp[i].last_found_in_list);
          table.rows[i].cells[4].innerHTML =
            d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

          d = new Date(jsonResp[i].first_found_in_list);
          table.rows[i].cells[5].innerHTML =
            d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
          table.rows[i].cells[6].innerHTML = jsonResp[i].proxy_list_id;
          table.rows[i].cells[7].innerHTML = jsonResp[i].test_result;
          table.rows[i].cells[8].innerHTML = jsonResp[i].anonymity;
        }
      } else {
        var tr = document.createElement("tr");
        tr.innerHTML = "No Data in Data Base";
        tr.setAttribute("colspan", "7");
        table.appendChild(tr);
      }
    }
  };
}

function addTestURL() {
  var test_url = document.getElementById("input_test_url").value;

  // Insert to the logic to ignore if URL is empty
  if (true) {
    var payload = { test_url: test_url };
    //console.log(JSON.stringify(payload));

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/testURL", true);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 201) {
        alert("New Test URL is added");
        location.reload();
      } else if (
        this.readyState === XMLHttpRequest.DONE &&
        this.status === 400
      ) {
        alert(`Unable to add Test URL ` + `\nError : ${xhr.responseText}`);
      }
    };
    xhr.send(JSON.stringify(payload));
  }
}

function addOperation() {
  var operation = document.getElementById("select_operation").value;
  if (operation === "Test") {
    var testURL = document.getElementById("select_test_url").options[
      document.getElementById("select_test_url").selectedIndex
    ].text;
    var proxyProvider = document.getElementById("select_proxy_provider")
      .options[document.getElementById("select_proxy_provider").selectedIndex]
      .text;
    var proxyProviderID = document.getElementById("select_proxy_provider")
      .value;
    var payload = {
      test_url: testURL,
      proxy_list: proxyProvider,
      proxy_list_id: proxyProviderID,
    };
    console.log(JSON.stringify(payload));
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/testProxy", true);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 202) {
        alert("Request for Test is posted");
        location.reload();
      } else if (
        this.readyState === XMLHttpRequest.DONE &&
        this.status === 400
      ) {
        alert(`Unable to post test request` + `\nError : ${xhr.responseText}`);
      }
    };
    xhr.send(JSON.stringify(payload));
  } else {
    var proxyProvider = document.getElementById("select_proxy_provider")
      .options[document.getElementById("select_proxy_provider").selectedIndex]
      .text;
    var proxyProviderID = document.getElementById("select_proxy_provider")
      .value;
    var payload = {
      proxy_list: proxyProvider,
      proxy_list_id: proxyProviderID,
    };
    console.log(JSON.stringify(payload));
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/updateProxyList", true);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        alert("Request for Update is posted");
        location.reload();
      } else if (
        this.readyState === XMLHttpRequest.DONE &&
        this.status === 400
      ) {
        alert(
          `Unable to post update request` + `\nError : ${xhr.responseText}`
        );
      }
    };
    xhr.send(JSON.stringify(payload));
  }
}

function addProxyList() {
  var url = document.getElementById("url").value;
  var extraction = document.getElementById("extraction").value;
  var update_time = document.getElementById("update_time").value;
  var age = document.getElementById("age").value;
  var test_url = document.getElementById("select_test_url").value;
  // Insert to the logic to ignore if URL is empty
  if (true) {
    var payload = {
      url: url,
      extraction_type: extraction,
      update_time: update_time,
      age: age,
    };
    console.log(JSON.stringify(payload));

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/proxyList", true);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 201) {
        alert("New Proxy List is added");
        location.reload();
      } else if (
        this.readyState === XMLHttpRequest.DONE &&
        this.status === 400
      ) {
        alert(`Unable to add proxy list` + `\nError : ${xhr.responseText}`);
      }
    };
    xhr.send(JSON.stringify(payload));
  }
}
function deleteUpdateSummary(testSummaryRow) {
  var table = document.getElementById("table_update_summary");
  table.rows.length;
  var update_summary_id = table.rows[testSummaryRow - 1].cells[0].innerHTML;
  if (confirm("Do you still want to delete the update summary ?")) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/updateSummary/" + update_summary_id, true);

    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        alert("Update Summary is Deleted with ID " + update_summary_id);
        location.reload();
      } else if (
        this.readyState === XMLHttpRequest.DONE &&
        this.status === 400
      ) {
        alert(
          `Unable to delete update summary with ID: ${update_summary_id}` +
            `\nError : ${xhr.responseText}`
        );
      }
    };
    xhr.send();
  }
}

function deleteTestSummary(testSummaryRow) {
  var table = document.getElementById("table_test_summary");
  table.rows.length;
  var test_summary_id = table.rows[testSummaryRow - 1].cells[0].innerHTML;
  if (confirm("Do you still want to delete the test summary ?")) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/testSummary/" + test_summary_id, true);

    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        alert("Test Summary is Deleted with ID " + test_summary_id);
        location.reload();
      } else if (
        this.readyState === XMLHttpRequest.DONE &&
        this.status === 400
      ) {
        alert(
          `Unable to delete test summary with ID: ${test_summary_id}` +
            `\nError : ${xhr.responseText}`
        );
      }
    };
    xhr.send();
  }
}
function deleteTestURL(testURLRow) {
  var table = document.getElementById("table_test_url");
  table.rows.length;
  var test_url_id = table.rows[testURLRow - 1].cells[0].innerHTML;
  if (confirm("Do you still want to delete the test url ?")) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/testURL/" + test_url_id, true);

    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        alert("Test URL is Deleted with ID " + test_url_id);
        location.reload();
      } else if (
        this.readyState === XMLHttpRequest.DONE &&
        this.status === 400
      ) {
        alert(
          `Unable to delete test Uurl with ID: ${test_url_id}` +
            `\nError : ${xhr.responseText}`
        );
      }
    };
    xhr.send();
  }
}
function deleteProxyList(proxyListRow) {
  console.log(proxyListRow);
  var table = document.getElementById("table_proxy_list");
  table.rows.length;
  var proxy_list_id = table.rows[proxyListRow - 1].cells[0].innerHTML;

  if (
    confirm(
      "This will delete all the proxies associated with this proxy list , Do you still want to continue ?"
    )
  ) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/proxyList/" + proxy_list_id, true);

    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        alert("Proxy List is Deleted with ID " + proxy_list_id);
        location.reload();
      } else if (
        this.readyState === XMLHttpRequest.DONE &&
        this.status === 400
      ) {
        alert(
          `Unable to delete proxy list with ID: ${proxy_list_id}` +
            `\nError : ${xhr.responseText}`
        );
      }
    };
    xhr.send();
  }
}

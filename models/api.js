const fs = require("fs");

exports.fetchEndpoints = () => {
  return new Promise(function(resolve, reject) {
    fs.readFile("./endpoints.json", (err, endpoints) => {
      const parsedEndpoints = JSON.parse(endpoints);
      err ? reject(err) : resolve(parsedEndpoints);
    });
  });
};

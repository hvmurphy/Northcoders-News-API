const connection = require("../db/connection");
const fs = require("fs");

exports.fetchEndpoints = () => {
  return new Promise(function(resolve, reject) {
    fs.readFile(
      "/home/holly/Desktop/Northcoders/be-nc-news/endpoints.json",
      (err, endpoints) => {
        const parsedEndpoints = JSON.parse(endpoints);
        err ? reject(err) : resolve(parsedEndpoints);
      }
    );
  });
};

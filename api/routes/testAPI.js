var express = require('express');
var router = express.Router();

const Papa = require('papaparse');
const fs = require('fs');
const csvDataPath = './data/';

function CSVtoJSON(filename) {
    let JSONObject = {};
    let csvFilePath = csvDataPath + filename;
    let csvFile = fs.readFileSync(csvFilePath, 'utf8');

    Papa.parse(csvFile, {
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
            JSONObject.data = results.data;
            JSONObject.errors = results.errors;
            JSONObject.meta = results.meta;
        }
    });

    return JSONObject;
}

const checkpoints = CSVtoJSON('checkpoints.csv');
const trackings = CSVtoJSON('trackings.csv');

router.get('/', function (req, res, next) {
    res.send('API is working properly');
});

module.exports = router;

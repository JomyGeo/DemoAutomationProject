 const Formatter = require('cucumber-json-report-formatter').Formatter;

const formatter = new Formatter();
const sourceFile = "./cucumber-messages.ndjson"
const outputFile = "./formatted-json/cucumber-report.json"

formatter.parseCucumberJson(sourceFile, outputFile);







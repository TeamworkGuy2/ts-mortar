/// <reference path="./tsDefinitions/node/node.d.ts" />
/// <reference path="./tsDefinitions/node/node-modules.d.ts" />
/// <reference path="./tsDefinitions/qunit.d.ts" />
var gutil = require("gulp-util");
var testRunner = require("qunit");


function callback() {
    gutil.log("done a test: " + JSON.stringify(arguments));
}


testRunner.setup({
    log: {
        errors: true,
        tests: true,
        summary: true,
        globalSummary: true,
        coverage: true,
        globalCoverage: true,
        testing: true
    }
});


testRunner.run({
    code: "./utils/Arrays",
    tests: "./test/utils/Arrays.js"
}, callback);


testRunner.run({
    code: "./utils/Functions",
    tests: "./test/utils/Functions.js"
}, callback);


testRunner.run({
    code: "./utils/Numbers",
    tests: "./test/utils/Numbers.js"
}, callback);


testRunner.run({
    code: "./utils/Strings",
    tests: "./test/utils/Strings.js"
}, callback);

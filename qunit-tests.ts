/// <reference path="./definitions/node/node.d.ts" />
/// <reference path="./definitions/node/node-modules-custom.d.ts" />
/// <reference path="./definitions/lib/qunit.d.ts" />
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
    tests: "./test/utils/ArraysTest.js"
}, callback);


testRunner.run({
    code: "./utils/EnumCreator",
    tests: "./test/utils/EnumCreatorTest.js"
}, callback);


testRunner.run({
    code: "./utils/Functions",
    tests: "./test/utils/FunctionsTest.js"
}, callback);


testRunner.run({
    code: "./utils/Numbers",
    tests: "./test/utils/NumbersTest.js"
}, callback);


testRunner.run({
    code: "./utils/Objects",
    tests: "./test/utils/ObjectsTest.js"
}, callback);


testRunner.run({
    code: "./utils/Strings",
    tests: "./test/utils/StringsTest.js"
}, callback);


testRunner.run({
    code: "./date-time/DateTimes",
    tests: "./test/date-time/DateTimesTest.js"
}, callback);

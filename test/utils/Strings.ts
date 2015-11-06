//import QUnit = require("qunit"); // implicitly setup by 'qunit-tests' in root of project, run using node.js
import Strings = require("../../../ts-mortar/utils/Strings");


QUnit.module("Strings", {
});


QUnit.test("endsWith", function endsWithTest(sr) {
    var res1 = Strings.endsWith("blue", "e");
    sr.equal(res1, true);

    var res2 = Strings.endsWith("blue", "ee");
    sr.equal(res2, false);

    var res3 = Strings.endsWith("strstr", "rstr");
    sr.equal(res3, true);

    var res4 = Strings.endsWith("strstr", "strs");
    sr.equal(res4, false);
});


QUnit.test("isNullOrEmpty", function isNullOrEmptyTest(sr) {
    var res1 = Strings.isNullOrEmpty("");
    sr.equal(res1, true);

    var res2 = Strings.isNullOrEmpty(null);
    sr.equal(res2, true);

    var res3 = Strings.isNullOrEmpty(" ");
    sr.equal(res3, false);

    var res4 = Strings.isNullOrEmpty("abc");
    sr.equal(res4, false);
});


QUnit.test("isNullOrWhiteSpace", function isNullOrWhiteSpaceTest(sr) {
    var res1 = Strings.isNullOrWhiteSpace("");
    sr.equal(res1, true);

    var res2 = Strings.isNullOrWhiteSpace(null);
    sr.equal(res2, true);

    var res3 = Strings.isNullOrWhiteSpace(" ");
    sr.equal(res3, true);

    var res4 = Strings.isNullOrWhiteSpace("abc");
    sr.equal(res4, false);
});


QUnit.test("isCharAtDigit", function isCharAtDigitTest(sr) {
    var str = "1.2%";
    var expected = [true, false, true, false];

    for (var i = 0, size = str.length; i < size; i++) {
        var res = Strings.isCharAtDigit(str, i);
        sr.equal(res, expected[i], i + ". '" + str.substr(i, 1) + "'");
    }
});


QUnit.test("isDigit", function isDigitTest(sr) {
    var str = "1.2%";
    var expected = [true, false, true, false];

    for (var i = 0, size = str.length; i < size; i++) {
        var res = Strings.isDigit(str.substr(i, 1));
        sr.equal(res, expected[i], i + ". '" + str.substr(i, 1) + "'");
    }

    var res2 = Strings.isDigit("123");
    sr.equal(res2, true);
});


QUnit.test("isCharAtUpperCase", function isCharAtUpperCaseTest(sr) {
    var str = "AbCd";
    var expected = [true, false, true, false];

    for (var i = 0, size = str.length; i < size; i++) {
        var res = Strings.isCharAtUpperCase(str, i);
        sr.equal(res, expected[i], i + ". '" + str.substr(i, 1) + "'");
    }
});


QUnit.test("isCharAtLowerCase", function isCharAtLowerCaseTest(sr) {
    var str = "aBcD";
    var expected = [true, false, true, false];

    for (var i = 0, size = str.length; i < size; i++) {
        var res = Strings.isCharAtLowerCase(str, i);
        sr.equal(res, expected[i], i + ". '" + str.substr(i, 1) + "'");
    }
});


QUnit.test("looseEqual", function looseEqualTest(sr) {
    var res1 = Strings.looseEqual(" Abc", "ABC");
    sr.equal(res1, true);

    var res2 = Strings.looseEqual(" abc", "ABC\t");
    sr.equal(res2, true);

    var res3 = Strings.looseEqual(" \n\n", "\t");
    sr.equal(res3, true);

    var res4 = Strings.looseEqual(" \na\n", "A\t");
    sr.equal(res4, true);
});


QUnit.test("padZeroLeft", function padZeroLeftTest(sr) {
    var res1 = Strings.padZeroLeft(123, 5);
    sr.equal(res1, "00123");

    var res2 = Strings.padZeroLeft(123, 6);
    sr.equal(res2, "000123");

    var res2 = Strings.padZeroLeft(123, 3);
    sr.equal(res2, "123");

});


QUnit.test("padLeft", function padLeftTest(sr) {
    var res1 = Strings.padLeft(1.2, 5, " ");
    sr.equal(res1, "  1.2");

    var res2 = Strings.padLeft(1.2, 6, "-");
    sr.equal(res2, "---1.2");

    var res2 = Strings.padLeft(1.2, 3, "-");
    sr.equal(res2, "1.2");
});


QUnit.test("padRight", function padRightTest(sr) {
    var res1 = Strings.padRight(1.2, 5, " ");
    sr.equal(res1, "1.2  ");

    var res2 = Strings.padRight(1.2, 6, "-");
    sr.equal(res2, "1.2---");

    var res2 = Strings.padRight(1.2, 3, "-");
    sr.equal(res2, "1.2");
});


QUnit.test("removeLeading", function removeLeadingTest(sr) {
    var res1 = Strings.removeLeading("stubstubAlpha", "stub", true);
    sr.equal(res1, "Alpha");

    var res2 = Strings.removeLeading("---", "-", false)
    sr.equal(res2, "--");
});


QUnit.test("removeTrailing", function removeTrailingTest(sr) {
    var res1 = Strings.removeTrailing("alphaPiePiePie", "Pie", true);
    sr.equal(res1, "alpha");

    var res2 = Strings.removeTrailing("---", "-", false)
    sr.equal(res2, "--");
});


QUnit.test("replaceAll", function replaceAllTest(sr) {
    var res1 = Strings.replaceAll("cat in the hat", "at", "ab");
    sr.equal(res1, "cab in the hab");
});

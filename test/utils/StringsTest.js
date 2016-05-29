"use strict";
var chai = require("chai");
var Strings = require("../../../ts-mortar/utils/Strings");
var asr = chai.assert;
suite("Strings", function StringsTest() {
    test("endsWith", function endsWithTest() {
        var res1 = Strings.endsWith("blue", "e");
        asr.equal(res1, true);
        var res2 = Strings.endsWith("blue", "ee");
        asr.equal(res2, false);
        var res3 = Strings.endsWith("strstr", "rstr");
        asr.equal(res3, true);
        var res4 = Strings.endsWith("strstr", "strs");
        asr.equal(res4, false);
    });
    test("isNullOrEmpty", function isNullOrEmptyTest() {
        var res1 = Strings.isNullOrEmpty("");
        asr.equal(res1, true);
        var res2 = Strings.isNullOrEmpty(null);
        asr.equal(res2, true);
        var res3 = Strings.isNullOrEmpty(" ");
        asr.equal(res3, false);
        var res4 = Strings.isNullOrEmpty("abc");
        asr.equal(res4, false);
    });
    test("isNullOrWhiteSpace", function isNullOrWhiteSpaceTest() {
        var res1 = Strings.isNullOrWhiteSpace("");
        asr.equal(res1, true);
        var res2 = Strings.isNullOrWhiteSpace(null);
        asr.equal(res2, true);
        var res3 = Strings.isNullOrWhiteSpace(" ");
        asr.equal(res3, true);
        var res4 = Strings.isNullOrWhiteSpace("abc");
        asr.equal(res4, false);
    });
    test("isCharAtDigit", function isCharAtDigitTest() {
        var str = "1.2%";
        var expected = [true, false, true, false];
        for (var i = 0, size = str.length; i < size; i++) {
            var res = Strings.isCharAtDigit(str, i);
            asr.equal(res, expected[i], i + ". '" + str.substr(i, 1) + "'");
        }
    });
    test("isDigit", function isDigitTest() {
        var str = "1.2%";
        var expected = [true, false, true, false];
        for (var i = 0, size = str.length; i < size; i++) {
            var res = Strings.isDigit(str.substr(i, 1));
            asr.equal(res, expected[i], i + ". '" + str.substr(i, 1) + "'");
        }
        var res2 = Strings.isDigit("123");
        asr.equal(res2, true);
    });
    test("isCharAtUpperCase", function isCharAtUpperCaseTest() {
        var str = "AbCd";
        var expected = [true, false, true, false];
        for (var i = 0, size = str.length; i < size; i++) {
            var res = Strings.isCharAtUpperCase(str, i);
            asr.equal(res, expected[i], i + ". '" + str.substr(i, 1) + "'");
        }
    });
    test("isCharAtLowerCase", function isCharAtLowerCaseTest() {
        var str = "aBcD";
        var expected = [true, false, true, false];
        for (var i = 0, size = str.length; i < size; i++) {
            var res = Strings.isCharAtLowerCase(str, i);
            asr.equal(res, expected[i], i + ". '" + str.substr(i, 1) + "'");
        }
    });
    test("looseEqual", function looseEqualTest() {
        var res1 = Strings.looseEqual(" Abc", "ABC");
        asr.equal(res1, true);
        var res2 = Strings.looseEqual(" abc", "ABC\t");
        asr.equal(res2, true);
        var res3 = Strings.looseEqual(" \n\n", "\t");
        asr.equal(res3, true);
        var res4 = Strings.looseEqual(" \na\n", "A\t");
        asr.equal(res4, true);
    });
    test("clamp", function clampTest() {
        var inputs = ["123", "1234", "12345"];
        var expect = ["123", "1234", "1..."];
        for (var i = 0, size = inputs.length; i < size; i++) {
            var res = Strings.clamp(inputs[i], 4, "...");
            asr.equal(res, expect[i], "" + i);
        }
    });
    test("padZeroLeft", function padZeroLeftTest() {
        var res1 = Strings.padZeroLeft(123, 5);
        asr.equal(res1, "00123");
        var res2 = Strings.padZeroLeft(123, 6);
        asr.equal(res2, "000123");
        var res2 = Strings.padZeroLeft(123, 3);
        asr.equal(res2, "123");
    });
    test("padLeft", function padLeftTest() {
        var res1 = Strings.padLeft(1.2, 5, " ");
        asr.equal(res1, "  1.2");
        var res2 = Strings.padLeft(1.2, 6, "-");
        asr.equal(res2, "---1.2");
        var res2 = Strings.padLeft(1.2, 3, "-");
        asr.equal(res2, "1.2");
    });
    test("padRight", function padRightTest() {
        var res1 = Strings.padRight(1.2, 5, " ");
        asr.equal(res1, "1.2  ");
        var res2 = Strings.padRight(1.2, 6, "-");
        asr.equal(res2, "1.2---");
        var res2 = Strings.padRight(1.2, 3, "-");
        asr.equal(res2, "1.2");
    });
    test("removeLeading", function removeLeadingTest() {
        var res1 = Strings.removeLeading("stubstubAlpha", "stub", true);
        asr.equal(res1, "Alpha");
        var res2 = Strings.removeLeading("---", "-", false);
        asr.equal(res2, "--");
    });
    test("removeTrailing", function removeTrailingTest() {
        var res1 = Strings.removeTrailing("alphaPiePiePie", "Pie", true);
        asr.equal(res1, "alpha");
        var res2 = Strings.removeTrailing("---", "-", false);
        asr.equal(res2, "--");
    });
    test("replaceAll", function replaceAllTest() {
        var res1 = Strings.replaceAll("cat in the hat", "at", "ab");
        asr.equal(res1, "cab in the hab");
    });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var Strings = require("../../utils/Strings");
var asr = chai.assert;
suite("Strings", function StringsTest() {
    test("endsWith", function endsWithTest() {
        asr.equal(Strings.endsWith("blue", "e"), true);
        asr.equal(Strings.endsWith("blue", "ee"), false);
        asr.equal(Strings.endsWith("strstr", "rstr"), true);
        asr.equal(Strings.endsWith("strstr", "strs"), false);
    });
    test("isNullOrEmpty", function isNullOrEmptyTest() {
        asr.equal(Strings.isNullOrEmpty(""), true);
        asr.equal(Strings.isNullOrEmpty(null), true);
        asr.equal(Strings.isNullOrEmpty(" "), false);
        asr.equal(Strings.isNullOrEmpty("abc"), false);
    });
    test("isNullOrWhiteSpace", function isNullOrWhiteSpaceTest() {
        asr.equal(Strings.isNullOrWhiteSpace(""), true);
        asr.equal(Strings.isNullOrWhiteSpace(null), true);
        asr.equal(Strings.isNullOrWhiteSpace(" "), true);
        asr.equal(Strings.isNullOrWhiteSpace("abc"), false);
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
        asr.equal(Strings.looseEqual(" Abc", "ABC"), true);
        asr.equal(Strings.looseEqual(" abc", "ABC\t"), true);
        asr.equal(Strings.looseEqual(" \n\n", "\t"), true);
        asr.equal(Strings.looseEqual(" \na\n", "A\t"), true);
    });
    test("clamp", function clampTest() {
        var data = [{
                input: ["123", "1234", "12345"],
                expect: ["123", "1234", "1..."],
                maxLength: 4
            }, {
                input: ["12", "123", "1234"],
                expect: ["12", "...", "..."],
                maxLength: 2,
            }];
        for (var i = 0, size = data.length; i < size; i++) {
            var inputs = data[i].input;
            var expect = data[i].expect;
            var maxLen = data[i].maxLength;
            for (var j = 0, sizeJ = inputs.length; j < sizeJ; j++) {
                var res = Strings.clamp(inputs[j], maxLen, "...");
                asr.equal(res, expect[j], "" + j);
            }
        }
    });
    test("padZeroStart", function padZeroStartTest() {
        asr.equal(Strings.padZeroStart(123, 5), "00123");
        asr.equal(Strings.padZeroStart(123, 6), "000123");
        asr.equal(Strings.padZeroStart(123, 3), "123");
        asr.equal(Strings.padZeroStart(123, 0), "123");
    });
    test("padStart", function padStartTest() {
        asr.equal(Strings.padStart(1.2, 5, " "), "  1.2");
        asr.equal(Strings.padStart(1.2, 6, "-"), "---1.2");
        asr.equal(Strings.padStart(1.2, 3, "-"), "1.2");
    });
    test("padEnd", function padEndTest() {
        asr.equal(Strings.padEnd(1.2, 5, " "), "1.2  ");
        asr.equal(Strings.padEnd(1.2, 6, "-"), "1.2---");
        asr.equal(Strings.padEnd(1.2, 3, "-"), "1.2");
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

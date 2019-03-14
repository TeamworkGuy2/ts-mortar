import chai = require("chai");
import mocha = require("mocha");
import Strings = require("../../utils/Strings");

var asr = chai.assert;


suite("Strings", function StringsTest() {

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

        asr.isTrue(Strings.isCharAtDigit("123", 1));
        asr.isTrue(Strings.isCharAtDigit("0", 0));
        asr.isFalse(Strings.isCharAtDigit("", 0));
        asr.isFalse(Strings.isCharAtDigit("0A", 1));
        asr.isFalse(Strings.isCharAtDigit("0", -1));
        asr.isFalse(Strings.isCharAtDigit("0", 1));
    });


    test("isDigit", function isDigitTest() {
        var str = "1.2%";
        var expected = [true, false, true, false];

        for (var i = 0, size = str.length; i < size; i++) {
            var res = Strings.isDigit(str.substr(i, 1));
            asr.equal(res, expected[i], i + ". '" + str.substr(i, 1) + "'");
        }

        asr.isTrue(Strings.isDigit("123"));
        asr.isTrue(Strings.isDigit("0"));
        asr.isFalse(Strings.isDigit(""));
        asr.isFalse(Strings.isDigit("0A"));
    });


    test("isCharAtUpperCase", function isCharAtUpperCaseTest() {
        var str = "AbCd";
        var expected = [true, false, true, false];

        for (var i = 0, size = str.length; i < size; i++) {
            var res = Strings.isCharAtUpperCase(str, i);
            asr.equal(res, expected[i], i + ". '" + str.substr(i, 1) + "'");
        }

        asr.isFalse(Strings.isCharAtUpperCase("A", -1));
        asr.isFalse(Strings.isCharAtUpperCase("A", 1));
        asr.isFalse(Strings.isCharAtUpperCase("A", Infinity));
    });


    test("isCharAtLowerCase", function isCharAtLowerCaseTest() {
        var str = "aBcD";
        var expected = [true, false, true, false];

        for (var i = 0, size = str.length; i < size; i++) {
            var res = Strings.isCharAtLowerCase(str, i);
            asr.equal(res, expected[i], i + ". '" + str.substr(i, 1) + "'");
        }

        asr.isFalse(Strings.isCharAtLowerCase("a", -1));
        asr.isFalse(Strings.isCharAtLowerCase("a", 1));
        asr.isFalse(Strings.isCharAtLowerCase("a", Infinity));
    });


    test("clamp", function clampTest() {
        var data = [{
            input: ["123", "1234", "12345"],
            expect: ["123", "1234", "1..."],
            maxLength: 4
        }, {
            input: <string[]>["12", "123", "1234", " ", null, undefined],
            expect: ["12", "...", "...", " ", "", ""],
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


    test("looseEqual", function looseEqualTest() {
        asr.equal(Strings.looseEqual(" Abc", "ABC"), true);
        asr.equal(Strings.looseEqual(" abc", "ABC\t"), true);
        asr.equal(Strings.looseEqual(" \n\n", "\t"), true);
        asr.equal(Strings.looseEqual(" \na\n", "A\t"), true);
    });


    test("padStart", function padStartTest() {
        asr.equal(Strings.padStart(123, 5, '0'), "00123");
        asr.equal(Strings.padStart(123, 6, '0'), "000123");
        asr.equal(Strings.padStart(123, 3, '0'), "123");
        asr.equal(Strings.padStart(123, 0, '0'), "123");
        asr.equal(Strings.padStart(1.2, 5, " "), "  1.2");
        asr.equal(Strings.padStart(1.2, 6, "-"), "---1.2");
        asr.equal(Strings.padStart(1.2, 3, "-"), "1.2");
        asr.equal(Strings.padStart("A", 3, "a"), "aaA");
    });


    test("padEnd", function padEndTest() {
        asr.equal(Strings.padEnd(1.2, 5, " "), "1.2  ");
        asr.equal(Strings.padEnd(1.2, 6, "-"), "1.2---");
        asr.equal(Strings.padEnd(1.2, 3, "-"), "1.2");
        asr.equal(Strings.padEnd("A", 3, "a"), "Aaa");
    });


    test("removeLeading", function removeLeadingTest() {
        var res1 = Strings.removeLeading("stubstubAlpha", "stub", true);
        asr.equal(res1, "Alpha");

        var res2 = Strings.removeLeading("---", "-", false)
        asr.equal(res2, "--");

        var res3 = Strings.removeLeading("AAA", "B", false)
        asr.equal(res3, "AAA");
    });


    test("removeTrailing", function removeTrailingTest() {
        var res1 = Strings.removeTrailing("alphaPiePiePie", "Pie", true);
        asr.equal(res1, "alpha");

        var res2 = Strings.removeTrailing("---", "-", false)
        asr.equal(res2, "--");

        var res3 = Strings.removeTrailing("AAA", "B", false)
        asr.equal(res3, "AAA");
    });


    test("replaceAll", function replaceAllTest() {
        var res1 = Strings.replaceAll("cat in the hat", "at", "ab");
        asr.equal(res1, "cab in the hab");

        var res2 = Strings.replaceAll("Super", "", "-");
        asr.equal(res2, "S-u-p-e-r");

        var res3 = Strings.replaceAll("NaN", "0", "1");
        asr.equal(res3, "NaN");
    });

});

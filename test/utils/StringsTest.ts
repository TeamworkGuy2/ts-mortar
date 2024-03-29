﻿import chai = require("chai");
import mocha = require("mocha");
import Strings = require("../../utils/Strings");

var asr = chai.assert;


suite("Strings", function StringsTest() {

    test("isNullOrEmpty", function () {
        asr.isTrue(Strings.isNullOrEmpty(""));
        asr.isTrue(Strings.isNullOrEmpty(null));
        asr.isFalse(Strings.isNullOrEmpty(" "));
        asr.isFalse(Strings.isNullOrEmpty("abc"));
    });


    test("isNullOrWhiteSpace", function () {
        asr.isTrue(Strings.isNullOrWhiteSpace(""));
        asr.isTrue(Strings.isNullOrWhiteSpace(null));
        asr.isTrue(Strings.isNullOrWhiteSpace(" "));
        asr.isFalse(Strings.isNullOrWhiteSpace("abc"));
    });


    test("notNullOrEmpty", function () {
        asr.isFalse(Strings.notNullOrEmpty(""));
        asr.isFalse(Strings.notNullOrEmpty(null));
        asr.isTrue(Strings.notNullOrEmpty(" "));
        asr.isTrue(Strings.notNullOrEmpty("abc"));
    });


    test("notNullOrWhiteSpace", function () {
        asr.isFalse(Strings.notNullOrWhiteSpace(""));
        asr.isFalse(Strings.notNullOrWhiteSpace(null));
        asr.isFalse(Strings.notNullOrWhiteSpace(" "));
        asr.isTrue(Strings.notNullOrWhiteSpace("abc"));
    });


    test("isCharAtDigit", function () {
        asr.isTrue (Strings.isCharAtDigit("1.2%", 0));
        asr.isFalse(Strings.isCharAtDigit("1.2%", 1));
        asr.isTrue (Strings.isCharAtDigit("1.2%", 2));
        asr.isFalse(Strings.isCharAtDigit("1.2%", 3));

        asr.isTrue(Strings.isCharAtDigit("123", 1));
        asr.isTrue(Strings.isCharAtDigit("0", 0));
        asr.isFalse(Strings.isCharAtDigit("", 0));
        asr.isFalse(Strings.isCharAtDigit("0A", 1));
        asr.isFalse(Strings.isCharAtDigit("0", -1));
        asr.isFalse(Strings.isCharAtDigit("0", 1));
        asr.isFalse(Strings.isCharAtDigit(" ", <any>null));
        asr.isFalse(Strings.isCharAtDigit(null, <any>null));
    });


    test("isDigit", function () {
        asr.isTrue(Strings.isDigit("5"));
        asr.isTrue(Strings.isDigit("123"));
        asr.isTrue(Strings.isDigit("0"));

        asr.isFalse(Strings.isDigit(" "));
        asr.isFalse(Strings.isDigit(""));
        asr.isFalse(Strings.isDigit("0A"));
        asr.isFalse(Strings.isDigit(null));
        asr.isFalse(Strings.isDigit(undefined));
    });


    test("isCharAtUpperCase", function () {
        asr.isTrue (Strings.isCharAtUpperCase("AbCd", 0));
        asr.isFalse(Strings.isCharAtUpperCase("AbCd", 1));
        asr.isTrue (Strings.isCharAtUpperCase("AbCd", 2));
        asr.isFalse(Strings.isCharAtUpperCase("AbCd", 3));

        asr.isFalse(Strings.isCharAtUpperCase("A", -1));
        asr.isFalse(Strings.isCharAtUpperCase("A", 1));
        asr.isFalse(Strings.isCharAtUpperCase("A", Infinity));
        asr.isFalse(Strings.isCharAtUpperCase(null, <any>null));
    });


    test("isCharAtLowerCase", function () {
        asr.isTrue (Strings.isCharAtLowerCase("aBcD", 0));
        asr.isFalse(Strings.isCharAtLowerCase("aBcD", 1));
        asr.isTrue (Strings.isCharAtLowerCase("aBcD", 2));
        asr.isFalse(Strings.isCharAtLowerCase("aBcD", 3));

        asr.isFalse(Strings.isCharAtLowerCase("a", -1));
        asr.isFalse(Strings.isCharAtLowerCase("a", 1));
        asr.isFalse(Strings.isCharAtLowerCase("a", Infinity));
        asr.isFalse(Strings.isCharAtLowerCase(null, <any>null));
    });


    test("truncate", function () {
        asr.equal(Strings.truncate("123"  , 4, "..."), "123");
        asr.equal(Strings.truncate("1234" , 4, "..."), "1234");
        asr.equal(Strings.truncate("12345", 4, "..."), "1...");

        asr.equal(Strings.truncate("12"     , 2, "..."), "12");
        asr.equal(Strings.truncate("123"    , 2, "..."), "...");
        asr.equal(Strings.truncate("1234"   , 2, "..."), "...");
        asr.equal(Strings.truncate(" "      , 2, "..."), " ");
        asr.equal(Strings.truncate(null     , 2, "..."), "");
        asr.equal(Strings.truncate(undefined, 2, "..."), "");
    });


    test("looseEqual", function () {
        asr.equal(Strings.looseEqual(" Abc", "ABC"), true);
        asr.equal(Strings.looseEqual(" abc", "ABC\t"), true);
        asr.equal(Strings.looseEqual(" \n\n", "\t"), true);
        asr.equal(Strings.looseEqual(" \na\n", "A\t"), true);
    });


    test("padStart", function () {
        asr.equal(Strings.padStart(123, 5, '0'), "00123");
        asr.equal(Strings.padStart(123, 6, '0'), "000123");
        asr.equal(Strings.padStart(123, 3, '0'), "123");
        asr.equal(Strings.padStart(123, 0, '0'), "123");
        asr.equal(Strings.padStart(1.2, 5, " "), "  1.2");
        asr.equal(Strings.padStart(1.2, 6, "-"), "---1.2");
        asr.equal(Strings.padStart(1.2, 3, "-"), "1.2");
        asr.equal(Strings.padStart("A", 3, "a"), "aaA");
    });


    test("padEnd", function () {
        asr.equal(Strings.padEnd(1.2, 5, " "), "1.2  ");
        asr.equal(Strings.padEnd(1.2, 6, "-"), "1.2---");
        asr.equal(Strings.padEnd(1.2, 3, "-"), "1.2");
        asr.equal(Strings.padEnd("A", 3, "a"), "Aaa");
    });


    test("removeLeading", function () {
        var res1 = Strings.removeLeading("stubstubAlpha", "stub", true);
        asr.equal(res1, "Alpha");

        var res2 = Strings.removeLeading("---", "-", false)
        asr.equal(res2, "--");

        var res3 = Strings.removeLeading("AAA", "B", false)
        asr.equal(res3, "AAA");
    });


    test("removeTrailing", function () {
        var res1 = Strings.removeTrailing("alphaPiePiePie", "Pie", true);
        asr.equal(res1, "alpha");

        var res2 = Strings.removeTrailing("---", "-", false)
        asr.equal(res2, "--");

        var res3 = Strings.removeTrailing("AAA", "B", false)
        asr.equal(res3, "AAA");
    });


    test("replaceAll", function () {
        var res1 = Strings.replaceAll("cat in the hat", "at", "ab");
        asr.equal(res1, "cab in the hab");

        var res2 = Strings.replaceAll("Super", "", "-");
        asr.equal(res2, "S-u-p-e-r");

        var res3 = Strings.replaceAll("NaN", "0", "1");
        asr.equal(res3, "NaN");
    });

});

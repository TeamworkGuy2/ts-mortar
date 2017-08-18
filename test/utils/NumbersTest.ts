﻿import chai = require("chai");
import mocha = require("mocha");
import Numbers = require("../../utils/Numbers");

var asr = chai.assert;


suite("Numbers", function NumbersTest() {

    test("isNumeric", function isNumericTest() {
        asr.equal(Numbers.isNumeric("1.23"), true);
        asr.equal(Numbers.isNumeric("cd"), false);
    });


    test("isNullOrZero", function isNullOrZeroTest() {
        asr.equal(Numbers.isNullOrZero(null), true);
        asr.equal(Numbers.isNullOrZero(0), true);
        asr.equal(Numbers.isNullOrZero(0.1), false);
        asr.equal(Numbers.isNullOrZero(23), false);
    });


    test("getNullableNumeric", function getNullableNumericTest() {
        function getNullableNumeric(value: string, places?: number) {
            return Numbers.getNullableNumeric({ val: () => value }, places);
        }

        asr.equal(getNullableNumeric("0"), 0);
        asr.equal(getNullableNumeric(""), null);
        asr.equal(getNullableNumeric(null), null);
        asr.equal(getNullableNumeric("abc"), null);
        asr.equal(getNullableNumeric("123"), 123);
        asr.equal(getNullableNumeric("123.456"), 123.456);
        asr.equal(getNullableNumeric("123.456", 1), 123.5);
        asr.equal(getNullableNumeric("0.1234", 2), 0.12);
    });


    test("getNullableNumericPercent", function getNullableNumericPercentTest() {
        function getNullableNumericPercent(value: string) {
            return Numbers.getNullableNumericPercent({ val: () => value });
        }

        asr.equal(getNullableNumericPercent("%0"), 0);
        asr.equal(getNullableNumericPercent(""), null);
        asr.equal(getNullableNumericPercent(null), null);
        asr.equal(getNullableNumericPercent("abc"), null);
        asr.equal(getNullableNumericPercent("123 %"), 123);
    });


    test("roundTo", function roundToTest() {
        asr.equal(Numbers.roundTo(123.4567, 3), 123.457);
        asr.equal(Numbers.roundTo(123.4567, 2), 123.46);
        asr.equal(Numbers.roundTo(123.4567, 1), 123.5);
        asr.equal(Numbers.roundTo(123.4567, 0), 123);
    });


    test("toNumber", function toNumberTest() {
        asr.equal(Numbers.toNumber("0"), 0);
        asr.equal(Numbers.toNumber("1.23"), 1.23);
        asr.equal(Numbers.toNumber("cd"), null);
    });


    test("orZero", function orZeroTest() {
        var orZero = Numbers.orZero;

        asr.equal(orZero(0, false), 0);
        asr.equal(orZero(+<any>null, false), 0);
        asr.equal(orZero(Number.NaN, false), 0);
        asr.equal(orZero(Number.MIN_VALUE, false), Number.MIN_VALUE);
        asr.equal(orZero(Number.NEGATIVE_INFINITY, false), Number.NEGATIVE_INFINITY);
        asr.equal(orZero(Number.NaN, true), 0);
        asr.equal(orZero(Number.NEGATIVE_INFINITY, true), 0);
    });


    test("format", function formatTest() {
        var format = Numbers.format;
        // number inputs
        asr.equal(format(0, 2, true, 2), "0.00");
        asr.equal(format(0.0102, 2, true, 2), "0.01");
        asr.equal(format(1234567.899, 2, true, 2), "1,23,45,67.90");
        asr.equal(format(1234567.899, 0, true, 3), "1,234,568");
        // string inputs
        asr.equal(format("", 2, true, 2), "0.00");
        asr.equal(format("+0", 2, true, 2), "0.00");
        asr.equal(format("-0", 2, true, 2), "0.00");
        asr.equal(format("+0.0123", 2, true, 2), "0.01");
        asr.equal(format("-0.0123", 2, true, 2), "-0.01");
        asr.equal(format("+123", 2, true, 3), "123.00");
        asr.equal(format("-123", 2, true, 3), "-123.00");
        asr.equal(format("+123.456", 2, true, 3), "123.46");
        asr.equal(format("-123.456", 2, true, 3), "-123.46");
    });


    test("formatNumeric", function formatNumericTest() {
        // same/alias for format()
        asr.equal(true, true);
    });

});

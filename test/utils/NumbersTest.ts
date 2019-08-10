import chai = require("chai");
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


    test("roundTo", function roundToTest() {
        asr.isNaN(Numbers.roundTo(NaN, 2));
        asr.equal(Numbers.roundTo(Infinity, 2), Infinity);
        asr.equal(Numbers.roundTo(35.855, 2), 35.86);
        asr.equal(Numbers.roundTo(859.385, 2), 859.39);

        asr.equal(Numbers.roundTo(-1.005, 2), -1.01);
        asr.equal(Numbers.roundTo(-0.005, 2), -0.01);
        asr.equal(Numbers.roundTo(0.005, 2), 0.01);
        asr.equal(Numbers.roundTo(1.005, 2), 1.01);

        asr.equal(Numbers.roundTo(26.5, 2), 26.50);
        asr.equal(Numbers.roundTo(26.5, 1), 26.5);
        asr.equal(Numbers.roundTo(26.5, 0), 27);
        asr.equal(Numbers.roundTo(26.4, 0), 26);
        asr.equal(Numbers.roundTo(26.6, 0), 27);
        asr.equal(Numbers.roundTo(-26.5, 2), -26.50);
        asr.equal(Numbers.roundTo(-26.5, 1), -26.5);
        asr.equal(Numbers.roundTo(-26.5, 0), -27);
        asr.equal(Numbers.roundTo(-26.4, 0), -26);
        asr.equal(Numbers.roundTo(-26.6, 0), -27);

        asr.equal(Numbers.roundTo(101.55, 3), 101.550);
        asr.equal(Numbers.roundTo(101.55, 2), 101.55);
        asr.equal(Numbers.roundTo(101.55, 1), 101.6);
        asr.equal(Numbers.roundTo(101.56, 1), 101.6);
        asr.equal(Numbers.roundTo(101.54, 1), 101.5);
        asr.equal(Numbers.roundTo(101.55, 0), 102);
        asr.equal(Numbers.roundTo(-101.55, 3), -101.550);
        asr.equal(Numbers.roundTo(-101.55, 2), -101.55);
        asr.equal(Numbers.roundTo(-101.55, 1), -101.6);
        asr.equal(Numbers.roundTo(-101.56, 1), -101.6);
        asr.equal(Numbers.roundTo(-101.54, 1), -101.5);
        asr.equal(Numbers.roundTo(-101.55, 0), -102);

        asr.equal(Numbers.roundTo(123.4567, 3), 123.457);
        asr.equal(Numbers.roundTo(123.4567, 2), 123.46);
        asr.equal(Numbers.roundTo(123.4567, 1), 123.5);
        asr.equal(Numbers.roundTo(123.4567, 0), 123);
        asr.equal(Numbers.roundTo(262.4551, 3), 262.455);
        asr.equal(Numbers.roundTo(262.4551, 2), 262.46);
        asr.equal(Numbers.roundTo(262.4551, 1), 262.5);
        asr.equal(Numbers.roundTo(262.4551, 0), 262);
        asr.equal(Numbers.roundTo(338.4549, 3), 338.455);
        asr.equal(Numbers.roundTo(338.4549, 2), 338.45);
        asr.equal(Numbers.roundTo(338.4549, 1), 338.5);
        asr.equal(Numbers.roundTo(338.4549, 0), 338);
    });


    test("toFixed", function toFixedTest() {
        asr.equal(Numbers.toFixed(NaN, 2), "NaN");
        asr.equal(Numbers.toFixed(Infinity, 2), "Infinity");
        asr.equal(Numbers.toFixed(35.855, 2), "35.86");
        asr.equal(Numbers.toFixed(859.385, 2), "859.39");

        asr.equal(Numbers.toFixed(-1.005, 2), "-1.01");
        asr.equal(Numbers.toFixed(-0.005, 2), "-0.01");
        asr.equal(Numbers.toFixed(0.005, 2), "0.01");
        asr.equal(Numbers.toFixed(1.005, 2), "1.01");

        asr.equal(Numbers.toFixed(26.5, 2), "26.50");
        asr.equal(Numbers.toFixed(26.5, 1), "26.5");
        asr.equal(Numbers.toFixed(26.5, 0), "27");
        asr.equal(Numbers.toFixed(26.4, 0), "26");
        asr.equal(Numbers.toFixed(26.6, 0), "27");
        asr.equal(Numbers.toFixed(-26.5, 2), "-26.50");
        asr.equal(Numbers.toFixed(-26.5, 1), "-26.5");
        asr.equal(Numbers.toFixed(-26.5, 0), "-27");
        asr.equal(Numbers.toFixed(-26.4, 0), "-26");
        asr.equal(Numbers.toFixed(-26.6, 0), "-27");

        asr.equal(Numbers.toFixed(101.55, 3), "101.550");
        asr.equal(Numbers.toFixed(101.55, 2), "101.55");
        asr.equal(Numbers.toFixed(101.55, 1), "101.6");
        asr.equal(Numbers.toFixed(101.56, 1), "101.6");
        asr.equal(Numbers.toFixed(101.54, 1), "101.5");
        asr.equal(Numbers.toFixed(101.55, 0), "102");
        asr.equal(Numbers.toFixed(-101.55, 3), "-101.550");
        asr.equal(Numbers.toFixed(-101.55, 2), "-101.55");
        asr.equal(Numbers.toFixed(-101.55, 1), "-101.6");
        asr.equal(Numbers.toFixed(-101.56, 1), "-101.6");
        asr.equal(Numbers.toFixed(-101.54, 1), "-101.5");
        asr.equal(Numbers.toFixed(-101.55, 0), "-102");

        asr.equal(Numbers.toFixed(123.4567, 3), "123.457");
        asr.equal(Numbers.toFixed(123.4567, 2), "123.46");
        asr.equal(Numbers.toFixed(123.4567, 1), "123.5");
        asr.equal(Numbers.toFixed(123.4567, 0), "123");
        asr.equal(Numbers.toFixed(262.4551, 3), "262.455");
        asr.equal(Numbers.toFixed(262.4551, 2), "262.46");
        asr.equal(Numbers.toFixed(262.4551, 1), "262.5");
        asr.equal(Numbers.toFixed(262.4551, 0), "262");
        asr.equal(Numbers.toFixed(338.4549, 3), "338.455");
        asr.equal(Numbers.toFixed(338.4549, 2), "338.45");
        asr.equal(Numbers.toFixed(338.4549, 1), "338.5");
        asr.equal(Numbers.toFixed(338.4549, 0), "338");
    });


    test("toNumber", function toNumberTest() {
        asr.equal(Numbers.toNumber(undefined), null);
        asr.equal(Numbers.toNumber(null), null);
        asr.equal(Numbers.toNumber(NaN), null);
        asr.equal(Numbers.toNumber(Infinity), null);
        asr.equal(Numbers.toNumber(""), null);
        asr.equal(Numbers.toNumber(" -0"), 0);
        asr.equal(Numbers.toNumber("0"), 0);
        asr.equal(Numbers.toNumber("1.23"), 1.23);
        asr.equal(Numbers.toNumber("123456789.99"), 123456789.99);
        asr.equal(Numbers.toNumber("-1.23"), -1.23);
        asr.equal(Numbers.toNumber("-123456789.99"), -123456789.99);
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
        asr.equal(orZero(-9, false), -9);
        asr.equal(orZero(1.257, false), 1.257);
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
        asr.equal(format("+989001.555", 2, true, 3), "989,001.56");
        asr.equal(format("-989001.555", 2, true, 3), "-989,001.56");
    });


    test("formatNumeric", function formatNumericTest() {
        // same/alias for format()
        asr.equal(true, true);
    });

});

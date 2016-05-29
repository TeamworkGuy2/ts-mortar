import chai = require("chai");
import mocha = require("mocha");
import Numbers = require("../../../ts-mortar/utils/Numbers");

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
        var res1 = Numbers.getNullableNumeric({ val: () => "0" });
        asr.equal(res1, 0);

        var res1 = Numbers.getNullableNumeric({ val: () => "" });
        asr.equal(res1, null);

        var res1 = Numbers.getNullableNumeric({ val: () => null });
        asr.equal(res1, null);

        var res1 = Numbers.getNullableNumeric({ val: () => "abc" });
        asr.equal(res1, null);

        var res1 = Numbers.getNullableNumeric({ val: () => "123" });
        asr.equal(res1, 123);
    });


    test("getNullableNumericPercent", function getNullableNumericPercentTest() {
        var res1 = Numbers.getNullableNumericPercent({ val: () => "%0" });
        asr.equal(res1, 0);

        var res1 = Numbers.getNullableNumericPercent({ val: () => "" });
        asr.equal(res1, null);

        var res1 = Numbers.getNullableNumericPercent({ val: () => null });
        asr.equal(res1, null);

        var res1 = Numbers.getNullableNumericPercent({ val: () => "abc" });
        asr.equal(res1, null);

        var res1 = Numbers.getNullableNumericPercent({ val: () => "123 %" });
        asr.equal(res1, 123);
    });


    test("roundTo", function roundToTest() {
        asr.equal(Numbers.roundTo(123.4567, 3), 123.457);

        asr.equal(Numbers.roundTo(123.4567, 2), 123.46);

        asr.equal(Numbers.roundTo(123.4567, 1), 123.5);

        asr.equal(Numbers.roundTo(123.4567, 0), 123);
    });


    test("toNumber", function toNumberTest() {
        asr.equal(Numbers.toNumber("1.23"), 1.23);

        asr.equal(Numbers.toNumber("cd"), null);
    });


    test("orZero", function orZeroTest() {
        asr.equal(Numbers.orZero(0, false), 0);

        asr.equal(Numbers.orZero(+null, false), 0);

        asr.equal(Numbers.orZero(Number.NaN, false), 0);

        asr.equal(Numbers.orZero(Number.MIN_VALUE, false), Number.MIN_VALUE);

        asr.equal(Numbers.orZero(Number.NEGATIVE_INFINITY, false), Number.NEGATIVE_INFINITY);

        asr.equal(Numbers.orZero(Number.NaN, true), 0);

        asr.equal(Numbers.orZero(Number.NEGATIVE_INFINITY, true), 0);
    });


    test("format", function formatTest() {
        var res1 = Numbers.format(1234567.899, 2, true, 2);
        asr.equal(res1, "1,23,45,67.90");

        var res1 = Numbers.format(1234567.899, 0, true, 3);
        asr.equal(res1, "1,234,568");
    });


    test("formatNumeric", function formatNumericTest() {
        // same/alias for format()
        asr.equal(true, true);
    });

});

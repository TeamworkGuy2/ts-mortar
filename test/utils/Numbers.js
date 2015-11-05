//import QUnit = require("qunit"); // implicitly setup by 'qunit-tests' in root of project, run using node.js
var Numbers = require("../../../TsMortar/utils/Numbers");
QUnit.module("Numbers", {});
QUnit.test("isNumeric", function isNumericTest(sr) {
    sr.equal(Numbers.isNumeric("1.23"), true);
    sr.equal(Numbers.isNumeric("cd"), false);
});
QUnit.test("isNullOrZero", function isNullOrZeroTest(sr) {
    sr.equal(Numbers.isNullOrZero(null), true);
    sr.equal(Numbers.isNullOrZero(0), true);
    sr.equal(Numbers.isNullOrZero(0.1), false);
    sr.equal(Numbers.isNullOrZero(23), false);
});
QUnit.test("getNullableNumeric", function getNullableNumericTest(sr) {
    var res1 = Numbers.getNullableNumeric({ val: function () { return "0"; } });
    sr.equal(res1, 0);
    var res1 = Numbers.getNullableNumeric({ val: function () { return ""; } });
    sr.equal(res1, null);
    var res1 = Numbers.getNullableNumeric({ val: function () { return null; } });
    sr.equal(res1, null);
    var res1 = Numbers.getNullableNumeric({ val: function () { return "abc"; } });
    sr.equal(res1, null);
    var res1 = Numbers.getNullableNumeric({ val: function () { return "123"; } });
    sr.equal(res1, 123);
});
QUnit.test("getNullableNumericPercent", function getNullableNumericPercentTest(sr) {
    var res1 = Numbers.getNullableNumericPercent({ val: function () { return "%0"; } });
    sr.equal(res1, 0);
    var res1 = Numbers.getNullableNumericPercent({ val: function () { return ""; } });
    sr.equal(res1, null);
    var res1 = Numbers.getNullableNumericPercent({ val: function () { return null; } });
    sr.equal(res1, null);
    var res1 = Numbers.getNullableNumericPercent({ val: function () { return "abc"; } });
    sr.equal(res1, null);
    var res1 = Numbers.getNullableNumericPercent({ val: function () { return "123 %"; } });
    sr.equal(res1, 123);
});
QUnit.test("roundTo", function roundToTest(sr) {
    sr.equal(Numbers.roundTo(123.4567, 3), 123.457);
    sr.equal(Numbers.roundTo(123.4567, 2), 123.46);
    sr.equal(Numbers.roundTo(123.4567, 1), 123.5);
    sr.equal(Numbers.roundTo(123.4567, 0), 123);
});
QUnit.test("toNumber", function toNumberTest(sr) {
    sr.equal(Numbers.toNumber("1.23"), 1.23);
    sr.equal(Numbers.toNumber("cd"), null);
});
QUnit.test("orZero", function orZeroTest(sr) {
    sr.equal(Numbers.orZero(0, false), 0);
    sr.equal(Numbers.orZero(+null, false), 0);
    sr.equal(Numbers.orZero(Number.NaN, false), 0);
    sr.equal(Numbers.orZero(Number.MIN_VALUE, false), Number.MIN_VALUE);
    sr.equal(Numbers.orZero(Number.NEGATIVE_INFINITY, false), Number.NEGATIVE_INFINITY);
    sr.equal(Numbers.orZero(Number.NaN, true), 0);
    sr.equal(Numbers.orZero(Number.NEGATIVE_INFINITY, true), 0);
});
QUnit.test("format", function formatTest(sr) {
    var res1 = Numbers.format(1234567.899, 2, true, 2);
    sr.equal(res1, "1,23,45,67.90");
    var res1 = Numbers.format(1234567.899, 0, true, 3);
    sr.equal(res1, "1,234,568");
});
QUnit.test("formatNumeric", function formatNumericTest(sr) {
    // same/alias for format()
    sr.equal(true, true);
});
//# sourceMappingURL=Numbers.js.map
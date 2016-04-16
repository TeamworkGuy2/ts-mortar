"use strict";
//import QUnit = require("qunit"); // implicitly setup by 'qunit-tests' in root of project, run using node.js
var Arrays = require("../../../ts-mortar/utils/Arrays");
QUnit.module("Arrays", {});
QUnit.test("addAll", function addAllTest(sr) {
    var ary1 = [1, 2, 4];
    var ary2 = [8, 16];
    var res = Arrays.addAll(ary1.slice(), ary2.slice());
    sr.deepEqual(res, [1, 2, 4, 8, 16]);
});
QUnit.test("addAllTransform", function addAllTransformTest(sr) {
    var ary1 = [{ id: 1 }, { id: 2 }, { id: 4 }];
    var ary2 = ['{"id": 8}', '{"id": 16}'];
    var res = Arrays.addAllTransform(ary1.slice(), ary2.slice(), function (t) { return JSON.parse(t); });
    sr.deepEqual(res, [{ id: 1 }, { id: 2 }, { id: 4 }, { id: 8 }, { id: 16 }]);
});
QUnit.test("asArray", function asArrayTest(sr) {
    var obj1 = { name: "A" };
    var res = Arrays.asArray(obj1);
    sr.deepEqual(res, [obj1]);
    var res = Arrays.asArray([obj1]);
    sr.deepEqual(res, [obj1]);
});
QUnit.test("isOneItem", function isOneItemTest(sr) {
    sr.equal(Arrays.isOneItem(null), true);
    sr.equal(Arrays.isOneItem(21), true);
    sr.equal(Arrays.isOneItem([null]), true);
    sr.equal(Arrays.isOneItem(["abc"]), true);
    sr.equal(Arrays.isOneItem([]), false);
    sr.equal(Arrays.isOneItem([1, 2]), false);
});
QUnit.test("getIfOneItem", function getIfOneItemTest(sr) {
    sr.equal(Arrays.getIfOneItem(null), null);
    sr.equal(Arrays.getIfOneItem(21), 21);
    sr.equal(Arrays.getIfOneItem([null]), null);
    sr.equal(Arrays.getIfOneItem(["abc"]), "abc");
    sr.equal(Arrays.getIfOneItem([]), null);
    sr.equal(Arrays.getIfOneItem([1, 2]), null);
});
QUnit.test("binarySearch", function binarySearchTest(sr) {
    var ary1 = [{ p: 2 }, { p: 4 }, { p: 6 }, { p: 8 }, { p: 10 }];
    var idx1 = Arrays.binarySearch(ary1, "p", 8);
    sr.equal(idx1, 3);
    var idx1 = Arrays.binarySearch(ary1, "p", 1);
    sr.equal(idx1, -1);
    var idx1 = Arrays.binarySearch(ary1, "p", 3);
    sr.equal(idx1, -2);
    var idx1 = Arrays.binarySearch(ary1, "p", 11);
    sr.equal(idx1, -6);
});
QUnit.test("copy", function copyTest(sr) {
    var ary1 = [{ p: "B" }, { p: "D" }, { p: "F" }, { p: "H" }, { p: "J" }];
    var copy1 = Arrays.copy(ary1);
    sr.notEqual(copy1, ary1);
    sr.deepEqual(copy1, ary1);
});
QUnit.test("concat", function concatTest(sr) {
    var ary1 = [{ p: "B" }, { p: "D" }, { p: "F" }];
    var ary2 = [{ p: "H" }, { p: "J" }];
    var ary1And2 = [{ p: "B" }, { p: "D" }, { p: "F" }, { p: "H" }, { p: "J" }];
    var res = Arrays.concat(ary1, ary2);
    sr.deepEqual(res, ary1And2);
});
QUnit.test("containsAll", function containsAllTest(sr) {
    var ary = ["B", "D", "F", "H", "J"];
    var searchObjs1 = ["B", "D", "H"];
    var res1 = Arrays.containsAll(ary, searchObjs1);
    sr.equal(res1, true);
    var searchObjs2 = ["B", "D", "H", "K"];
    var res2 = Arrays.containsAll(ary, searchObjs2);
    sr.equal(res2, false);
});
QUnit.test("clear", function clearTest(sr) {
    var ary = [1, 2, 4];
    Arrays.clear(ary);
    sr.equal(ary.pop(), undefined);
    sr.equal(ary.length, 0);
});
QUnit.test("diff", function diffTest(sr) {
    var ary1 = [1, 2, 3];
    var ary2 = [2, 4];
    var res = Arrays.diff(ary1, ary2);
    sr.deepEqual(res, { added: [4], removed: [1, 3] });
});
QUnit.test("fastRemove", function fastRemoveTest(sr) {
    var ary = ["B", "D", "F", "H", "J"];
    var res1 = Arrays.fastRemove(ary.slice(), "B");
    sr.deepEqual(res1.sort(), ["D", "F", "H", "J"]);
    var res2 = Arrays.fastRemove(ary.slice(), "F");
    sr.deepEqual(res2.sort(), ["B", "D", "H", "J"]);
    var res3 = Arrays.fastRemove(ary.slice(), "J");
    sr.deepEqual(res3.sort(), ["B", "D", "F", "H"]);
});
QUnit.test("fastRemoveIndex", function fastRemoveIndexTest(sr) {
    var ary = ["B", "D", "F", "H", "J"];
    var res1 = Arrays.fastRemoveIndex(ary.slice(), 0);
    sr.deepEqual(res1.sort(), ["D", "F", "H", "J"]);
    var res2 = Arrays.fastRemoveIndex(ary.slice(), 2);
    sr.deepEqual(res2.sort(), ["B", "D", "H", "J"]);
    var res3 = Arrays.fastRemoveIndex(ary.slice(), 4);
    sr.deepEqual(res3.sort(), ["B", "D", "F", "H"]);
});
QUnit.test("filterSplit", function filterSplitTest(sr) {
    var res1 = Arrays.filterSplit([1, 2, 3, 4, 5], function (value, idx, ary) { return value % 2 == 0; });
    var expected1 = { all: [1, 2, 3, 4, 5], matching: [2, 4], notMatching: [1, 3, 5] };
    sr.deepEqual(res1, expected1);
});
QUnit.test("findMatchingsProp", function findMatchingPropsTest(sr) {
    var res = Arrays.findMatchingProps([{ name: "billy", value: 5 }, { name: "sam", value: 5 }, { name: "overhill", value: 3 }], "value", 5);
    var expect = [{ name: "billy", value: 5 }, { name: "sam", value: 5 }];
    sr.deepEqual(res, expect);
});
QUnit.test("firstProp", function firstPropTest(sr) {
    var res = Arrays.firstProp([{ name: "billy", value: 5 }, { name: "sam", value: 5 }], "value", 5);
    var expect = { name: "billy", value: 5 };
    sr.deepEqual(res, expect);
});
QUnit.test("first", function firstTest(sr) {
    var ary = [{ key: 27, value: "A" }, { key: 46, value: "B" }, { key: 84, value: "C" }, { key: 84, value: "D" }];
    var expect = { key: 84, value: "C" };
    var res1 = Arrays.first(ary, function (obj) { return obj.key === 84; }, false);
    sr.deepEqual(res1, expect);
    var ary2 = [{ id: "B" }, { id: "D" }, { id: "D" }, { id: "F" }];
    var res2 = Arrays.first(ary2, function (t1, t2) { return t1.id == "D"; });
    sr.equal(res2, ary2[1]);
    sr.throws(function () { return Arrays.first(ary, function (obj) { return obj.key === 84; }, true); });
});
QUnit.test("firstProp", function firstPropTest(sr) {
    var ary1 = [{ name: "billy", value: 4 }, { name: "sam", value: 5 }, { name: "will", value: 5 }];
    var expect1 = { name: "sam", value: 5 };
    var res1 = Arrays.firstProp(ary1, "value", 5, false);
    sr.deepEqual(res1, expect1);
    sr.throws(function () { return Arrays.firstProp(ary1, "value", 5, true); });
});
QUnit.test("pluck", function pluckTest(sr) {
    var ary = [{ id: "B" }, { id: "D" }, { id: "D" }, { id: "F" }];
    var res = Arrays.pluck(ary, "id");
    sr.deepEqual(res, ["B", "D", "D", "F"]);
});
QUnit.test("hasItems", function hasItemsTest(sr) {
    var ary1 = [1];
    var ary0 = [];
    var aryNull = null;
    sr.equal(Arrays.hasItems(ary1), true);
    sr.equal(Arrays.hasItems(ary0), false);
    sr.equal(Arrays.hasItems(aryNull), false);
});
QUnit.test("indexOfProp", function indexOfPropTest(sr) {
    var ary = [{ id: "B" }, { id: "D" }, { id: "D" }, { id: "F" }];
    var res = Arrays.indexOfProp(ary, "id", "D");
    sr.equal(res, 1);
});
QUnit.test("last", function lastTest(sr) {
    var ary = [{ id: "B" }, { id: "D" }, { id: "D" }, { id: "F" }];
    var res = Arrays.last(ary, function (t1, t2) { return t1.id == "D"; });
    sr.equal(res, ary[2]);
});
QUnit.test("lastIndexOfProp", function lastIndexOfPropTest(sr) {
    var ary = [{ id: "B" }, { id: "D" }, { id: "D" }, { id: "F" }];
    var res = Arrays.lastIndexOfProp(ary, "id", "D");
    sr.equal(res, 2);
});
QUnit.test("looseDiff", function looseDiffTest(sr) {
    var ary1 = [1, 2, 3];
    var ary2 = [2, 4];
    var res = Arrays.looseDiff(ary1, ary2);
    sr.deepEqual(res.sort(function (a, b) { return a - b; }), [1, 3, 4]);
});
QUnit.test("equal", function equalTest(sr) {
    var res1 = Arrays.equal(["A", 23, true], ["A", 23, true]);
    sr.equal(res1, true);
    var res2 = Arrays.equal(["A", 23, true], ["A", 13]);
    sr.equal(res2, false);
    var res3 = Arrays.equal(null, null);
    sr.equal(res3, false);
    var res4 = Arrays.equal([], []);
    sr.equal(res4, true);
});
QUnit.test("looseEqual", function looseEqualTest(sr) {
    var res1 = Arrays.looseEqual([26, "Alpha", 5], [5, 26, "Alpha"]);
    sr.equal(res1, true);
    var res2 = Arrays.looseEqual([34, "A", "QA"], [7, 34, "A"]);
    sr.equal(res2, false);
});
QUnit.test("mapFilter", function mapFilterTest(sr) {
    var ary = [1, 2, 3, 4, 5, 6];
    var res = Arrays.mapFilter(ary, function (val, res) { return res.isValid = (val % 2 === 1); });
    sr.deepEqual(res, [1, 3, 5]);
    var res1 = Arrays.mapFilter([1, 2, 3, 4, 5, 6, 7], function (value, dstOut) { dstOut.isValid = (value % 3 !== 0); });
    var expected1 = [1, 2, 4, 5, 7];
    sr.deepEqual(res1, expected1);
    var res2 = Arrays.mapFilter(['A', 'B', 'C', 'D', 'C', 'A', 'B'], function (value, dstOut) {
        dstOut.isValid = (value !== 'D');
        dstOut.value = value.toLowerCase();
    });
    var expected2 = ['a', 'b', 'c', 'c', 'a', 'b'];
    sr.deepEqual(res2, expected2);
});
QUnit.test("mapFilterNotNull", function mapFilterNotNullTest(sr) {
    var ary = [1, 2, "B", null, undefined, "C"];
    var res = Arrays.mapFilterNotNull(ary, function (t) { return t; });
    sr.deepEqual(res, [1, 2, "B", "C"]);
});
QUnit.test("removeValue", function removeValueTest(sr) {
    var ary1 = ["A", "B", "C", "D"];
    Arrays.removeValue(ary1, "B");
    sr.deepEqual(ary1, ["A", "C", "D"]);
    var ary2 = ["1", "2", "4", 3];
    Arrays.removeValue(ary2, 3);
    sr.deepEqual(ary2, ["1", "2", "4"]);
});
QUnit.test("removeIndex", function removeIndexTest(sr) {
    var ary = ["Alpha", "Beta", "Gamma"];
    var res1 = Arrays.removeIndex(ary.slice(), 1);
    sr.deepEqual(res1, ["Alpha", "Gamma"]);
});
QUnit.test("setAllProp", function setAllPropTest(sr) {
    var ary = [{ id: "B" }, { id: "D" }, { id: "D" }, { id: "F" }];
    var expect = [{ id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }];
    Arrays.setAllProp(ary, "id", 1);
    sr.deepEqual(ary, expect);
});
QUnit.test("sortNumeric", function sortNumericTest(sr) {
    var ary = [5, 2, 3, 1, 4];
    var res1 = Arrays.sortNumeric(ary.slice());
    sr.deepEqual(res1, [1, 2, 3, 4, 5]);
    var res2 = Arrays.sortNumeric(ary.slice(), true);
    sr.deepEqual(res2, [5, 4, 3, 2, 1]);
    var res3 = Arrays.sortNumeric([1, 1]);
    sr.deepEqual(res3, [1, 1]);
});
QUnit.test("splice", function spliceTest(sr) {
    var origAry = [0, 1, 1, 5];
    var insertAry = [10, 15, 20];
    var res = Arrays.splice(origAry, insertAry, 2, 1);
    sr.deepEqual(res, [0, 1, 10, 15, 20, 5]);
    var res2 = Arrays.splice([2, 3], [0, 1], 0, 0);
    sr.deepEqual(res2, [0, 1, 2, 3]);
    var res2 = Arrays.splice([0, 1], [2, 3], 2, 0);
    sr.deepEqual(res2, [0, 1, 2, 3]);
});
QUnit.test("swap", function swapTest(sr) {
    var res = Arrays.swap(["A", "B", "C", "D"], 0, 1);
    sr.deepEqual(res, ["B", "A", "C", "D"]);
    var res = Arrays.swap(["A", "B", "C", "D"], 1, 2);
    sr.deepEqual(res, ["A", "C", "B", "D"]);
    var res = Arrays.swap(["A", "B", "C", "D"], 2, 3);
    sr.deepEqual(res, ["A", "B", "D", "C"]);
    var res = Arrays.swap(["A", "B", "C", "D"], 2, 2);
    sr.deepEqual(res, ["A", "B", "C", "D"]);
    var res = Arrays.swap(["A", "B", "C", "D"], 0, 2);
    sr.deepEqual(res, ["C", "B", "A", "D"]);
});
QUnit.test("union", function unionTest(sr) {
    var ary1 = ["A", "B", "C", "D", "1"];
    var ary2 = ["B", "C", "D", "2"];
    var aryUnion = Arrays.union(ary1, ary2);
    sr.deepEqual(aryUnion, ["B", "C", "D"]);
});
QUnit.test("unique", function uniqueTest(sr) {
    var ary1 = ["B", "D", "D", "A", "F", "A"];
    var aryUnique1 = ["B", "D", "A", "F"];
    sr.deepEqual(Arrays.unique(ary1), aryUnique1);
    var ary2 = [55, 2, 12, 8, 12, 0, 2];
    var aryUnique2 = [55, 2, 12, 8, 0];
    sr.deepEqual(Arrays.unique(ary2), aryUnique2);
    sr.deepEqual(Arrays.unique([]), []);
});
QUnit.test("max", function maxTest(sr) {
    sr.equal(Arrays.max([NaN, 0, -0]), 0);
    sr.equal(Arrays.max([-1, 0, -2]), 0);
    sr.equal(Arrays.max([0, 2, 4]), 4);
    sr.equal(Arrays.max([5, 5]), 5);
});
QUnit.test("maxValueIndex", function maxValueIndexTest(sr) {
    sr.equal(Arrays.maxValueIndex([NaN, 0, -0]), 1);
    sr.equal(Arrays.maxValueIndex([-1, 0, -2]), 1);
    sr.equal(Arrays.maxValueIndex([0, 2, 4]), 2);
    sr.equal(Arrays.maxValueIndex([5, 5]), 0);
});
QUnit.test("min", function minTest(sr) {
    sr.equal(Arrays.min([NaN, 0, -0]), 0);
    sr.equal(Arrays.min([1, 0, 2]), 0);
    sr.equal(Arrays.min([-2, 2, 4]), -2);
    sr.equal(Arrays.min([-5, -5]), -5);
});
QUnit.test("minValueIndex", function minValueIndexTest(sr) {
    sr.equal(Arrays.minValueIndex([NaN, 0, -0]), 1);
    sr.equal(Arrays.minValueIndex([1, 0, 2]), 1);
    sr.equal(Arrays.minValueIndex([-2, 2, 4]), 0);
    sr.equal(Arrays.minValueIndex([-5, -5]), 0);
});

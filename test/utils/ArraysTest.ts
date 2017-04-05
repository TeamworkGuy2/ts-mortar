/// <reference path="../../../definitions/chai/chai.d.ts" />
/// <reference path="../../../definitions/mocha/mocha.d.ts" />

import chai = require("chai");
import mocha = require("mocha");
import Arrays = require("../../../ts-mortar/utils/Arrays");

var asr = chai.assert;


suite("Arrays", function ArraysTest() {

    var numSort = (a, b) => a - b;


    var equalNum = (act: any, exp: any, msg?: string) => {
        if (act === exp || (isNaN(act) && isNaN(exp))) return;
        asr.equal(act, exp, msg);
    };


    test("addAll", function addAllTest() {
        var ary1 = [1, 2, 4];
        var ary2 = [8, 16];

        var res = Arrays.addAll(ary1.slice(), ary2.slice());
        asr.deepEqual(res, [1, 2, 4, 8, 16]);
    });


    test("addAllTransform", function addAllTransformTest() {
        var ary1 = [{ id: 1 }, { id: 2 }, { id: 4 }];
        var ary2 = ['{"id": 8}', '{"id": 16}'];

        var res = Arrays.addAllTransform(ary1.slice(), ary2.slice(), (t) => <{ id: number }>JSON.parse(t));
        asr.deepEqual(res, [{ id: 1 }, { id: 2 }, { id: 4 }, { id: 8 }, { id: 16 }]);
    });


    test("asArray", function asArrayTest() {
        var obj1 = { name: "A" };

        var res = Arrays.asArray(obj1);
        asr.deepEqual(res, [obj1]);

        var res = Arrays.asArray([obj1]);
        asr.deepEqual(res, [obj1]);
    });


    test("binarySearch", function binarySearchTest() {
        var ary1 = [{ p: 2 }, { p: 4 }, { p: 6 }, { p: 8 }, { p: 10 }];

        var idx1 = Arrays.binarySearch(ary1, "p", 8);
        asr.equal(idx1, 3);

        var idx1 = Arrays.binarySearch(ary1, "p", 1);
        asr.equal(idx1, -1);

        var idx1 = Arrays.binarySearch(ary1, "p", 3);
        asr.equal(idx1, -2);

        var idx1 = Arrays.binarySearch(ary1, "p", 11);
        asr.equal(idx1, -6);
    });


    test("clear", function clearTest() {
        var ary = [1, 2, 4];

        Arrays.clear(ary);
        asr.equal(ary.pop(), undefined);
        asr.equal(ary.length, 0);
    });


    test("copy", function copyTest() {
        var ary1 = [{ p: "B" }, { p: "D" }, { p: "F" }, { p: "H" }, { p: "J" }];

        var copy1 = Arrays.copy(ary1);
        asr.notEqual(copy1, ary1);
        asr.deepEqual(copy1, ary1);
    });


    test("concat", function concatTest() {
        var ary1 = [{ p: "B" }, { p: "D" }, { p: "F" }];
        var ary2 = [{ p: "H" }, { p: "J" }];
        var ary1And2 = [{ p: "B" }, { p: "D" }, { p: "F" }, { p: "H" }, { p: "J" }];

        var res = Arrays.concat(ary1, ary2);
        asr.deepEqual(res, ary1And2);
    });


    test("containsAll", function containsAllTest() {
        var ary = ["B", "D", "F", "H", "J"];

        var searchObjs1 = ["B", "D", "H"];
        var res1 = Arrays.containsAll(ary, searchObjs1);
        asr.equal(res1, true);

        var searchObjs2 = ["B", "D", "H", "K"];
        var res2 = Arrays.containsAll(ary, searchObjs2);
        asr.equal(res2, false);

        var searchObjs3 = [];
        var res3 = Arrays.containsAll(ary, searchObjs3);
        asr.equal(res3, true);
    });


    test("containsAny", function containsAnyTest() {
        var ary = ["B", "D", "F", "H", "J"];

        var searchObjs1 = ["B", "Z"];
        var res1 = Arrays.containsAny(ary, searchObjs1);
        asr.equal(res1, true);

        var searchObjs2 = ["X", "Y", "Z", "J"];
        var res2 = Arrays.containsAny(ary, searchObjs2);
        asr.equal(res2, true);

        var searchObjs3 = [];
        var res3 = Arrays.containsAny(ary, searchObjs3);
        asr.equal(res3, false);

        var searchObjs4 = ["A", "Q"];
        var res4 = Arrays.containsAny(ary, searchObjs4);
        asr.equal(res4, false);

    });


    test("count", function countTest() {
        var ary = [1, 2, 3, 4, 5];

        var res1 = Arrays.count(ary, (i) => i % 2 === 0);
        asr.equal(2, res1);
        var res2 = Arrays.count(ary, (i) => i % 2 === 1);
        asr.equal(3, res2);
    });


    test("diff", function diffTest() {
        var res = Arrays.diff([1, 2, 3], [2, 4]);
        asr.deepEqual(res.sort(numSort), [1, 3, 4]);

        // duplicate values in input are treated as unique
        var res2 = Arrays.diff([1, 1, 2, 5], [2, 2, 4, 3, 3, 5]);
        asr.deepEqual(res2.sort(numSort), [1, 1, 2, 3, 3, 4]);

        var res3 = Arrays.diff([1, 4], []);
        asr.deepEqual(res3.sort(numSort), [1, 4]);
    });


    test("diffParts", function diffPartsTest() {
        var res = Arrays.diffParts([1, 2, 3], [2, 4]);
        asr.deepEqual(res, { added: [4], removed: [1, 3] });

        // duplicate values in input are treated as unique
        var res2 = Arrays.diffParts([1, 1, 2, 5, 6], [3, 3, 4, 5]);
        asr.deepEqual(res2, { added: [3, 3, 4], removed: [1, 1, 2, 6] });
    });


    test("equal", function equalTest() {
        var res1 = Arrays.equal(["A", 23, true], ["A", 23, true]);
        asr.equal(res1, true);

        var res2 = Arrays.equal(["A", 23, true], ["A", 13]);
        asr.equal(res2, false);

        var res3 = Arrays.equal(null, null);
        asr.equal(res3, false);

        var res4 = Arrays.equal([], []);
        asr.equal(res4, true);
    });


    test("fastRemove", function fastRemoveTest() {
        var ary = ["B", "D", "F", "H", "J"];

        var res1 = Arrays.fastRemove(ary.slice(), "B");
        asr.deepEqual(res1.sort(), ["D", "F", "H", "J"]);

        var res2 = Arrays.fastRemove(ary.slice(), "F");
        asr.deepEqual(res2.sort(), ["B", "D", "H", "J"]);

        var res3 = Arrays.fastRemove(ary.slice(), "J");
        asr.deepEqual(res3.sort(), ["B", "D", "F", "H"]);
    });


    test("fastRemoveIndex", function fastRemoveIndexTest() {
        var ary = ["B", "D", "F", "H", "J"];

        var res1 = Arrays.fastRemoveIndex(ary.slice(), 0);
        asr.deepEqual(res1.sort(), ["D", "F", "H", "J"]);

        var res2 = Arrays.fastRemoveIndex(ary.slice(), 2);
        asr.deepEqual(res2.sort(), ["B", "D", "H", "J"]);

        var res3 = Arrays.fastRemoveIndex(ary.slice(), 4);
        asr.deepEqual(res3.sort(), ["B", "D", "F", "H"]);
    });


    test("filterSplit", function filterSplitTest() {
        var res1 = Arrays.filterSplit([1, 2, 3, 4, 5], function (value, idx, ary) { return value % 2 == 0; });
        var expected1 = { all: [1, 2, 3, 4, 5], matching: [2, 4], notMatching: [1, 3, 5] };
        asr.deepEqual(res1, expected1);
    });


    test("findMatchingsProp", function findMatchingPropsTest() {
        var res = Arrays.findMatchingProps([{ name: "billy", value: 5 }, { name: "sam", value: 5 }, { name: "overhill", value: 3 }], "value", 5);
        var expect = [{ name: "billy", value: 5 }, { name: "sam", value: 5 }];

        asr.deepEqual(res, expect);
    });


    test("first", function firstTest() {
        var ary = [{ key: 27, value: "A" }, { key: 46, value: "B" }, { key: 84, value: "C" }, { key: 84, value: "D" }];
        var expect = { key: 84, value: "C" };

        var res1 = Arrays.first(ary, function (obj) { return obj.key === 84; }, false);
        asr.deepEqual(res1, expect);

        var ary2 = [{ id: "B" }, { id: "D" }, { id: "D" }, { id: "F" }];

        var res2 = Arrays.first(ary2, (t1, t2) => t1.id == "D");
        asr.equal(res2, ary2[1]);

        asr.throws(() => Arrays.first(ary, function (obj) { return obj.key === 84; }, true));
    });


    test("firstProp", function firstPropTest() {
        var res2 = Arrays.firstProp([{ name: "billy", value: 5 }, { name: "sam", value: 5 }], "value", 5);
        asr.deepEqual(res2, { name: "billy", value: 5 });

        var ary1 = [{ name: "billy", value: 4 }, { name: "sam", value: 5 }, { name: "will", value: 5 }];

        var res1 = Arrays.firstProp(ary1, "value", 5, false);
        asr.deepEqual(res1, { name: "sam", value: 5 });

        asr.throws(() => Arrays.firstProp(ary1, "value", 5, true));
    });


    test("getIfOneItem", function getIfOneItemTest() {
        asr.equal(Arrays.getIfOneItem(null), null);
        asr.equal(Arrays.getIfOneItem(21), 21);
        asr.equal(Arrays.getIfOneItem([null]), null);
        asr.equal(Arrays.getIfOneItem(["abc"]), "abc");
        asr.equal(Arrays.getIfOneItem([]), null);
        asr.equal(Arrays.getIfOneItem([1, 2]), null);
    });


    test("hasItems", function hasItemsTest() {
        var ary1 = [1];
        var ary0 = [];
        var aryNull = null;

        asr.equal(Arrays.hasItems(ary1), true);
        asr.equal(Arrays.hasItems(ary0), false);
        asr.equal(Arrays.hasItems(aryNull), false);
    });


    test("indexOfProp", function indexOfPropTest() {
        var ary = [{ id: "B" }, { id: "D" }, { id: "D" }, { id: "F" }];

        var res = Arrays.indexOfProp(ary, "id", "D");
        asr.equal(res, 1);
    });


    test("isOneItem", function isOneItemTest() {
        asr.equal(Arrays.isOneItem(null), true);
        asr.equal(Arrays.isOneItem(21), true);
        asr.equal(Arrays.isOneItem([null]), true);
        asr.equal(Arrays.isOneItem(["abc"]), true);
        asr.equal(Arrays.isOneItem([]), false);
        asr.equal(Arrays.isOneItem([1, 2]), false);
    });


    test("last", function lastTest() {
        var ary = [{ id: "B" }, { id: "D" }, { id: "D" }, { id: "F" }];

        var res = Arrays.last(ary, (t1, t2) => t1.id == "D");
        asr.equal(res, ary[2]);
    });


    test("lastIndexOfProp", function lastIndexOfPropTest() {
        var ary = [{ id: "B" }, { id: "D" }, { id: "D" }, { id: "F" }];

        var res = Arrays.lastIndexOfProp(ary, "id", "D");
        asr.equal(res, 2);
    });


    test("looseEqual", function looseEqualTest() {
        var res1 = Arrays.looseEqual([26, "Alpha", 5], [5, 26, "Alpha"]);
        asr.equal(res1, true);

        var res2 = Arrays.looseEqual([34, "A", "QA"], [7, 34, "A"]);
        asr.equal(res2, false);
    });


    test("map", function mapTest() {
        var ary = [1, 2, 3, 4, 5, 6];

        var res1 = Arrays.map(ary, (v, i) => v + i);
        asr.deepEqual(res1, [1, 3, 5, 7, 9, 11]);

        var res2 = Arrays.map(ary, (v, i) => i + "_" + v);
        asr.deepEqual(res2, ["0_1", "1_2", "2_3", "3_4", "4_5", "5_6"]);

        var i = 0;
        var res3 = Arrays.map(ary, (v) => { return { value: v, position: i++ }; });
        asr.deepEqual(res3, [{ value: 1, position: 0 }, { value: 2, position: 1 }, { value: 3, position: 2 }, { value: 4, position: 3 }, { value: 5, position: 4 }, { value: 6, position: 5 }]);

        var res4 = Arrays.map(null, () => null);
        asr.deepEqual(res4, []);
    });


    test("mapFilter", function mapFilterTest() {
        var ary = [1, 2, 3, 4, 5, 6];

        var res = Arrays.mapFilter(ary, (val, res) => res.isValid = (val % 2 === 1));
        asr.deepEqual(res, [1, 3, 5]);

        var res1 = Arrays.mapFilter([1, 2, 3, 4, 5, 6, 7], function (value, dstOut) { dstOut.isValid = (value % 3 !== 0); });
        asr.deepEqual(res1, [1, 2, 4, 5, 7]);

        var res2 = Arrays.mapFilter(['A', 'B', 'C', 'D', 'C', 'A', 'B'], function (value, dstOut) {
            dstOut.isValid = (value !== 'D');
            dstOut.value = value.toLowerCase();
        });
        asr.deepEqual(res2, ['a', 'b', 'c', 'c', 'a', 'b']);
    });


    test("mapFilterNotNull", function mapFilterNotNullTest() {
        var ary = [1, 2, "B", null, undefined, "C"];
        var res = Arrays.mapFilterNotNull(ary, (t) => t);
        asr.deepEqual(res, [1, 2, "B", "C"]);
    });


    test("max", function maxTest() {
        asr.equal(Arrays.max([NaN, 0, -0]), 0);
        asr.equal(Arrays.max([-1, 0, -2]), 0);
        asr.equal(Arrays.max([0, 2, 4]), 4);
        asr.equal(Arrays.max([5, 5]), 5);
    });


    test("maxValueIndex", function maxValueIndexTest() {
        asr.equal(Arrays.maxValueIndex([NaN, 0, -0]), 1);
        asr.equal(Arrays.maxValueIndex([-1, 0, -2]), 1);
        asr.equal(Arrays.maxValueIndex([0, 2, 4]), 2);
        asr.equal(Arrays.maxValueIndex([5, 5]), 0);
    });


    test("min", function minTest() {
        asr.equal(Arrays.min([NaN, 0, -0]), 0);
        asr.equal(Arrays.min([1, 0, 2]), 0);
        asr.equal(Arrays.min([-2, 2, 4]), -2);
        asr.equal(Arrays.min([-5, -5]), -5);
    });


    test("minValueIndex", function minValueIndexTest() {
        asr.equal(Arrays.minValueIndex([NaN, 0, -0]), 1);
        asr.equal(Arrays.minValueIndex([1, 0, 2]), 1);
        asr.equal(Arrays.minValueIndex([-2, 2, 4]), 0);
        asr.equal(Arrays.minValueIndex([-5, -5]), 0);
    });


    test("pluck", function pluckTest() {
        var ary = [{ id: "B" }, { id: "D" }, { id: "D" }, { id: "F" }];

        var res = Arrays.pluck(ary, "id");
        asr.deepEqual(res, ["B", "D", "D", "F"]);
    });


    test("removeAll", function removeAllTest() {
        var res1 = Arrays.removeAll([2, 5, 3, 1, 4, 5], [5, 1]);
        asr.deepEqual(res1.sort(numSort), [2, 3, 4, 5]);

        var res2 = Arrays.removeAll([2, 3, 1, 3, 2], [2, 2, 3], true);
        asr.deepEqual(res2.sort(numSort), [1, 3]);

        var res2 = Arrays.removeAll([2, 1], null);
        asr.deepEqual(res2.sort(numSort), [1, 2]);
    });


    test("removeIndex", function removeIndexTest() {
        var ary = ["Alpha", "Beta", "Gamma"];

        var res1 = Arrays.removeIndex(ary.slice(), 1);
        asr.deepEqual(res1, ["Alpha", "Gamma"]);
    });


    test("removeValue", function removeValueTest() {
        var ary1 = ["A", "B", "C", "D"];
        Arrays.removeValue(ary1, "B");
        asr.deepEqual(ary1, ["A", "C", "D"]);

        var ary2 = ["1", "2", "4", 3];
        Arrays.removeValue(ary2, 3);
        asr.deepEqual(ary2, ["1", "2", "4"]);
    });


    test("setAllProp", function setAllPropTest() {
        var ary = [{ id: "B" }, { id: "D" }, { id: "D" }, { id: "F" }];
        var expect = [{ id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }];

        Arrays.setAllProp(ary, "id", 1);
        asr.deepEqual(ary, expect);
    });


    test("sortNumeric", function sortNumericTest() {
        var ary = [5, 2, 3, 1, 4];

        var res1 = Arrays.sortNumeric(ary.slice());
        asr.deepEqual(res1, [1, 2, 3, 4, 5]);

        var res2 = Arrays.sortNumeric(ary.slice(), true);
        asr.deepEqual(res2, [5, 4, 3, 2, 1]);

        var res3 = Arrays.sortNumeric([1, 1]);
        asr.deepEqual(res3, [1, 1]);
    });


    test("splice", function spliceTest() {
        var origAry = [0, 1, 1, 5];
        var insertAry = [10, 15, 20];

        var res = Arrays.splice(origAry, insertAry, 2, 1);
        asr.deepEqual(res, [0, 1, 10, 15, 20, 5]);

        var res2 = Arrays.splice([2, 3], [0, 1], 0, 0);
        asr.deepEqual(res2, [0, 1, 2, 3]);

        var res2 = Arrays.splice([0, 1], [2, 3], 2, 0);
        asr.deepEqual(res2, [0, 1, 2, 3]);
    });


    test("sum", function sumTest() {
        var ary1 = [1, 2, 3, 4];
        equalNum(Arrays.sum(ary1), 10);
        equalNum(Arrays.sum(ary1, true), 10);
        equalNum(Arrays.sum(ary1, false), 10);

        var ary2 = [2, null, Number.POSITIVE_INFINITY, 4, NaN, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY];
        equalNum(Arrays.sum(ary2), NaN);
        equalNum(Arrays.sum(ary2, true), 6);
        equalNum(Arrays.sum(ary2, false), NaN);
    });


    test("swap", function swapTest() {
        var res = Arrays.swap(["A", "B", "C", "D"], 0, 1);
        asr.deepEqual(res, ["B", "A", "C", "D"]);

        var res = Arrays.swap(["A", "B", "C", "D"], 1, 2);
        asr.deepEqual(res, ["A", "C", "B", "D"]);

        var res = Arrays.swap(["A", "B", "C", "D"], 2, 3);
        asr.deepEqual(res, ["A", "B", "D", "C"]);

        var res = Arrays.swap(["A", "B", "C", "D"], 2, 2);
        asr.deepEqual(res, ["A", "B", "C", "D"]);

        var res = Arrays.swap(["A", "B", "C", "D"], 0, 2);
        asr.deepEqual(res, ["C", "B", "A", "D"]);
    });


    test("union", function unionTest() {
        var ary1 = ["A", "B", "C", "D", "1"];
        var ary2 = ["B", "C", "D", "2"];

        var aryUnion = Arrays.union(ary1, ary2);
        asr.deepEqual(aryUnion, ["B", "C", "D"]);
    });


    test("unique", function uniqueTest() {
        var ary1 = ["B", "D", "D", "A", "F", "A"];
        var aryUnique1 = ["B", "D", "A", "F"];

        asr.deepEqual(Arrays.unique(ary1), aryUnique1);

        var ary2 = [55, 2, 12, 8, 12, 0, 2];
        var aryUnique2 = [55, 2, 12, 8, 0];

        asr.deepEqual(Arrays.unique(ary2), aryUnique2);

        asr.deepEqual(Arrays.unique([]), []);
    });

});

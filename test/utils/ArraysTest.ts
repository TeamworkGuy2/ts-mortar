﻿import chai = require("chai");
import mocha = require("mocha");
import Arrays = require("../../utils/Arrays");

var asr = chai.assert;


suite("Arrays", () => {

    var numSort = (a: number | string, b: number | string) => <number>a - <number>b;


    var equalNum = (act: any, exp: any, msg?: string) => {
        if (act === exp || (isNaN(act) && isNaN(exp))) return;
        asr.equal(act, exp, msg);
    };


    test("addAll", () => {
        var ary1 = [1, 2, 4];
        var ary2 = [8, 16];

        var res = Arrays.addAll(ary1.slice(), ary2.slice());
        asr.deepEqual(res, [1, 2, 4, 8, 16]);
    });


    test("addAllTransform", () => {
        var ary1 = [{ id: 1 }, { id: 2 }, { id: 4 }];
        var ary2 = ['{"id": 8}', '{"id": 16}'];

        var res = Arrays.addAllTransform(ary1.slice(), ary2.slice(), (t) => <{ id: number }>JSON.parse(t));
        asr.deepEqual(res, [{ id: 1 }, { id: 2 }, { id: 4 }, { id: 8 }, { id: 16 }]);
    });


    test("asArray", () => {
        var obj1 = { name: "A" };

        var res = Arrays.asArray(obj1);
        asr.deepEqual(res, [obj1]);

        var res = Arrays.asArray([obj1]);
        asr.deepEqual(res, [obj1]);
    });


    test("binarySearch", () => {
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


    test("clear", () => {
        var ary = [1, 2, 4];

        Arrays.clear(ary);
        asr.equal(ary.pop(), undefined);
        asr.equal(ary.length, 0);
    });


    test("concat", () => {
        var ary1 = [{ p: "B" }, { p: "D" }, { p: "F" }];
        var ary2 = [{ p: "H" }, { p: "J" }];
        var ary1And2 = [{ p: "B" }, { p: "D" }, { p: "F" }, { p: "H" }, { p: "J" }];

        var res = Arrays.concat(ary1, ary2);
        asr.deepEqual(res, ary1And2);

        asr.deepEqual(Arrays.concat(null, undefined), []);
        asr.deepEqual(Arrays.concat(null, []), []);
        asr.deepEqual(Arrays.concat([11], null), [11]);
        asr.deepEqual(Arrays.concat(null, ['A', 'B']), ['A', 'B']);
    });


    test("containsAll", () => {
        var ary = ["B", "D", "F", "H", "J"];

        var searchObjs1 = ["B", "D", "H"];
        var res1 = Arrays.containsAll(ary, searchObjs1);
        asr.equal(res1, true);

        var searchObjs2 = ["B", "D", "H", "K"];
        var res2 = Arrays.containsAll(ary, searchObjs2);
        asr.equal(res2, false);

        var searchObjs3: any[] = [];
        var res3 = Arrays.containsAll(ary, searchObjs3);
        asr.equal(res3, true);
    });


    test("containsAny", () => {
        var ary = ["B", "D", "F", "H", "J"];

        var searchObjs1 = ["B", "Z"];
        var res1 = Arrays.containsAny(ary, searchObjs1);
        asr.equal(res1, true);

        var searchObjs2 = ["X", "Y", "Z", "J"];
        var res2 = Arrays.containsAny(ary, searchObjs2);
        asr.equal(res2, true);

        var searchObjs3: any[] = [];
        var res3 = Arrays.containsAny(ary, searchObjs3);
        asr.equal(res3, false);

        var searchObjs4 = ["A", "Q"];
        var res4 = Arrays.containsAny(ary, searchObjs4);
        asr.equal(res4, false);

    });


    test("count", () => {
        var ary = [1, 2, 3, 4, 5];

        var res1 = Arrays.count(ary, (i) => i % 2 === 0);
        asr.equal(2, res1);
        var res2 = Arrays.count(ary, (i) => i % 2 === 1);
        asr.equal(3, res2);
    });


    test("diff", () => {
        var res = Arrays.diff([1, 2, 3], [2, 4]);
        asr.deepEqual(res.sort(numSort), [1, 3, 4]);

        // duplicate values in input are treated as unique
        var res2 = Arrays.diff([1, 1, 2, 5], [2, 2, 4, 3, 3, 5]);
        asr.deepEqual(res2.sort(numSort), [1, 1, 2, 3, 3, 4]);

        var res3 = Arrays.diff([1, 4], []);
        asr.deepEqual(res3.sort(numSort), [1, 4]);
    });


    test("diffParts", () => {
        var res = Arrays.diffParts([1, 2, 3], [2, 4]);
        asr.deepEqual(res, { added: [4], removed: [1, 3] });

        // duplicate values in input are treated as unique
        var res2 = Arrays.diffParts([1, 1, 2, 5, 6], [3, 3, 4, 5]);
        asr.deepEqual(res2, { added: [3, 3, 4], removed: [1, 1, 2, 6] });
    });


    test("diffPartsCustomEquality", () => {
        var res = Arrays.diffPartsCustomEquality([{ n: 1, h: "A" }, { n: 2, h: "B" }, { n: 3, h: "C" }], [{ n: 2, h: "D" }, { n: 4, h: "E" }], (a, b) => a.n === b.n);
        asr.deepEqual(res, { added: [{ n: 4, h: "E" }], removed: [{ n: 1, h: "A" }, { n: 3, h: "C" }] });

        // duplicate values in input are treated as unique
        var res2 = Arrays.diffParts([1, 1, 2, 5, 6], [3, 3, 4, 5]);
        asr.deepEqual(res2, { added: [3, 3, 4], removed: [1, 1, 2, 6] });
    });


    test("distinct", () => {
        var ary1 = ["B", "D", "D", "A", "F", "A"];
        var aryDistinct1 = ["B", "D", "A", "F"];
        asr.deepEqual(Arrays.distinct(ary1), aryDistinct1);
        ary1.shift();
        asr.notDeepEqual(Arrays.distinct(ary1), aryDistinct1);

        var ary2 = [55, 2, 12, 8, 12, 0, 2];
        var aryDistinct2 = [55, 2, 12, 8, 0];
        asr.deepEqual(Arrays.distinct(ary2), aryDistinct2);
        ary2.shift();
        asr.notDeepEqual(Arrays.distinct(ary2), aryDistinct2);

        var ary3 = [{ ap: "a", id: 3 }, { ap: "b", id: 4 }, { ap: "b", id: 5 }, { ap: "c", id: 8 }];
        var aryDistinct3 = [ary3[0], ary3[1], ary3[3]];
        asr.deepEqual(Arrays.distinct(ary3, "ap"), aryDistinct3);
        ary3.shift();
        asr.notDeepEqual(Arrays.distinct(ary3, "ap"), aryDistinct3);

        asr.deepEqual(Arrays.distinct([]), []);
    });


    test("equal", () => {
        var res1 = Arrays.equal(["A", 23, true], ["A", 23, true]);
        asr.equal(res1, true);

        var res2 = Arrays.equal(["A", 23, true], ["A", 13]);
        asr.equal(res2, false);

        var res3 = Arrays.equal(null, null);
        asr.equal(res3, false);

        var res4 = Arrays.equal([], []);
        asr.equal(res4, true);
    });


    test("fastRemove", () => {
        var ary = ["B", "D", "H", "B", "J"];

        var res1 = Arrays.fastRemove(ary.slice(), "A");
        asr.deepEqual(res1, ["B", "D", "H", "B", "J"]);

        var res2 = Arrays.fastRemove(ary.slice(), "B");
        asr.deepEqual(res2.sort(), ["B", "D", "H", "J"]);

        var res3 = Arrays.fastRemove(ary.slice(), "H");
        asr.deepEqual(res3.sort(), ["B", "B", "D", "J"]);

        var res4 = Arrays.fastRemove(ary.slice(), "J");
        asr.deepEqual(res4.sort(), ["B", "B", "D", "H"]);
    });


    test("fastRemoveIndex", () => {
        var ary = ["B", "D", "F", "H", "J"];

        var res = Arrays.fastRemoveIndex(ary.slice(), -1);
        asr.deepEqual(res.sort(), ["B", "D", "F", "H", "J"]);

        res = Arrays.fastRemoveIndex(ary.slice(), 999);
        asr.deepEqual(res.sort(), ["B", "D", "F", "H", "J"]);

        res = Arrays.fastRemoveIndex(ary.slice(), 0);
        asr.deepEqual(res.sort(), ["D", "F", "H", "J"]);

        res = Arrays.fastRemoveIndex(ary.slice(), 0);
        asr.deepEqual(res.sort(), ["D", "F", "H", "J"]);

        res = Arrays.fastRemoveIndex(ary.slice(), 0);
        asr.deepEqual(res.sort(), ["D", "F", "H", "J"]);

        res = Arrays.fastRemoveIndex(ary.slice(), 2);
        asr.deepEqual(res.sort(), ["B", "D", "H", "J"]);

        res = Arrays.fastRemoveIndex(ary.slice(), 4);
        asr.deepEqual(res.sort(), ["B", "D", "F", "H"]);
    });


    test("filterSplit", () => {
        var res1 = Arrays.filterSplit([1, 2, 3, 4, 5], function (value, idx, ary) { return value % 2 == 0; });
        var expected1 = { all: [1, 2, 3, 4, 5], matching: [2, 4], notMatching: [1, 3, 5] };
        asr.deepEqual(res1, expected1);
    });


    test("findMatchingsProp", () => {
        var res = Arrays.findMatchingProps([{ name: "billy", value: 5 }, { name: "sam", value: 5 }, { name: "overhill", value: 3 }], "value", 5);
        asr.deepEqual(res, [{ name: "billy", value: 5 }, { name: "sam", value: 5 }]);

        var res2 = Arrays.findMatchingProps(<any[]>[], "value", 5);
        asr.deepEqual(res2, []);
    });


    test("first", () => {
        var ary = [{ key: 27, value: "A" }, { key: 46, value: "B" }, { key: 84, value: "C" }, { key: 84, value: "D" }];
        var expect = { key: 84, value: "C" };

        var res1 = Arrays.first(ary, function (obj) { return obj.key === 84; }, false);
        asr.deepEqual(res1, expect);

        var ary2 = [{ id: "B" }, { id: "D" }, { id: "D" }, { id: "F" }];

        var res2 = Arrays.first(ary2, (t1, t2) => t1.id == "D");
        asr.equal(res2, ary2[1]);

        asr.throws(() => Arrays.first(ary, function (obj) { return obj.key === 84; }, true));
    });


    test("firstProp", () => {
        var res1 = Arrays.firstProp([{ name: "billy", value: 5 }, { name: "sam", value: 5 }], "value", 5);
        asr.deepEqual(res1, { name: "billy", value: 5 });

        var res2 = Arrays.firstProp([{ name: "billy", value: 4 }, { name: "sam", value: 5 }], "value", 4, true);
        asr.deepEqual(res2, { name: "billy", value: 4 });

        var ary1 = [{ name: "billy", value: 4 }, { name: "sam", value: 5 }, { name: "will", value: 5 }];

        var res3 = Arrays.firstProp(ary1, "value", 5, false);
        asr.deepEqual(res3, { name: "sam", value: 5 });

        asr.throws(() => Arrays.firstProp(<typeof ary1>[], "value", 5, true));

        asr.throws(() => Arrays.firstProp(ary1, "value", 5, true));
    });


    test("getIfOneItem", () => {
        asr.equal(Arrays.getIfOneItem(null), null);
        asr.equal(Arrays.getIfOneItem(21), 21);
        asr.equal(Arrays.getIfOneItem([null]), null);
        asr.equal(Arrays.getIfOneItem(["abc"]), "abc");
        asr.equal(Arrays.getIfOneItem([]), null);
        asr.equal(Arrays.getIfOneItem([1, 2]), null);
    });


    test("hasItems", () => {
        var ary1 = [1];
        var ary0: number[] = [];
        var aryNull = null;

        asr.equal(Arrays.hasAny(ary1), true);
        asr.equal(Arrays.hasAny(ary0), false);
        asr.equal(Arrays.hasAny(aryNull), false);
    });


    test("indexOfProp", () => {
        var ary = [{ id: "B" }, { id: "D" }, { id: "D" }, { id: "F" }];

        asr.equal(Arrays.indexOfProp(ary, "id", "D"), 1);
        asr.equal(Arrays.indexOfProp(ary, "id", "F"), 3);
        asr.equal(Arrays.indexOfProp(ary, "id", "D", 2), 2);
        asr.equal(Arrays.indexOfProp(ary, "id", "D", 3), -1);
        asr.equal(Arrays.indexOfProp(ary, "id", "F", -2), 3);
        asr.equal(Arrays.indexOfProp(ary, "id", "D", -2), 2);
        asr.equal(Arrays.indexOfProp(ary, "id", "B", -2), -1);
        asr.equal(Arrays.indexOfProp(ary, "id", "B", -5), 0);
    });


    test("isOneItem", () => {
        asr.equal(Arrays.isOneItem(null), true);
        asr.equal(Arrays.isOneItem(21), true);
        asr.equal(Arrays.isOneItem([null]), true);
        asr.equal(Arrays.isOneItem(["abc"]), true);
        asr.equal(Arrays.isOneItem([]), false);
        asr.equal(Arrays.isOneItem([1, 2]), false);
    });


    test("last", () => {
        var ary = [{ id: "B" }, { id: "D" }, { id: "D" }, { id: "F" }];

        var res = Arrays.last(ary, (t1, t2) => t1.id == "D");
        asr.equal(res, ary[2]);
    });


    test("lastIndexOfProp", () => {
        var ary = [{ id: "B" }, { id: "D" }, { id: "D" }, { id: "F" }];

        var res = Arrays.lastIndexOfProp(ary, "id", "D");
        asr.equal(res, 2);
    });


    test("looseEqual", () => {
        var res1 = Arrays.looseEqual([26, "Alpha", 5], [5, 26, "Alpha"]);
        asr.equal(res1, true);

        var res2 = Arrays.looseEqual([34, "A", "QA"], [7, 34, "A"]);
        asr.equal(res2, false);
    });


    test("map", () => {
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


    test("mapFilter", () => {
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


    test("mapFilterNotNull", () => {
        var ary = [1, 2, "B", null, undefined, "C"];
        var res = Arrays.mapFilterNotNull(ary, (t) => t);
        asr.deepEqual(res, [1, 2, "B", "C"]);
    });


    test("max", () => {
        asr.equal(Arrays.max([NaN, 0, -0]), 0);
        asr.equal(Arrays.max([null, undefined, -2]), -2);
        asr.equal(Arrays.max([-1, 0, -2]), 0);
        asr.equal(Arrays.max([0, 2, 4]), 4);
        asr.equal(Arrays.max([5, 5]), 5);
    });


    test("maxValueIndex", () => {
        asr.equal(Arrays.maxValueIndex([NaN, 0, -0]), 1);
        asr.equal(Arrays.maxValueIndex([null, undefined, -2]), 2);
        asr.equal(Arrays.maxValueIndex([-1, 0, -2]), 1);
        asr.equal(Arrays.maxValueIndex([0, 2, 4]), 2);
        asr.equal(Arrays.maxValueIndex([5, 5]), 0);
    });


    test("min", () => {
        asr.equal(Arrays.min([NaN, 0, -0]), 0);
        asr.equal(Arrays.min([null, undefined, 2]), 2);
        asr.equal(Arrays.min([1, 0, 2]), 0);
        asr.equal(Arrays.min([-2, 2, 4]), -2);
        asr.equal(Arrays.min([-5, -5]), -5);
    });


    test("minValueIndex", () => {
        asr.equal(Arrays.minValueIndex([NaN, 0, -0]), 1);
        asr.equal(Arrays.minValueIndex([null, undefined, 2]), 2);
        asr.equal(Arrays.minValueIndex([1, 0, 2]), 1);
        asr.equal(Arrays.minValueIndex([-2, 2, 4]), 0);
        asr.equal(Arrays.minValueIndex([-5, -5]), 0);
    });


    test("pluck", () => {
        var ary = [{ id: "B" }, { id: "D" }, { id: "D" }, { id: "F" }];

        var res = Arrays.pluck(ary, "id");
        asr.deepEqual(res, ["B", "D", "D", "F"]);

        var res2 = Arrays.pluck(["AA", "AB", "BA", "BC"], 0);
        asr.deepEqual(res2, ["A", "A", "B", "B"]);

        var res = Arrays.pluck(ary, "id", true);
        asr.deepEqual(res, ["B", "D", "F"]);

        var res2 = Arrays.pluck(["AA", "AB", "BA", "BC"], 1, true);
        asr.deepEqual(res2, ["A", "B", "C"]);

        asr.deepEqual(Arrays.pluck([], 0), []);
        asr.deepEqual(Arrays.pluck(null, <never><any>0), []);
    });


    test("removeAll", () => {
        var res1 = Arrays.removeAll([2, 5, 3, 1, 4, 5], [5, 1]);
        asr.deepEqual(res1.sort(numSort), [2, 3, 4, 5]);

        var res2 = Arrays.removeAll([2, 3, 1, 3, 2], [2, 2, 3], true);
        asr.deepEqual(res2.sort(numSort), [1, 3]);

        var res2 = <number[]>Arrays.removeAll([2, 1], null);
        asr.deepEqual(res2.sort(numSort), [1, 2]);
    });


    test("removeIndex", () => {
        var ary = [11, 12];
        asr.strictEqual(Arrays.removeIndex(ary, -1), ary);

        asr.deepEqual(Arrays.removeIndex([], -1), []);
        asr.deepEqual(Arrays.removeIndex([], 0), []);
        asr.deepEqual(Arrays.removeIndex([], 1), []);
        asr.deepEqual(Arrays.removeIndex([11, 12], 2), [11, 12]);

        asr.deepEqual(Arrays.removeIndex(["Alpha", "Beta", "Gamma"], 0), ["Beta", "Gamma"]);
        asr.deepEqual(Arrays.removeIndex(["Alpha", "Beta", "Gamma"], 1), ["Alpha", "Gamma"]);
        asr.deepEqual(Arrays.removeIndex(["Alpha", "Beta", "Gamma"], 2), ["Alpha", "Beta"]);
    });


    test("removeValue", () => {
        var ary1 = ["A", "B", "C", "D"];
        var val1 = Arrays.removeValue(ary1, "B");
        asr.deepEqual(ary1, ["A", "C", "D"]);
        asr.equal(val1, 1);

        var ary2 = ["1", "2", "4", 3];
        var val2 = Arrays.removeValue(ary2, 3);
        asr.deepEqual(ary2, ["1", "2", "4"]);
        asr.equal(val2, 3);

        var ary3 = ["1", 2, "3", 4, "5"];
        var val3 = Arrays.removeValue(ary3, "3");
        asr.deepEqual(ary3, ["1", 2, 4, "5"]);
        asr.equal(val3, 2);
    });


    test("setAllProp", () => {
        var ary = [{ id: "B" }, { id: "D" }, { id: "D" }, { id: "F" }];
        var expect = [{ id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }];

        Arrays.setAllProp(ary, "id", <any>1);
        asr.deepEqual(<any[]>ary, expect);
    });


    test("sortNumeric", () => {
        var ary = [5, 2, 3, 1, 4];

        var res1 = Arrays.sortNumeric(ary.slice());
        asr.deepEqual(res1, [1, 2, 3, 4, 5]);

        var res2 = Arrays.sortNumeric(ary.slice(), true);
        asr.deepEqual(res2, [5, 4, 3, 2, 1]);

        var res3 = Arrays.sortNumeric([1, 1]);
        asr.deepEqual(res3, [1, 1]);
    });


    test("splice", () => {
        var res = Arrays.splice([0, 1, 1, 5], [10, 15, 20], 2, 1);
        asr.deepEqual(res, [0, 1, 10, 15, 20, 5]);

        var res2 = Arrays.splice([2, 3], [0, 1], 0, 0);
        asr.deepEqual(res2, [0, 1, 2, 3]);

        var res3 = Arrays.splice([0, 1], [2, 3], 2, 0);
        asr.deepEqual(res3, [0, 1, 2, 3]);

        var res4 = Arrays.splice(null, [8, 9], 2, 0);
        asr.deepEqual(res4, [8, 9]);

        var res5 = Arrays.splice(null, null, 2, 0);
        asr.deepEqual(res5, []);

        var res6 = Arrays.splice([1, 2, 3], null, 1, 0);
        asr.deepEqual(res6, [1, 2, 3]);

        var res7 = Arrays.splice([11, 12, 13], null, 1, 2);
        asr.deepEqual(res7, [11]);

        var res8 = Arrays.splice([1, 2, 3], [], 1, 0);
        asr.deepEqual(res8, [1, 2, 3]);

        var res9 = Arrays.splice([11, 12, 13], [], 0, 2);
        asr.deepEqual(res9, [13]);


        // splice without copy
        var in0 = [6, 7];
        var res0 = Arrays.splice(in0, [8], 2, 0, false);
        asr.deepEqual(res0, [6, 7, 8]);
        // the returned array is the original array
        asr.strictEqual(res0, in0);

        // splice copy
        var in1 = [6, 7];
        var res1 = Arrays.splice(in1, [8], 2, 0, true);
        asr.deepEqual(res1, [6, 7, 8]);
        // the returned array is a copy of the input array even if no elements are being added
        asr.notStrictEqual(res1, in1);
        // the original array is not modified
        asr.deepEqual(in1, [6, 7]);
    });


    test("sum", () => {
        var ary1 = [1, 2, 3, 4];
        equalNum(Arrays.sum(ary1), 10);
        equalNum(Arrays.sum(ary1, true), 10);
        equalNum(Arrays.sum(ary1, false), 10);

        var ary2 = [2, null, Number.POSITIVE_INFINITY, 4, NaN, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY];
        equalNum(Arrays.sum(ary2), NaN);
        equalNum(Arrays.sum(ary2, true), 6);
        equalNum(Arrays.sum(ary2, false), NaN);
    });


    test("swap", () => {
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


    test("toMap", () => {
        var res = Arrays.toMap(<{ s: string; t: number }[]>[{ s: "A", t: 0 }, { s: "B", t: 1 }, { s: "C", t: 2 }], "s");
        asr.deepEqual(res, {
            A: { s: "A", t: 0 },
            B: { s: "B", t: 1 },
            C: { s: "C", t: 2 }
        });

        var res2 = Arrays.toMap(<{ s: string; t: number }[]>[{ s: "A", t: 0 }, { s: "A", t: 1 }, { s: "B", t: 1 }, { s: "C", t: 2 }], "s", false); // allow duplicates
        asr.deepEqual(res2, {
            A: { s: "A", t: 1 },
            B: { s: "B", t: 1 },
            C: { s: "C", t: 2 }
        });

        var res3 = Arrays.toMap(<{ readonly [index: number]: string }[]>["AB", "BBC", "C"], 0);
        asr.deepEqual(res3, {
            A: "AB",
            B: "BBC",
            C: "C",
        });

        asr.throws(() => Arrays.toMap([{ k: "A" }, { k: "A" }], "k"));

        asr.deepEqual(Arrays.toMap([], <never><any>""), {});
        asr.deepEqual(Arrays.toMap(null, <never><any>""), {});
    });


    test("groupBy", () => {
        var ary = [{ s: "A", t: 0 }, { s: "A", t: 1 }, { s: "B", t: 2 }, { s: "C", t: 3 }, { s: "C", t: 5 }];

        var grouping = Arrays.groupBy(ary, "s");
        asr.deepEqual(grouping, {
            "A": [{ s: "A", t: 0 }, { s: "A", t: 1 }],
            "B": [{ s: "B", t: 2 }],
            "C": [{ s: "C", t: 3 }, { s: "C", t: 5 }],
        });

        var grouping2 = Arrays.groupBy([{ k: "A", v: 10 }, { k: "A", v: 12 }, { k: "B", v: 15 }, { k: "C", v: 24 }, { k: "C", v: 42 }], "k");
        asr.deepEqual(grouping2, {
            A: [{ k: "A", v: 10 }, { k: "A", v: 12 }],
            B: [{ k: "B", v: 15 }],
            C: [{ k: "C", v: 24 }, { k: "C", v: 42 }]
        });
    });


    test("union", () => {
        var ary1 = ["A", "B", "C", "D", "1"];
        var ary2 = ["B", "C", "D", "2"];

        var aryUnion = Arrays.union(ary1, ary2);
        asr.deepEqual(aryUnion, ["B", "C", "D"]);
    });

});

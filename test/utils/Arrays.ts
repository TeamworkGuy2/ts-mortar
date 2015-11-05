//import QUnit = require("qunit"); // implicitly setup by 'qunit-tests' in root of project, run using node.js
import Arrays = require("../../../TsMortar/utils/Arrays");


QUnit.module("Arrays", {
});


QUnit.test("addAll", function addAllTest(sr) {
    var ary1 = [1, 2, 4];
    var ary2 = [8, 16];

    var res = Arrays.addAll(ary1.slice(), ary2.slice());
    sr.deepEqual(res, [1, 2, 4, 8, 16]);
});


QUnit.test("addAllTransform", function addAllTransformTest(sr) {
    var ary1 = [{ id: 1 }, { id: 2 }, { id: 4 }];
    var ary2 = ['{"id": 8}', '{"id": 16}'];

    var res = Arrays.addAllTransform(ary1.slice(), ary2.slice(), (t) => <{ id: number }>JSON.parse(t));
    sr.deepEqual(res, [{ id: 1 }, { id: 2 }, { id: 4 }, { id: 8 }, { id: 16 }]);
});


QUnit.test("asArray", function asArrayTest(sr) {
    var obj1 = { name: "A" };

    var res = Arrays.asArray(obj1);
    sr.deepEqual(res, [obj1]);

    var res = Arrays.asArray([obj1]);
    sr.deepEqual(res, [obj1]);
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


QUnit.test("findAllProp", function findAllPropTest(sr) {
    var res = Arrays.findAllProp([{ name: "billy", value: 5 }, { name: "sam", value: 5 }, { name: "overhill", value: 3 }], "value", 5);
    var expect = [{ name: "billy", value: 5 }, { name: "sam", value: 5 }];

    sr.deepEqual(res, expect);
});


QUnit.test("findProp", function findPropTest(sr) {
    var res = Arrays.findProp([{ name: "billy", value: 5 }, { name: "sam", value: 5 }], "value", 5);
    var expect = { name: "billy", value: 5 };

    sr.deepEqual(res, expect);
});


QUnit.test("findOne", function findOneTest(sr) {
    var ary = [{ key: 27, value: "A" }, { key: 46, value: "B" }, { key: 84, value: "C" }, { key: 84, value: "D" }];
    var expect = { key: 84, value: "C" };

    var res1 = Arrays.findOne(ary, function (obj) { return obj.key === 84; }, false);
    sr.deepEqual(res1, expect);

    try {
        var res2 = Arrays.findOne(ary, function (obj) { return obj.key === 84; }, true);
        sr.equal(false, true, "find one should have thrown an error");
    } catch (err) {
        sr.equal(true, true);
    }
});


QUnit.test("findOneByProp", function findOneByPropTest(sr) {
    var ary1 = [{ name: "billy", value: 4 }, { name: "sam", value: 5 }, { name: "will", value: 5 }];
    var expect1 = { name: "sam", value: 5 };

    var res1 = Arrays.findOneByProp(ary1, "value", 5, false);
    sr.deepEqual(res1, expect1);

    try {
        var res2 = Arrays.findOneByProp(ary1, "value", 5, true);
        sr.equal(false, true, "find one by prop should have thrown an error");
    } catch (err) {
        sr.equal(true, true);
    }
});


QUnit.test("first", function firstTest(sr) {
    var ary = [{ id: "B" }, { id: "D" }, { id: "D" }, { id: "F" }];

    var res = Arrays.first(ary, (t1, t2) => t1.id == "D");
    sr.equal(res, ary[1]);
});


QUnit.test("getAllProp", function getAllPropTest(sr) {
    var ary = [{ id: "B" }, { id: "D" }, { id: "D" }, { id: "F" }];

    var res = Arrays.getAllProp(ary, "id");
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

    var res = Arrays.last(ary, (t1, t2) => t1.id == "D");
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
    sr.deepEqual(res.sort((a, b) => a - b), [1, 3, 4]);
});


QUnit.test("looseEqual", function looseEqualTest(sr) {
    var res1 = Arrays.looseEqual([26, "Alpha", 5], [5, 26, "Alpha"]);
    sr.equal(res1, true);

    var res2 = Arrays.looseEqual([34, "A", "QA"], [7, 34, "A"]);
    sr.equal(res2, false);
});


QUnit.test("mapFilter", function mapFilterTest(sr) {
    var ary = [1, 2, 3, 4, 5, 6];

    var res = Arrays.mapFilter(ary, (val, res) => res.isValid = (val % 2 === 1));
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
    var res = Arrays.mapFilterNotNull(ary, (t) => t);
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
});


QUnit.test("spliceArray", function spliceArrayTest(sr) {
    var origAry = [1, 2, 8, 9, 6];
    var insertAry = [3, 4, 5];

    var res = Arrays.spliceArray(origAry, insertAry, 2, 2);
    sr.deepEqual(res, [1, 2, 3, 4, 5, 6]);
});


QUnit.test("union", function unionTest(sr) {
    var ary1 = ["A", "B", "C", "D", "1"];
    var ary2 = ["B", "C", "D", "2"];

    var aryUnion = Arrays.union(ary1, ary2);
    sr.deepEqual(aryUnion, ["B", "C", "D"]);
});


QUnit.test("unique", function uniqueTest(sr) {
    var ary = ["B", "D", "D", "F"];
    var aryUnique = ["B", "D", "F"];

    sr.deepEqual(Arrays.unique(ary), aryUnique);
    sr.deepEqual(Arrays.unique([]), []);
});

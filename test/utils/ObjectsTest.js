"use strict";
//import QUnit = require("qunit"); // implicitly setup by 'qunit-tests' in root of project, run using node.js
var Objects = require("../../../ts-mortar/utils/Objects");
var item = {
    id: 12345,
    product_id: "34A3CD4Y",
    name: "Tark Minar Minature Globe",
    description: "A beautifully crafted blown glass Tark Minar replica, full color, set on a porcelain base.",
    weight_nars: 2.35,
    cost_wiggins: 15.3,
    optional: null
};
var itemKeys = [];
var itemValues = [];
var nums = {
    a: 1,
    b: 2,
    c: 3
};
var numsKeys = [];
var numsValues = [];
(function () {
    itemKeys = Object.keys(item);
    for (var i = 0, size = itemKeys.length; i < size; i++) {
        itemValues.push(item[itemKeys[i]]);
    }
    numsKeys = Object.keys(nums);
    for (var i = 0, size = numsKeys.length; i < size; i++) {
        numsValues.push(nums[numsKeys[i]]);
    }
}());
function dateA() { return new Date(1999, 5, 4, 3, 2, 1, 0); }
QUnit.module("Objects", {});
QUnit.test("values", function valuesTest(sr) {
    var res1 = Objects.values(item, itemKeys);
    sr.deepEqual(res1, itemValues);
    var res2 = Objects.values(nums, numsKeys);
    sr.deepEqual(res2, numsValues);
});
QUnit.test("valuesNotNull", function valuesNotNullTest(sr) {
    var keys = itemKeys.slice();
    var idx = keys.indexOf("optional");
    var tmp = keys[idx];
    keys[idx] = keys[keys.length - 1];
    keys.pop();
    var vals = [];
    for (var i = 0, size = keys.length; i < size; i++) {
        vals.push(item[keys[i]]);
    }
    var res1 = Objects.valuesNotNull(item);
    sr.deepEqual(res1, vals);
    var res2 = Objects.valuesNotNull({ a: undefined, b: null, c: 0, d: false, e: "true", f: 2 }, ["a", "b", "c", "d"]);
    sr.deepEqual(res2, [0, false]);
});
QUnit.test("hasAnyNonFalseyProps", function hasAnyNonFalseyPropsTest(sr) {
    var res1 = Objects.hasAnyNonFalseyProps({ falsey: false, undefined: undefined }, ["falsey", "undefined"]);
    sr.equal(res1, false);
    var res2 = Objects.hasAnyNonFalseyProps({ falsey: false, null: null, obj: {} }, ["falsey", "null", "obj"]);
    sr.equal(res2, true);
});
QUnit.test("hasAnyNonNullProps", function hasAnyNonNullPropsTest(sr) {
    var res1 = Objects.hasAnyNonNullProps({ null: null, undefined: undefined }, ["null", "undefined"]);
    sr.equal(res1, false);
    var res2 = Objects.hasAnyNonNullProps({ falsey: false, null: null }, ["falsey", "null"]);
    sr.equal(res2, true);
});
QUnit.test("hasNonNullProps", function hasNonNullPropsTest(sr) {
    var res1 = Objects.hasNonNullProps({ null: null, undefined: undefined }, ["null", "undefined"]);
    sr.equal(res1, false);
    var res2 = Objects.hasNonNullProps({ falsey: false, arg: "" }, ["falsey", "arg"]);
    sr.equal(res2, true);
});
QUnit.test("hasMatchingProps", function hasMatchingPropsTest(sr) {
    var res1 = Objects.hasMatchingProps(item, itemKeys, function (v) { return !!v; }, itemKeys.length);
    sr.equal(res1, false);
    var res2 = Objects.hasMatchingProps(item, itemKeys, function (v) { return !!v; }, itemKeys.length - 1);
    sr.equal(res2, true);
    var res3 = Objects.hasMatchingProps(item, itemKeys, function (v) { return true; }, itemKeys.length + 1);
    sr.equal(res3, false);
});
QUnit.test("clone", function cloneTest(sr) {
    var src1 = {
        a: "A",
        b: { 1: 1, 2: 2, 3: 3 },
        c: {
            c1: [1, 2, 4, 8],
            c2: { c2a: [{ sup: "alpha" }, { sub: { text: true, values: [false, 1.3, "t", "a"] } }] },
            c3: ["1-dimension", ["2", "dimension"], ["3", "-", "dimension"]],
        },
    };
    var src1a = {
        a: "A",
        b: { 1: 1, 2: 2, 3: 3 },
        c: {
            c1: [1, 2, 4, 8],
            c2: { c2a: [{ sup: "alpha" }, { sub: { text: true, values: [false, 1.3, "t", "a"] } }] },
            c3: ["1-dimension", ["2", "dimension"], ["3", "-", "dimension"]],
        },
    };
    var src1b = {
        a: "A",
        b: { 1: 1, 2: 2, 3: 3 },
        c: {
            c1: [1, 2, 4, 8],
            c2: { c2a: [{ sup: "alpha" }, { sub: { text: true, values: [false, 1.3, "t", "a"] } }] },
            c3: ["1-dimension", ["2", "dimension"], ["3", "-", "dimension"]],
        },
    };
    var res1 = Objects.clone(src1a);
    src1a.a = null;
    sr.deepEqual(res1, src1);
    var res2 = Objects.clone(src1b);
    src1b.c.c1 = null;
    sr.notDeepEqual(res2, src1);
    var now = new Date();
    sr.deepEqual(Objects.clone("a"), "a");
    sr.deepEqual(Objects.clone(12), 12);
    sr.deepEqual(Objects.clone(now).getTime(), now.getTime());
});
QUnit.test("cloneDeep", function cloneDeepTest(sr) {
    var src1 = {
        a: "A",
        b: { 1: 1, 2: 2, 3: 3, date: dateA() },
        c: {
            c1: [1, 2, 4, 8],
            c2: { c2a: [{ sup: "alpha" }, { sub: { text: "beta", values: [false, 1.3, "t", "a"] } }] },
            c3: ["1-dimension", ["2", "dimension"], ["3", "-", "dimension"]],
        },
    };
    var src1a = {
        a: "A",
        b: { 1: 1, 2: 2, 3: 3, date: dateA() },
        c: {
            c1: [1, 2, 4, 8],
            c2: { c2a: [{ sup: "alpha" }, { sub: { text: "beta", values: [false, 1.3, "t", "a"] } }] },
            c3: ["1-dimension", ["2", "dimension"], ["3", "-", "dimension"]],
        },
    };
    var src1b = {
        a: "A",
        b: { 1: 1, 2: 2, 3: 3, date: dateA() },
        c: {
            c1: [1, 2, 4, 8],
            c2: { c2a: [{ sup: "alpha" }, { sub: { text: "beta", values: [false, 1.3, "t", "a"] } }] },
            c3: ["1-dimension", ["2", "dimension"], ["3", "-", "dimension"]],
        },
    };
    var res1 = Objects.cloneDeep(src1a);
    var res2 = Objects.cloneDeep(src1b);
    // check copied dates, first modify the original object dates, then ensure the copies match the original
    src1a.b.date.setUTCFullYear(2025, 11, 25);
    src1b.b.date.setUTCFullYear(2025, 11, 25);
    sr.equal(res1.b.date.toISOString(), src1.b.date.toISOString());
    sr.equal(res2.b.date.toISOString(), src1.b.date.toISOString());
    // convert the dates to timestamps since deepEqual doesn't compare dates properly
    res1.b.date = res1.b.date.toISOString();
    res2.b.date = res2.b.date.toISOString();
    src1.b.date = src1.b.date.toISOString();
    src1a.a = null;
    sr.deepEqual(res1, src1);
    src1b.c.c1 = null;
    sr.deepEqual(res2, src1);
    // check primitives
    sr.equal(Objects.cloneDeep("mtr1"), "mtr1");
    sr.equal(Objects.cloneDeep(28947), 28947);
    sr.equal(Objects.cloneDeep(-81), -81);
    sr.equal(Objects.cloneDeep(false), false);
    sr.equal(Objects.cloneDeep(true), true);
});
QUnit.test("assign", function assignTest(sr) {
    var src1 = Objects.assign({ a: "Q", b: 2 }, { a: "Z", b: "B", c: 3 });
    var res1 = { a: "Z", b: "B", c: 3 };
    sr.deepEqual(src1, res1);
    // test explicit keys
    var src2 = Objects.assign({ a: "Q", b: 2 }, { a: "Z", b: "B", c: 3 }, ["a", "c"]);
    var res2 = { a: "Z", b: 2, c: 3 };
    sr.deepEqual(src2, res2);
});
QUnit.test("assignAll", function assignAllTest(sr) {
    var src1 = Objects.assignAll({ a: "Q", b: 2 }, [{ a: "Z", b: "B", c: 3 }, { a: "A", d: 4 }]);
    var res1 = { a: "A", b: "B", c: 3, d: 4 };
    sr.deepEqual(src1, res1);
    // test explicit keys
    var src2 = Objects.assignAll({ a: "Q", b: 2 }, [{ a: "Z", b: "B", c: 3, d: "!" }, { b: 2 }, { a: "A", d: 4 }], [["a", "b", "c"], null, ["d"]]);
    var res2 = { a: "Z", b: 2, c: 3, d: 4 };
    sr.deepEqual(src2, res2);
});
QUnit.test("getProps", function getPropsTest(sr) {
    var res1 = Objects.getProps(undefined, ["alpha", "beta"]);
    sr.deepEqual(res1, []);
    var res2 = Objects.getProps({ alpha: 342, beta: "B" }, ["alpha", "beta"]);
    sr.deepEqual(res2, [342, "B"]);
});
QUnit.test("orEmptyString", function orEmptyStringTest(sr) {
    sr.equal(Objects.orEmptyString(8543.213), 8543.213);
    sr.equal(Objects.orEmptyString(null), "");
});
QUnit.test("extend", function extendTest(sr) {
    function Parent() { }
    Parent.prototype.step = function () { return "parent-step"; };
    Parent.prototype.num = function () { return 2; };
    function Child() { }
    Child.prototype.step = function () { return "child-step"; };
    var childPre = new Child();
    sr.equal(childPre.num, undefined);
    Objects.extend(Child, Parent, false);
    var parentInst = new Parent();
    sr.equal(parentInst.step(), "parent-step");
    var childPost = new Child();
    sr.equal(childPost.step(), "child-step");
    Objects.extend(Child, Parent, true);
    sr.equal(childPost.num(), 2);
});
QUnit.test("extendToStatic", function extendToStaticTest(sr) {
    function Parent() { }
    Parent.prototype.step = function () { return "parent"; };
    Parent.prototype.num = function () { return 2; };
    var Child = {
        step: function () { return "child"; },
        descriptor: "child-string"
    };
    sr.equal(Child.step(), "child");
    sr.equal(Child["num"], undefined);
    try {
        Objects.extendToStatic(Child, Parent, true, true);
        sr.equal(false, true);
    }
    catch (err) {
        sr.equal(true, true);
    }
    try {
        Objects.extendToStatic(Child, Parent, true, true);
        sr.equal(false, true);
    }
    catch (err) {
        sr.equal(true, true);
    }
    var parentInst = new Parent();
    sr.equal(parentInst.step(), "parent");
    Objects.extendToStatic(Child, Parent, true, false);
    sr.equal(Child["num"](), 2);
});
QUnit.test("invert", function invertTest(sr) {
    var date = new Date();
    var src1 = {
        "Abc": 123,
        "key": "value",
        "01": 10,
        55: 44
    };
    var src1Invert = {
        "123": "Abc",
        "value": "key",
        "10": "01",
        "44": "55"
    };
    sr.deepEqual(Objects.invert(src1), src1Invert);
    var b = {};
    b[date.toString()] = date;
    var bInvert = {};
    bInvert[date.toString()] = date.toString();
    sr.deepEqual(Objects.invert(b), bInvert);
});
QUnit.test("map", function mapTest(sr) {
    var res1 = Objects.map({ sub: 123, sup: 312, arc: "a" }, null, function (key, value) { return value.toString().substr(0, 2); });
    sr.deepEqual(res1, { sub: "12", sup: "31", arc: "a" });
    var res2 = Objects.map({ a: {}, b: 2.4, c: true }, function (key, value) { return typeof value === "number" ? value * 2 : key + ": " + value.toString(); });
    sr.deepEqual(res2, { a: "a: [object Object]", b: 4.8, c: "c: true" });
    var objA = {};
    var res3 = Objects.map({ a: objA, b: false, c: 4.8, e: false }, ["a", "c", "e"], function (key, value) { return value != false ? value : undefined; });
    sr.deepEqual(res3, { a: objA, c: 4.8 });
    var res4 = Objects.map(objA);
    sr.deepEqual(res4, objA);
    sr.deepEqual(Objects.map(null), null);
});
QUnit.test("toArray", function toArrayTest(sr) {
    var src = {
        "key": "value",
        "Abc": true,
        "01": 10,
        55: dateA()
    };
    var res1 = Objects.toArray(src, ["key", "Abc", "01", "55"], function (k, v) { return typeof v === "number" ? v * 2 : v.toString(); });
    sr.deepEqual(res1, ["value", "true", 20, dateA().toString()]);
    var res2 = Objects.toArray({ n: "21" }, function (k, v) { return parseFloat(v.toString().split("").reverse().join("")); });
    sr.deepEqual(res2, [12]);
    sr.deepEqual(Objects.toArray(null, function () { return null; }), []);
});

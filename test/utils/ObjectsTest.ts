import chai = require("chai");
import mocha = require("mocha");
import Objects = require("../../../ts-mortar/utils/Objects");

var asr = chai.assert;


suite("Objects", function ObjectsTest() {

    var item = {
        id: 12345,
        product_id: "34A3CD4Y",
        name: "Tark Minar Minature Globe",
        description: "A beautifully crafted blown glass Tark Minar replica, full color, set on a porcelain base.",
        weight_nars: 2.35,
        cost_wiggins: 15.3,
        optional: null
    };

    var itemKeys: string[] = [];
    var itemValues: any[] = []

    var nums: { [id: string]: number } = {
        a: 1,
        b: 2,
        c: 3
    };

    var numsKeys: string[] = [];
    var numsValues: number[] = [];

    (function () {
        itemKeys = Object.keys(item);
        for (var i = 0, size = itemKeys.length; i < size; i++) {
            itemValues.push(item[itemKeys[i]]);
        }

        numsKeys = Object.keys(nums);
        for (var i = 0, size = numsKeys.length; i < size; i++) {
            numsValues.push(nums[numsKeys[i]]);
        }
    } ());


    function dateA() { return new Date(1999, 5, 4, 3, 2, 1, 0); }


    test("values", function valuesTest() {
        var res1 = Objects.values(<{ [id: string]: any }>item, itemKeys);
        asr.deepEqual(res1, itemValues);

        var res2 = Objects.values(nums, numsKeys);
        asr.deepEqual(res2, numsValues);
    });


    test("valuesNotNull", function valuesNotNullTest() {
        var keys = itemKeys.slice();
        var idx = keys.indexOf("optional");
        var tmp = keys[idx];
        keys[idx] = keys[keys.length - 1];
        keys.pop();
        var vals = [];
        for (var i = 0, size = keys.length; i < size; i++) {
            vals.push(item[keys[i]]);
        }

        var res1 = Objects.valuesNotNull(<{ [id: string]: any }>item);
        asr.deepEqual(res1, vals);

        var res2 = Objects.valuesNotNull({ a: undefined, b: null, c: 0, d: false, e: "true", f: 2 }, ["a", "b", "c", "d"]);
        asr.deepEqual(res2, [0, false]);
    });


    test("hasAnyNonFalseyProps", function hasAnyNonFalseyPropsTest() {
        var res1 = Objects.hasAnyNonFalseyProps({ falsey: false, undefined: undefined }, ["falsey", "undefined"]);
        asr.equal(res1, false);

        var res2 = Objects.hasAnyNonFalseyProps({ falsey: false, null: null, obj: {} }, ["falsey", "null", "obj"]);
        asr.equal(res2, true);
    });


    test("hasAnyNonNullProps", function hasAnyNonNullPropsTest() {
        var res1 = Objects.hasAnyNonNullProps({ null: null, undefined: undefined }, ["null", "undefined"]);
        asr.equal(res1, false);

        var res2 = Objects.hasAnyNonNullProps({ falsey: false, null: null }, ["falsey", "null"]);
        asr.equal(res2, true);
    });


    test("hasNonNullProps", function hasNonNullPropsTest() {
        var res1 = Objects.hasNonNullProps({ null: null, undefined: undefined }, ["null", "undefined"]);
        asr.equal(res1, false);

        var res2 = Objects.hasNonNullProps({ falsey: false, arg: "" }, ["falsey", "arg"]);
        asr.equal(res2, true);
    });


    test("hasMatchingProps", function hasMatchingPropsTest() {
        var res1 = Objects.hasMatchingProps(item, itemKeys, (v) => !!v, itemKeys.length);
        asr.equal(res1, false);

        var res2 = Objects.hasMatchingProps(item, itemKeys, (v) => !!v, itemKeys.length - 1);
        asr.equal(res2, true);

        var res3 = Objects.hasMatchingProps(item, itemKeys, (v) => true, itemKeys.length + 1);
        asr.equal(res3, false);
    });


    test("clone", function cloneTest() {
        function createOrig() {
            return {
                a: "A",
                b: { 1: 1, 2: 2, 3: 3 },
                c: {
                    c1: [1, 2, 4, 8],
                    c2: { c2a: [{ sup: "alpha" }, { sub: { text: true, values: [false, 1.3, "t", "a"] } }] },
                    c3: ["1-dimension", ["2", "dimension"], ["3", "-", "dimension"]],
                },
                d: undefined,
                e: null,
            };
        }

        function createOrigNonUndefined() {
            return {
                a: "A",
                b: { 1: 1, 2: 2, 3: 3 },
                c: {
                    c1: [1, 2, 4, 8],
                    c2: { c2a: [{ sup: "alpha" }, { sub: { text: true, values: [false, 1.3, "t", "a"] } }] },
                    c3: ["1-dimension", ["2", "dimension"], ["3", "-", "dimension"]],
                },
                e: null,
            };
        }

        var orig = createOrig();

        // test changing base property
        var src1 = createOrig();
        var res1 = Objects.clone(src1);
        src1.a = null;
        asr.deepEqual(res1, orig);

        // test changing nested proeprty
        var src2 = createOrig();
        var res2 = Objects.clone(src2);
        src2.c.c1 = null;
        asr.notDeepEqual(res2, orig);

        // test non-undefined clone
        var src3 = createOrig();
        var res3 = Objects.clone(src3, Objects.assignNonUndefined);
        src3.a = null;
        asr.deepEqual(res3, createOrigNonUndefined());

        var now = new Date();

        asr.deepEqual(Objects.clone("a"), "a");
        asr.deepEqual(Objects.clone(12), 12);
        asr.deepEqual(Objects.clone(now).getTime(), now.getTime());
    });


    test("cloneDeep", function cloneDeepTest() {
        function createOrig() {
            return {
                a: "A",
                b: { 1: 1, 2: 2, 3: 3, date: dateA() },
                c: {
                    c1: [1, 2, 4, 8],
                    c2: { c2a: [{ sup: "alpha" }, { sub: { text: "beta", values: [false, 1.3, "t", "a"] } }] },
                    c3: ["1-dimension", ["2", "dimension"], ["3", "-", "dimension"]],
                    c4: undefined,
                },
                d: undefined,
                e: null,
            };
        }

        function createOrigNonUndefined() {
            return {
                a: "A",
                b: { 1: 1, 2: 2, 3: 3, date: dateA() },
                c: {
                    c1: [1, 2, 4, 8],
                    c2: { c2a: [{ sup: "alpha" }, { sub: { text: "beta", values: [false, 1.3, "t", "a"] } }] },
                    c3: ["1-dimension", ["2", "dimension"], ["3", "-", "dimension"]],
                },
                e: null,
            };
        }

        var orig = createOrig();

        var src1 = createOrig();
        var res1 = Objects.cloneDeep(src1);

        var src2 = createOrig();
        var res2 = Objects.cloneDeep(src2);

        // check copied dates, first modify the original object dates, then ensure the copies match the original
        src1.b.date.setUTCFullYear(2025, 11, 25);
        src2.b.date.setUTCFullYear(2025, 11, 25);

        asr.equal(res1.b.date.toISOString(), orig.b.date.toISOString());
        asr.equal(res2.b.date.toISOString(), orig.b.date.toISOString());

        // convert the dates to timestamps since deepEqual doesn't compare dates properly
        res1.b.date = <any>res1.b.date.toISOString();
        res2.b.date = <any>res2.b.date.toISOString();
        orig.b.date = <any>orig.b.date.toISOString();

        src1.a = null;
        asr.deepEqual(res1, orig);

        src2.c.c1 = null;
        asr.deepEqual(res2, orig);

        // check non-undefined clone deep
        var src3 = createOrig();
        asr.deepEqual(Objects.cloneDeepNonUndefined(src3), createOrigNonUndefined());

        // check primitives
        asr.equal(Objects.cloneDeep("mtr1"), "mtr1");
        asr.equal(Objects.cloneDeep(28947), 28947);
        asr.equal(Objects.cloneDeep(-81), -81);
        asr.equal(Objects.cloneDeep(false), false);
        asr.equal(Objects.cloneDeep(true), true);
    });


    test("assign", function assignTest() {
        var src1 = Objects.assign({ a: "Q", b: 2 }, { a: "Z", b: "B", c: 3 });
        var res1 = { a: "Z", b: "B", c: 3 };
        asr.deepEqual(src1, res1);

        // test explicit keys
        var src2 = Objects.assign({ a: "Q", b: 2 }, { a: "Z", b: "B", c: 3 }, ["a", "c"]);
        var res2 = { a: "Z", b: 2, c: 3 };
        asr.deepEqual(src2, res2);
    });


    test("assignAll", function assignAllTest() {
        var src1 = Objects.assignAll({ a: "Q", b: 2 }, [{ a: "Z", b: "B", c: 3 }, { a: "A", d: 4 }]);
        var res1 = { a: "A", b: "B", c: 3, d: 4 };
        asr.deepEqual(src1, res1);

        // test explicit keys
        var src2 = Objects.assignAll({ a: "Q", b: 2 }, [{ a: "Z", b: "B", c: 3, d: "!" }, { b: 2 }, { a: "A", d: 4 }], [["a", "b", "c"], null, ["d"]]);
        var res2 = { a: "Z", b: 2, c: 3, d: 4 };
        asr.deepEqual(src2, res2);
    });


    test("getProps", function getPropsTest() {
        var res1 = Objects.getProps(undefined, ["alpha", "beta"]);
        asr.deepEqual(res1, []);

        var res2 = Objects.getProps({ alpha: 342, beta: "B" }, ["alpha", "beta"]);
        asr.deepEqual(res2, [342, "B"]);
    });


    test("orEmptyString", function orEmptyStringTest() {
        asr.equal(Objects.orEmptyString(8543.213), 8543.213);

        asr.equal(Objects.orEmptyString(null), "");
    });


    test("extend", function extendTest() {
        function Parent() { }
        Parent.prototype.step = function () { return "parent-step"; };
        Parent.prototype.num = function () { return 2; };
        function Child() { }
        Child.prototype.step = function () { return "child-step"; };

        var childPre = new Child();
        asr.equal(childPre.num, undefined);

        Objects.extend(Child, Parent, false);

        var parentInst = new Parent();
        asr.equal(parentInst.step(), "parent-step");

        var childPost = new Child();
        asr.equal(childPost.step(), "child-step");

        Objects.extend(Child, Parent, true);

        asr.equal(childPost.num(), 2);
    });


    test("extendToStatic", function extendToStaticTest() {
        function Parent() { }
        Parent.prototype.step = function () { return "parent"; };
        Parent.prototype.num = function () { return 2; };

        var Child = {
            step: function () { return "child"; },
            descriptor: "child-string"
        };

        asr.equal(Child.step(), "child");

        asr.equal(Child["num"], undefined);

        try {
            Objects.extendToStatic(Child, Parent, true, true);
            asr.equal(false, true);
        } catch (err) {
            asr.equal(true, true);
        }


        try {
            Objects.extendToStatic(Child, Parent, true, true);
            asr.equal(false, true);
        } catch (err) {
            asr.equal(true, true);
        }

        var parentInst = new Parent();
        asr.equal(parentInst.step(), "parent");

        Objects.extendToStatic(Child, Parent, true, false);

        asr.equal(Child["num"](), 2);
    });


    test("invert", function invertTest() {
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

        asr.deepEqual(Objects.invert(src1), src1Invert);

        var b = {};
        b[date.toString()] = date;
        var bInvert = {};
        bInvert[date.toString()] = date.toString();

        asr.deepEqual(Objects.invert(b), bInvert);
    });


    test("map", function mapTest() {
        var res1 = Objects.map({ sub: 123, sup: 312, arc: "a" }, null, (key, value) => value.toString().substr(0, 2));
        asr.deepEqual(res1, { sub: "12", sup: "31", arc: "a" });

        var res2 = Objects.map({ a: {}, b: 2.4, c: true }, (key, value) => typeof value === "number" ? value * 2 : key + ": " + value.toString());
        asr.deepEqual(res2, { a: "a: [object Object]", b: 4.8, c: "c: true" });

        var objA = {};
        var res3 = <any>Objects.map({ a: objA, b: false, c: 4.8, e: false }, ["a", "c", "e"], (key, value) => value != false ? value : undefined);

        asr.deepEqual(res3, { a: objA, c: 4.8 });

        var res4 = Objects.map(objA);
        asr.deepEqual(res4, objA);

        asr.deepEqual(Objects.map(null), null);
    });


    test("toArray", function toArrayTest() {
        var src = {
            "key": "value",
            "Abc": true,
            "01": 10,
            55: dateA()
        };

        var res1 = Objects.toArray(src, ["key", "Abc", "01", "55"], (k, v) => typeof v === "number" ? v * 2 : v.toString());
        asr.deepEqual(res1, ["value", "true", 20, dateA().toString()]);

        var res2 = Objects.toArray({ n: "21" }, (k, v) => parseFloat(v.toString().split("").reverse().join("")));
        asr.deepEqual(res2, [12]);

        asr.deepEqual(Objects.toArray(null, () => null), []);
    });

});

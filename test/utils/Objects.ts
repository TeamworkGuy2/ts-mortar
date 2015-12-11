//import QUnit = require("qunit"); // implicitly setup by 'qunit-tests' in root of project, run using node.js
import Objects = require("../../../ts-mortar/utils/Objects");


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


QUnit.module("Objects", {
});


QUnit.test("values", function valuesTest(sr) {
    var res1 = Objects.values(<{ [id: string]: any }>item, itemKeys);
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

    var res1 = Objects.valuesNotNull(<{ [id: string]: any }>item);
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
    var res1 = Objects.hasMatchingProps(item, itemKeys, (v) => !!v, itemKeys.length);
    sr.equal(res1, false);

    var res2 = Objects.hasMatchingProps(item, itemKeys, (v) => !!v, itemKeys.length - 1);
    sr.equal(res2, true);

    var res3 = Objects.hasMatchingProps(item, itemKeys, (v) => true, itemKeys.length + 1);
    sr.equal(res3, false);
});


QUnit.test("coalesce", function coalesceTest(sr) {
    var res1 = Objects.coalesce(null, false, 1, {});
    sr.equal(res1, false);

    var res2 = Objects.coalesce(1, {});
    sr.equal(res2, 1);

    var res3 = Objects.coalesce();
    sr.equal(res3, null);
});


QUnit.test("clone", function getPropTest(sr) {
    var src1 = {
        a: "A",
        b: { 1: 1, 2: 2, 3: 3 },
        c: {
            c1: [1, 2, 4, 8],
            c2: { c2a: [{ sup: "alpha" }, { sub: { text: "beta", values: ["b", "e", "t", "a"] } }] },
            c3: ["1-dimension", ["2", "dimension"], ["3", "-", "dimension"]],
        },
    };
    var src1a = {
        a: "A",
        b: { 1: 1, 2: 2, 3: 3 },
        c: {
            c1: [1, 2, 4, 8],
            c2: { c2a: [{ sup: "alpha" }, { sub: { text: "beta", values: ["b", "e", "t", "a"] } }] },
            c3: ["1-dimension", ["2", "dimension"], ["3", "-", "dimension"]],
        },
    };
    var src1b = {
        a: "A",
        b: { 1: 1, 2: 2, 3: 3 },
        c: {
            c1: [1, 2, 4, 8],
            c2: { c2a: [{ sup: "alpha" }, { sub: { text: "beta", values: ["b", "e", "t", "a"] } }] },
            c3: ["1-dimension", ["2", "dimension"], ["3", "-", "dimension"]],
        },
    };

    var res1 = Objects.clone(src1a);
    src1a.a = null;
    sr.deepEqual(res1, src1);

    var res1 = Objects.clone(src1b);
    src1b.c.c1 = null;
    sr.notDeepEqual(res1, src1);
});


QUnit.test("cloneDeep", function getPropTest(sr) {
    var src1 = {
        a: "A",
        b: { 1: 1, 2: 2, 3: 3 },
        c: {
            c1: [1, 2, 4, 8],
            c2: { c2a: [{ sup: "alpha" }, { sub: { text: "beta", values: ["b", "e", "t", "a"] } }] },
            c3: ["1-dimension", ["2", "dimension"], ["3", "-", "dimension"]],
        },
    };
    var src1a = {
        a: "A",
        b: { 1: 1, 2: 2, 3: 3 },
        c: {
            c1: [1, 2, 4, 8],
            c2: { c2a: [{ sup: "alpha" }, { sub: { text: "beta", values: ["b", "e", "t", "a"] } }] },
            c3: ["1-dimension", ["2", "dimension"], ["3", "-", "dimension"]],
        },
    };
    var src1b = {
        a: "A",
        b: { 1: 1, 2: 2, 3: 3 },
        c: {
            c1: [1, 2, 4, 8],
            c2: { c2a: [{ sup: "alpha" }, { sub: { text: "beta", values: ["b", "e", "t", "a"] } }] },
            c3: ["1-dimension", ["2", "dimension"], ["3", "-", "dimension"]],
        },
    };

    var res1 = Objects.cloneDeep(src1a);
    src1a.a = null;
    sr.deepEqual(res1, src1);

    var res1 = Objects.cloneDeep(src1b);
    src1b.c.c1 = null;
    sr.deepEqual(res1, src1);
});


QUnit.test("assign", function getPropTest(sr) {
    var src1 = Objects.assign({ a: "Q", b: 2 }, { a: "Z", b: "B", c: 3 });
    var res1 = { a: "Z", b: "B", c: 3 };
    sr.deepEqual(src1, res1);

    // test explicit keys
    var src2 = Objects.assign({ a: "Q", b: 2 }, { a: "Z", b: "B", c: 3 }, ["a", "c"]);
    var res2 = { a: "Z", b: 2, c: 3 };
    sr.deepEqual(src2, res2);
});


QUnit.test("assignAll", function getPropTest(sr) {
    var src1 = Objects.assignAll({ a: "Q", b: 2 }, [{ a: "Z", b: "B", c: 3 }, { a: "A", d: 4 }]);
    var res1 = { a: "A", b: "B", c: 3, d: 4 };
    sr.deepEqual(src1, res1);

    // test explicit keys
    var src2 = Objects.assignAll({ a: "Q", b: 2 }, [{ a: "Z", b: "B", c: 3, d: "!" }, { b: 2 }, { a: "A", d: 4 }], [["a", "b", "c"], null, ["d"]]);
    var res2 = { a: "Z", b: 2, c: 3, d: 4 };
    sr.deepEqual(src2, res2);
});


QUnit.test("getProp", function getPropTest(sr) {
    var res1 = Objects.getProp(undefined, "alpha");
    sr.equal(res1, null);

    var res2 = Objects.getProp({ alpha: 342, beta: "B" }, "beta");
    sr.equal(res2, "B");
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
    } catch (err) {
        sr.equal(true, true);
    }


    try {
        Objects.extendToStatic(Child, Parent, true, true);
        sr.equal(false, true);
    } catch (err) {
        sr.equal(true, true);
    }

    var parentInst = new Parent();
    sr.equal(parentInst.step(), "parent");

    Objects.extendToStatic(Child, Parent, true, false);

    sr.equal(Child["num"](), 2);
});

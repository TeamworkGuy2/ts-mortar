"use strict";
var chai = require("chai");
var Functions = require("../../../ts-mortar/utils/Functions");
var asr = chai.assert;
suite("Functions", function FunctionsTest() {
    var ClassTest = (function () {
        function ClassTest(arg) {
            this.arg = arg;
        }
        ClassTest.prototype.test = function (a, b, c) {
            return [this.arg, a, b, c];
        };
        return ClassTest;
    }());
    test("NO_OP", function NO_OPTest() {
        var func = Functions.NO_OP;
        asr.equal(func(), undefined);
    });
    test("callFunc", function callFuncTest() {
        var inst = new ClassTest("ct");
        var res1 = Functions.callFunc(inst.test, inst, "a", "b");
        asr.deepEqual(res1, ["ct", "a", "b", undefined]);
        var res2 = Functions.callFunc(inst.test, inst, 1, 2, 3);
        asr.deepEqual(res2, ["ct", 1, 2, 3]);
    });
    test("applyFunc", function applyFuncTest() {
        function ClassTest(arg) {
            this.arg = arg;
        }
        ClassTest.prototype.test = function (a, b, c) {
            return [this.arg, a, b, c];
        };
        var inst = new ClassTest("ct");
        var res1 = Functions.applyFunc(inst.test, inst, ["a", "b"]);
        asr.deepEqual(res1, ["ct", "a", "b", undefined]);
        var res2 = Functions.applyFunc(inst.test, inst, [1, 2, 3]);
        asr.deepEqual(res2, ["ct", 1, 2, 3]);
    });
    test("tryCatch", function tryCatchTest() {
        var res1 = Functions.tryCatch(function try1(a, b) { return [this.alpha, a, b]; }, function catch1(err) { return err; }, { alpha: 11, beta: 42 }, ["a", "b", "c"]);
        asr.deepEqual(res1, [11, "a", "b"]);
        var res2 = Functions.tryCatch(function try1(a, b) { throw ["error", this.alpha, a, b]; }, function catch1(err) { return err; }, { alpha: 11, beta: 42 }, ["a", "b", "c"]);
        asr.deepEqual(res2, ["error", 11, "a", "b"]);
    });
    test("isFunction", function isFunctionTest() {
        asr.equal(Functions.isFunction(1), false);
        asr.equal(Functions.isFunction(function () { }), true);
        asr.equal(Functions.isFunction(Functions.isFunction), true);
    });
    test("lazyField", function lazyFieldTest() {
        var i = 0;
        var getter = Functions.lazyField(function () { return ++i; });
        asr.equal(getter(), 1);
        asr.equal(getter(), 1);
    });
    test("partial-1", function partial1ArgTest() {
        var func11 = Functions.partial(function (a) { return a * a; }, 3);
        asr.equal(func11(), 9);
        asr.equal(func11.name, "partial1Bind1");
        var func12 = Functions.partial(function (a) { return a * a; });
        asr.equal(func12(3), 9);
        asr.equal(func12.name, "partial1Bind0");
    });
    test("partial-2", function partial2ArgTest() {
        var func21 = Functions.partial(function (a, b) { return a * a + b * b; }, 3, 2);
        asr.equal(func21(), 13);
        asr.equal(func21.name, "partial2Bind2");
        var func22 = Functions.partial(function (a, b) { return a * a + b * b; }, 3);
        asr.equal(func22(4), 25);
        asr.equal(func22.name, "partial2Bind1");
        var func23 = Functions.partial(function (a, b) { return a * a + b * b; });
        asr.equal(func23(2, 1), 5);
        asr.equal(func23.name, "partial2Bind0");
    });
    test("partial-3", function partial3ArgTest() {
        var func31 = Functions.partial(function (a, b, c) { return a * a + b * b + c * c; }, 3, 2, 1);
        asr.equal(func31(), 14);
        asr.equal(func31.name, "partial3Bind3");
        var func32 = Functions.partial(function (a, b, c) { return a * a + b * b + c * c; }, 3, 2);
        asr.equal(func32(0), 13);
        asr.equal(func32.name, "partial3Bind2");
        var func33 = Functions.partial(function (a, b, c) { return a * a + b * b + c * c; }, 3);
        asr.equal(func33(1, 1), 11);
        asr.equal(func33.name, "partial3Bind1");
        var func34 = Functions.partial(function (a, b, c) { return a * a + b * b + c * c; });
        asr.equal(func34(2, 1, 0), 5);
        asr.equal(func34.name, "partial3Bind0");
    });
    test("partial-many", function partialManyArgTest() {
        var funcM1 = Functions.partial(function () { return Array.prototype.reduce.call(arguments, function (s, i) { return s + i; }, 0); });
        asr.equal(funcM1(2, 3, 5), 10);
        asr.equal(funcM1(), 0);
        asr.equal(funcM1.name, "partialManyBindNone");
        var funcM2 = Functions.partial(function () { return Array.prototype.reduce.call(arguments, function (s, i) { return s + i; }, 0); }, 1, 3);
        asr.equal(funcM2(5, 9), 18);
        asr.equal(funcM2(), 4);
        asr.equal(funcM2.name, "partialManyBindMany");
    });
    test("createFuncTimer", function createFuncTimerTest() {
        var i = 0;
        var allowCalls = true;
        var res1 = Functions.createFuncTimer(function (a) { return ++i; }, function () { return allowCalls; }, "b-c");
        asr.equal(res1.name, "b-c");
        asr.equal(res1.wrapperFunc("a"), 1);
        allowCalls = false;
        asr.equal(res1.wrapperFunc("b"), undefined);
        allowCalls = true;
        asr.equal(res1.wrapperFunc("c"), 2);
        asr.equal(res1.calls, 2);
    });
});

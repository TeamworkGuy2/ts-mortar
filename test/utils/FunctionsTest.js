"use strict";
var chai = require("chai");
var Functions = require("../../../ts-mortar/utils/Functions");
var asr = chai.assert;
suite("Functions", function FunctionsTest() {
    function ClassTest(arg) {
        this.arg = arg;
    }
    ClassTest.prototype.test = function (a, b, c) {
        return [this.arg, a, b, c];
    };
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
    test("lazyGetter1Arg", function lazyGetter1ArgTest() {
        var func1 = Functions.lazyGetter1Arg(function (a) { return a * 3 + 1; });
        asr.equal(func1(4), 13);
        asr.equal(func1(1), 13);
    });
    test("lazyGetter2Arg", function lazyGetter2ArgTest() {
        var func2 = Functions.lazyGetter2Arg(function (a, b) { return a * 3 + b; });
        asr.equal(func2(4, 1), 13);
        asr.equal(func2(1, 2), 13);
    });
    test("wrap1Arg", function wrap1ArgTest() {
        var func1 = Functions.wrap1Arg(function (a) { return a * a; }, 3);
        asr.equal(func1(), 9);
    });
    test("wrap2Arg", function wrap2ArgTest() {
        var func2 = Functions.wrap2Arg(function (a, b) { return a * a + b * b; }, 3, 2);
        asr.equal(func2(), 13);
    });
    test("wrap3Arg", function wrap3ArgTest() {
        var func3 = Functions.wrap3Arg(function (a, b, c) { return a * a + b * b + c * c; }, 3, 2, 1);
        asr.equal(func3(), 14);
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

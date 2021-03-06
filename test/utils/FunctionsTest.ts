﻿import chai = require("chai");
import mocha = require("mocha");
import Functions = require("../../utils/Functions");

var asr = chai.assert;


suite("Functions", function FunctionsTest() {

    class ClassTest<T> {
        arg: T;

        constructor(arg: T) {
            this.arg = arg;
        }

        public test<A, B, C>(a: A, b: B, c: C) {
            return [this.arg, a, b, c];
        }
    }


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
        class ClassTest {
            private arg: any;
            constructor(arg: any) {
                this.arg = arg;
            }
            test(a: any, b: any, c: any) {
                return [this.arg, a, b, c];
            }
        }

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

        var err1;
        var res3 = Functions.tryCatch(function try1(a, b) { if (a) throw (err1 = new Error("throw-1")); else return 1; }, function catch1(err) { return err; }, null, ["a", "b", "c"]);
        asr.equal(res3, err1);
    });


    test("isFunction", function isFunctionTest() {
        asr.equal(Functions.isFunction(1), false);

        asr.equal(Functions.isFunction(function () { }), true);

        asr.equal(Functions.isFunction(Functions.isFunction), true);
    });


    test("lazyField", function lazyFieldTest() {
        var i = 0;
        var getter = Functions.lazyField(() => ++i);

        asr.equal(getter(), 1);
        asr.equal(getter(), 1);

        var i = 0;
        var getter2 = Functions.lazyField(() => { ++i; return null; });

        getter2()
        asr.equal(i, 1);
        getter2()
        asr.equal(i, 1);
    });


    test("partial-1", function partial1ArgTest() {
        var func11 = Functions.partial((a: number) => a * a, 3);
        asr.equal(func11(), 9);
        asr.equal(func11.name, "partial1Bind1");

        var func12 = Functions.partial((a: number) => a * a);
        asr.equal(func12(3), 9);
        asr.equal(func12.name, "partial1Bind0");
    });


    test("partial-2", function partial2ArgTest() {
        var func21 = Functions.partial((a: number, b: number) => a * a + b * b, 3, 2);
        asr.equal(func21(), 13);
        asr.equal(func21.name, "partial2Bind2");

        var func22 = Functions.partial((a: number, b: number) => a * a + b * b, 3);
        asr.equal(func22(4), 25);
        asr.equal(func22.name, "partial2Bind1");

        var func23 = Functions.partial((a: number, b: number) => a * a + b * b);
        asr.equal(func23(2, 1), 5);
        asr.equal(func23.name, "partial2Bind0");
    });


    test("partial-3", function partial3ArgTest() {
        var func31 = Functions.partial((a: number, b: number, c: number) => a * a + b * b + c * c, 3, 2, 1);
        asr.equal(func31(), 14);
        asr.equal(func31.name, "partial3Bind3");

        var func32 = Functions.partial((a: number, b: number, c: number) => a * a + b * b + c * c, 3, 2);
        asr.equal(func32(0), 13);
        asr.equal(func32.name, "partial3Bind2");

        var func33 = Functions.partial((a: number, b: number, c: number) => a * a + b * b + c * c, 3);
        asr.equal(func33(1, 1), 11);
        asr.equal(func33.name, "partial3Bind1");

        var func34 = Functions.partial((a: number, b: number, c: number) => a * a + b * b + c * c);
        asr.equal(func34(2, 1, 0), 5);
        asr.equal(func34.name, "partial3Bind0");
    });


    test("partial-many", function partialManyArgTest() {
        var reduce = <(cb: (prev: number, cur: number, idx: number, ary: number[]) => number, defaultVal: number) => number>Array.prototype.reduce;
        var funcM1 = Functions.partial(function () { return reduce.call(<number[]><any>arguments, (s: number, i: number) => s + i, 0); });
        asr.equal((<any>funcM1)(2, 3, 5), 10);
        asr.equal((<any>funcM1)(), 0);
        asr.equal(funcM1.name, "partialManyBindNone");

        var funcM2 = Functions.partial(function () { return reduce.call(<number[]><any>arguments, (s: number, i: number) => s + i, 0); }, 1, 3);
        asr.equal((<any>funcM2)(5, 9), 18);
        asr.equal((<any>funcM2)(), 4);
        asr.equal(funcM2.name, "partialManyBindMany");
    });


    test("createFuncTimer", function createFuncTimerTest() {
        var i = 0;
        var allowCalls = true;
        var res1 = Functions.createFuncTimer((a: any) => ++i, () => allowCalls, "b-c");

        asr.equal(res1.name, "b-c");

        asr.equal(res1.wrapperFunc("a"), 1);

        allowCalls = false;
        asr.equal(res1.wrapperFunc("b"), undefined);
        allowCalls = true;

        asr.equal(res1.wrapperFunc("c"), 2);

        asr.equal(res1.calls, 2);
    });

});

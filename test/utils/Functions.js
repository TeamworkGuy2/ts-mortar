var Functions = require("../../../ts-mortar/utils/Functions");
function ClassTest(arg) {
    this.arg = arg;
}
ClassTest.prototype.test = function (a, b, c) {
    return [this.arg, a, b, c];
};
QUnit.module("Functions", {});
QUnit.test("NO_OP", function NO_OPTest(sr) {
    var func = Functions.NO_OP;
    sr.equal(func(), undefined);
});
QUnit.test("callFunc", function callFuncTest(sr) {
    var inst = new ClassTest("ct");
    var res1 = Functions.callFunc(inst.test, inst, "a", "b");
    sr.deepEqual(res1, ["ct", "a", "b", undefined]);
    var res2 = Functions.callFunc(inst.test, inst, 1, 2, 3);
    sr.deepEqual(res2, ["ct", 1, 2, 3]);
    var res2 = Functions.callFunc(inst.test, null, 1, 2, 3);
    sr.deepEqual(res2, [undefined, 1, 2, 3]);
});
QUnit.test("applyFunc", function applyFuncTest(sr) {
    function ClassTest(arg) {
        this.arg = arg;
    }
    ClassTest.prototype.test = function (a, b, c) {
        return [this.arg, a, b, c];
    };
    var inst = new ClassTest("ct");
    var res1 = Functions.applyFunc(inst.test, inst, ["a", "b"]);
    sr.deepEqual(res1, ["ct", "a", "b", undefined]);
    var res2 = Functions.applyFunc(inst.test, inst, [1, 2, 3]);
    sr.deepEqual(res2, ["ct", 1, 2, 3]);
    var res2 = Functions.applyFunc(inst.test, null, [1, 2, 3]);
    sr.deepEqual(res2, [undefined, 1, 2, 3]);
});
QUnit.test("tryCatch", function tryCatchTest(sr) {
    var res1 = Functions.tryCatch(function try1(a, b) { return [this.alpha, a, b]; }, function catch1(err) { return err; }, { alpha: 11, beta: 42 }, ["a", "b", "c"]);
    sr.deepEqual(res1, [11, "a", "b"]);
    var res2 = Functions.tryCatch(function try1(a, b) { throw ["error", this.alpha, a, b]; }, function catch1(err) { return err; }, { alpha: 11, beta: 42 }, ["a", "b", "c"]);
    sr.deepEqual(res2, ["error", 11, "a", "b"]);
});
QUnit.test("isFunction", function isFunctionTest(sr) {
    sr.equal(Functions.isFunction(1), false);
    sr.equal(Functions.isFunction(function () { }), true);
    sr.equal(Functions.isFunction(Functions.isFunction), true);
});
QUnit.test("lazyField", function lazyFieldTest(sr) {
    var i = 0;
    var getter = Functions.lazyField(function () { return ++i; });
    sr.equal(getter(), 1);
    sr.equal(getter(), 1);
});
QUnit.test("lazyGetter1Arg", function lazyGetter1ArgTest(sr) {
    var func1 = Functions.lazyGetter1Arg(function (a) { return a * 3 + 1; });
    sr.equal(func1(4), 13);
    sr.equal(func1(1), 13);
});
QUnit.test("lazyGetter2Arg", function lazyGetter2ArgTest(sr) {
    var func2 = Functions.lazyGetter2Arg(function (a, b) { return a * 3 + b; });
    sr.equal(func2(4, 1), 13);
    sr.equal(func2(1, 2), 13);
});
QUnit.test("createFuncTimer", function createFuncTimerTest(sr) {
    var i = 0;
    var allowCalls = true;
    var res1 = Functions.createFuncTimer(function (a) { return ++i; }, function () { return allowCalls; }, "b-c");
    sr.equal(res1.name, "b-c");
    sr.equal(res1.wrapperFunc("a"), 1);
    allowCalls = false;
    sr.equal(res1.wrapperFunc("b"), undefined);
    allowCalls = true;
    sr.equal(res1.wrapperFunc("c"), 2);
    sr.equal(res1.calls, 2);
});

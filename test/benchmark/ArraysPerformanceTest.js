"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var asr = chai.assert;
suite("ArraysPerformance", function ArraysPerformance() {
    this.timeout(3000);
    var res = 0;
    // warmup
    res += copyLoop(200, [1, 2, 3]);
    res += copySlice(200, [1, 2, 3]);
    res += copyPushApply(200, [1, 2, 3]);
    res += copyLoop(2000, [5, 10, 15, 20, 25]);
    res += copySlice(2000, [5, 10, 15, 20, 25]);
    res += copyPushApply(2000, [5, 10, 15, 20, 25]);
    perfTest("copyLoop-small-few", function () { return copyLoop(500, [1, 21, 42]); });
    perfTest("copySlice-small-few", function () { return copySlice(500, [1, 21, 42]); });
    perfTest("copyPushApply-small-few", function () { return copyPushApply(500, [1, 21, 42]); });
    perfTest("copyLoop-small-many", function () { return copyLoop(5000, [1, 21, 42]); });
    perfTest("copySlice-small-many", function () { return copySlice(5000, [1, 21, 42]); });
    perfTest("copyPushApply-small-many", function () { return copyPushApply(5000, [1, 21, 42]); });
    perfTest("copyLoop-medium-few", function () { return copyLoop(5000, [1, 5, 10, 20, 50, 100, 200, 250, 500, 750, 1000]); });
    perfTest("copySlice-medium-few", function () { return copySlice(500, [1, 5, 10, 20, 50, 100, 200, 250, 500, 750, 1000]); });
    perfTest("copyPushApply-medium-few", function () { return copyPushApply(500, [1, 5, 10, 20, 50, 100, 200, 250, 500, 750, 1000]); });
    perfTest("copyLoop-medium-many", function () { return copyLoop(5000, [1, 5, 10, 20, 50, 100, 200, 250, 500, 750, 1000]); });
    perfTest("copySlice-medium-many", function () { return copySlice(5000, [1, 5, 10, 20, 50, 100, 200, 250, 500, 750, 1000]); });
    perfTest("copyPushApply-medium-many", function () { return copyPushApply(5000, [1, 5, 10, 20, 50, 100, 200, 250, 500, 750, 1000]); });
    perfTest("copyLoop-large-few", function () { return copyLoop(500, [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181]); });
    perfTest("copySlice-large-few", function () { return copySlice(500, [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181]); });
    perfTest("copyPushApply-large-few", function () { return copyPushApply(500, [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181]); });
    perfTest("copyLoop-large-many", function () { return copyLoop(5000, [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181]); });
    perfTest("copySlice-large-many", function () { return copySlice(5000, [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181]); });
    perfTest("copyPushApply-large-many", function () { return copyPushApply(5000, [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181]); });
    function copyLoop(loops, ary) {
        var res = 0;
        for (var l = 0; l < loops; l++) {
            var copy = [];
            for (var i = 0, size = ary.length; i < size; i++) {
                copy.push(ary[i]);
            }
            res += copy[l % size];
        }
        return res;
    }
    function copySlice(loops, ary) {
        var res = 0;
        for (var l = 0; l < loops; l++) {
            var copy = ary.slice();
            res += copy[l % ary.length];
        }
        return res;
    }
    function copyPushApply(loops, ary) {
        var res = 0;
        for (var l = 0; l < loops; l++) {
            var copy = [];
            Array.prototype.push.apply(copy, ary);
            res += copy[l % ary.length];
        }
        return res;
    }
    function perfTest(name, func) {
        //var start = window.performance.now();
        test(name, function () {
            var res = 0;
            var small = name.indexOf("-small");
            var few = name.indexOf("-few");
            var runs = (small ? 100 : 10) * (few ? 20 : 4);
            for (var i = 0; i < runs; i++) {
                res += func();
            }
            return res;
        });
        //console.log(name, (window.performance.now() - start).toFixed(3) + " ms");
    }
    return res;
});

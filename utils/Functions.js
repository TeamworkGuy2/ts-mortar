"use strict";
/** Helper functions for calling/composing functions
 */
var Functions;
(function (Functions) {
    /** A no-op function that takes any/no arguments and returns nothing */
    Functions.NO_OP = function () { };
    function callFunc(func, thisArg) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return applyFunc(func, thisArg, args);
    }
    Functions.callFunc = callFunc;
    function applyFunc(func, thisArg, args) {
        if (typeof func === "function") {
            return func.apply(thisArg, args);
        }
        return null;
    }
    Functions.applyFunc = applyFunc;
    function tryCatch(tryFunc, catchFunc, thisArg, args) {
        var res = null;
        if (typeof tryFunc === "function") {
            try {
                res = tryFunc.apply(thisArg, args);
            }
            catch (err) {
                var catchRes = catchFunc(err);
                if (catchRes != null) {
                    res = catchRes;
                }
            }
        }
        return res;
    }
    Functions.tryCatch = tryCatch;
    function isFunction(func) {
        return typeof func === "function";
    }
    Functions.isFunction = isFunction;
    function lazyField(initializer) {
        var value = null;
        return function lazyInitializer(refetch) {
            if (value == null || refetch === true) {
                value = initializer();
            }
            return value;
        };
    }
    Functions.lazyField = lazyField;
    function partial(func) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        switch (func.length) {
            case 1:
                switch (args.length) {
                    case 0: return function partial1Bind0(a) { return func(a); };
                    case 1: return function partial1Bind1() { return func(args[0]); };
                    default: return function partial1BindMany() { return func.apply(undefined, arguments); };
                }
            case 2:
                switch (args.length) {
                    case 0: return function partial2Bind0(a, b) { return func(a, b); };
                    case 1: return function partial2Bind1(b) { return func(args[0], b); };
                    case 2: return function partial2Bind2() { return func(args[0], args[1]); };
                    default: return function partial2BindMany() { return func.apply(undefined, arguments); };
                }
            case 3:
                switch (args.length) {
                    case 0: return function partial3Bind0(a, b, c) { return func(a, b, c); };
                    case 1: return function partial3Bind1(b, c) { return func(args[0], b, c); };
                    case 2: return function partial3Bind2(c) { return func(args[0], args[1], c); };
                    case 3: return function partial3Bind3() { return func(args[0], args[1], args[2]); };
                    default: return function partial3BindMany() { return func.apply(undefined, arguments); };
                }
            default:
                switch (args.length) {
                    case 0:
                        return function partialManyBindNone() {
                            return func.apply(undefined, arguments);
                        };
                    default:
                        return function partialManyBindMany() {
                            var allArgs = new Array(args.length);
                            for (var i = 0, s = args.length; i < s; i++) {
                                allArgs[i] = args[i];
                            }
                            for (var i = 0, s = arguments.length; i < s; i++) {
                                allArgs.push(arguments[i]);
                            }
                            return func.apply(undefined, allArgs);
                        };
                }
        }
    }
    Functions.partial = partial;
    /** Creates a new function that wraps a given function.
     * Useful for logging performance, number of calls, etc.
     * @param func the function to call each time this function is called
     * @param callCondition a function that returns a true/false flag indicating whether the returned wrapper function should
     * call it's inner wrapped function or not.  If null or undefined, the inner wrapped function is always called when the returned function is called
     */
    function createFuncTimer(func, callCondition, name) {
        var wrapper = {
            name: name,
            totalTimeMillis: 0,
            calls: 0,
            wrapperFunc: null,
        };
        wrapper.wrapperFunc = (function wrapperFunc() {
            if (callCondition && callCondition() === false) {
                return;
            }
            var startTime = Date.now();
            var res = func.apply(undefined, arguments);
            wrapper.totalTimeMillis += (Date.now() - startTime);
            wrapper.calls++;
            return res;
        });
        return wrapper;
    }
    Functions.createFuncTimer = createFuncTimer;
})(Functions || (Functions = {}));
module.exports = Functions;

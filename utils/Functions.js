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
    /** Create a function that lazily returns a computed value
     * @param initializer: the function that initializes the lazy field and returns it (this function will only be called once)
     * @return a function that returns the cached value returned by the {@code initializer} function
     */
    function lazyField(initializer) {
        var value = null;
        return function lazyInitializer() {
            if (value == null) {
                value = initializer();
            }
            return value;
        };
    }
    Functions.lazyField = lazyField;
    /** Create a function that takes 1 argument and lazily returns a computed value
     * @see createLazyInitializer()
     */
    function lazyGetter1Arg(initializer) {
        var value = null;
        return function lazyInitializer(arg) {
            if (value == null) {
                value = initializer(arg);
            }
            return value;
        };
    }
    Functions.lazyGetter1Arg = lazyGetter1Arg;
    /** Create a function that takes 2 arguments and lazily returns a computed value
     * @see createLazyInitializer()
     */
    function lazyGetter2Arg(initializer) {
        var value = null;
        return function lazyInitializer(arg1, arg2) {
            if (value == null) {
                value = initializer(arg1, arg2);
            }
            return value;
        };
    }
    Functions.lazyGetter2Arg = lazyGetter2Arg;
    /** Creates a new function that wraps a given function.
     * Useful for logging performance, number of calls, etc.
     * @param func: the function to call each time this function is called
     * @param callCondition: a function that returns a true/false flag indicating whether the returned wrapper function should
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

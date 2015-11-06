var Functions;
(function (Functions) {
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
        return function lazyInitializer() {
            if (value == null) {
                value = initializer();
            }
            return value;
        };
    }
    Functions.lazyField = lazyField;
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

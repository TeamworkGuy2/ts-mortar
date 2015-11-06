/// <reference path="../tsDefinitions/lib/Q.d.ts" />
var Q = require("q");
var Defer = (function () {
    function Defer() {
    }
    Defer.newDefer = function () {
        return Q.defer();
    };
    Defer.newPromiseResolved = function (resolveValue) {
        var dfd = Q.defer();
        dfd.resolve(resolveValue);
        return dfd.promise;
    };
    Defer.newPromiseRejected = function (rejectValue) {
        var dfd = Q.defer();
        dfd.reject(rejectValue);
        return dfd.promise;
    };
    Defer.when1 = function (promise1) {
        return Q.all([promise1]);
    };
    Defer.when2 = function (promise1, promise2) {
        return Q.all([promise1, promise2]);
    };
    Defer.when3 = function (promise1, promise2, promise3) {
        return Q.all([promise1, promise2, promise3]);
    };
    Defer.when4 = function (promise1, promise2, promise3, promise4) {
        return Q.all([promise1, promise2, promise3, promise4]);
    };
    Defer.when = function (promises) {
        return Q.all(promises);
    };
    Defer.runActionForAll = function (args, actionFunc) {
        if (typeof actionFunc !== "function") {
            throw new Error("incorrect arguments (" + args + "," + actionFunc + "), expected (Array, Function)");
        }
        var defs = args.map(function runActionForArg(arg) {
            var def = Q.defer();
            actionFunc(def, arg);
            return def.promise;
        });
        return Q.all(defs);
    };
    Defer.runActionForAllInSeries = function (args, actionFunc, stopOnFirstError) {
        if (stopOnFirstError === void 0) { stopOnFirstError = false; }
        if (typeof actionFunc !== "function") {
            throw new Error("incorrect arguments (" + args + "," + actionFunc + "), expected (Array, Function)");
        }
        var initalDfd = Q.defer();
        initalDfd.resolve(null);
        var results = [];
        var errors = [];
        var promise = args.reduce(function runActionForArgInSeries(promise, arg) {
            function successCallNextAction(res) {
                results.push(res);
                var dfd = Q.defer();
                actionFunc(dfd, arg);
                return dfd.promise;
            }
            function failureCallNextAction(err) {
                errors.push(err);
                var dfd = Q.defer();
                actionFunc(dfd, arg);
                return dfd.promise;
            }
            if (!stopOnFirstError) {
                return promise.then(successCallNextAction, failureCallNextAction);
            }
            else {
                return promise.then(successCallNextAction);
            }
        }, initalDfd.promise);
        return promise.then(function (res) {
            results.push(res);
            results.shift();
            return results;
        });
    };
    Defer.chainTo = function (srcPromise, dstDfd) {
        srcPromise.then(function chainedPromiseSuccess(res) {
            dstDfd.resolve(res);
        }, function chainedPromiseFailure(err) {
            dstDfd.reject(err);
        });
    };
    Defer.chainToWith = function (srcPromise, dstDfd, successCall, failureCall) {
        if (srcPromise == null || dstDfd == null) {
            throw new Error("incorrect usage (" + srcPromise + ", " + dstDfd + ", ...), expected (Q.IPromise, Q.Deferred, ...)");
        }
        srcPromise.then(function chainedWithActionPromiseSucess(res) {
            if (successCall) {
                var newRes = null;
                try {
                    newRes = successCall(res);
                }
                catch (successCallErr) {
                    dstDfd.reject(successCallErr);
                }
                if (newRes != null) {
                    res = newRes;
                }
            }
            dstDfd.resolve(res);
        }, function chainedWithActionPromiseFailure(err) {
            var newErr = null;
            if (failureCall) {
                var tmpErr = null;
                try {
                    tmpErr = failureCall(err);
                }
                catch (failureCallErr) {
                    tmpErr = failureCallErr;
                }
                if (tmpErr != null) {
                    newErr = tmpErr;
                }
            }
            else {
                newErr = err;
            }
            dstDfd.reject(newErr);
        });
    };
    Defer.createCachedDeferredTask = function (work) {
        function cachedDeferResolver() {
            var cachedDfd = Defer.newDefer();
            var cacheDone = false;
            var cacheFailed = false;
            var error = null;
            var cachedData = null;
            if (cacheDone === true) {
                if (cacheFailed) {
                    cachedDfd.reject(error);
                }
                else {
                    cachedDfd.resolve(cachedData);
                }
            }
            else {
                var workDfd = work();
                workDfd.promise.then(function cachedPromiseSuccess(res) {
                    cachedDfd.resolve(res);
                    cachedData = res;
                    cacheDone = true;
                }, function cachedPromiseFailure(err) {
                    cachedDfd.reject(err);
                    error = err;
                    cacheFailed = true;
                });
            }
            return cachedDfd;
        }
        return cachedDeferResolver;
    };
    Defer.createCachedPromiseTask = function (work) {
        function cachedPromiseResolver() {
            var cachedPromise = undefined;
            if (cachedPromise === undefined) {
                var workPromise = work();
                cachedPromise = workPromise || null;
            }
            return cachedPromise;
        }
        return cachedPromiseResolver;
    };
    return Defer;
})();
module.exports = Defer;

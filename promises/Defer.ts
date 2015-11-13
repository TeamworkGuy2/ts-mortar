/// <reference path="../definitions/lib/Q.d.ts" />
import Q = require("q");

/** Defer - functions for strongly typed promise/deferred handling
 */
class Defer {

    /** Create a deferred object with a 'promise' property
     * @return a PS deferred object with success and error return values
     */
    static newDefer<T extends void, F extends string>(): PsDeferredErrorString;
    static newDefer<T extends void, F extends void>(): PsDeferredVoid;
    static newDefer<T extends any, F extends any>(): PsDeferred<T, F>;
    static newDefer<T, F>(): PsDeferred<T, F> {
        return <PsDeferred<T, F>>Q.defer<any>();
    }


    static newPromiseResolved<T, F>(resolveValue: T): PsPromise<T, F> {
        var dfd = Q.defer<any>();
        dfd.resolve(resolveValue);
        return dfd.promise;
    }


    static newPromiseRejected<T, F>(rejectValue: F): PsPromise<T, F> {
        var dfd = Q.defer<any>();
        dfd.reject(rejectValue);
        return dfd.promise;
    }


    // ==== functions for resolving multiple promises and returning a strongly typed result array ====

    /** Wait for a single promise to resolve and return the result in a stringly typed array
     */
    static when1<T1, F1>(promise1: PsPromise<T1, F1>): PsPromise<[T1], F1> {
        return <any>Q.all(<any[]>[promise1]);
    }

    /** Wait for two promises to resolve and return their results in a stringly typed array
     */
    static when2<T1, T2, F1, F2>(promise1: PsPromise<T1, F1>, promise2: PsPromise<T2, F2>): PsPromise<[T1, T2], (F1 | F2)> {
        return <any>Q.all(<any[]>[promise1, promise2]);
    }

    /** Wait for three promises to resolve and return their results in a stringly typed array
     */
    static when3<T1, T2, T3, F1, F2, F3>(promise1: PsPromise<T1, F1>, promise2: PsPromise<T2, F2>, promise3: PsPromise<T3, F3>): PsPromise<[T1, T2, T3], (F1 | F2 | F3)> {
        return <any>Q.all(<any[]>[promise1, promise2, promise3]);
    }

    /** Wait for four promises to resolve and return their results in a stringly typed array
     */
    static when4<T1, T2, T3, T4, F1, F2, F3, F4>(promise1: PsPromise<T1, F1>, promise2: PsPromise<T2, F2>, promise3: PsPromise<T3, F3>, promise4: PsPromise<T4, F4>): PsPromise<[T1, T2, T3, T4], (F1 | F2 | F3 | F4)> {
        return <any>Q.all(<any[]>[promise1, promise2, promise3, promise4]);
    }

    // resolve multiple promises of same type
    static when<T, F>(promises: PsPromise<T, F>[]): PsPromise<T[], F> {
        return Q.all(promises);
    }


    /** Run each object from {@code args} through {@code actionFunc} and return a deferred promise that completes when all of the actions complete
     * @param args: an array of objects to pass individually to {@code actionFunc}
     * @param actionFunc: this action is called with a unique deferred promise that must be resolved or rejected
     * somewhere in the action, and each object from {@code args} as a parameter
     * @return a promise that returns an array of all of the results returned from the calls to {@code actionFunc}
     */
    static runActionForAll<T, R, F>(args: T[], actionFunc: (def: PsDeferred<R, F>, obj: T) => void): PsPromise<R[], F> {
        if (typeof actionFunc !== "function") {
            throw new Error("incorrect arguments (" + args + "," + actionFunc + "), expected (Array, Function)");
        }
        var defs = args.map(function runActionForArg(arg) {
            var def = Q.defer<R>();
            actionFunc(def, arg);
            return def.promise;
        });
        return Q.all(defs);
    }


    /** Run each object from {@code args} through {@code actionFunc} and return a deferred promise that completes when all of the actions complete
     * @param args: an array of objects to pass individually to {@code actionFunc}
     * @param actionFunc: this action is called with a unique deferred promise that must be resolved or rejected
     * somewhere in the action, and each object from {@code args} as a parameter
     * @param failOnFirstError: true to stop running the actions when the first one throws an error,
     * else continue running and return a list of successful results
     * @return a promise that returns an array of all of the results returned from the calls to {@code actionFunc}
     */
    static runActionForAllInSeries<T, R, F>(args: T[], actionFunc: (def: PsDeferred<R, F>, obj: T) => void, stopOnFirstError: boolean = false): PsPromise<R[], F> {
        if (typeof actionFunc !== "function") {
            throw new Error("incorrect arguments (" + args + "," + actionFunc + "), expected (Array, Function)");
        }
        var initalDfd = Q.defer<R>();
        initalDfd.resolve(null);
        var results = [];
        var errors = [];
        // for each action/argument combination, chain it to the previous action result
        var promise = args.reduce(function runActionForArgInSeries(promise, arg) {
            function successCallNextAction(res) {
                results.push(res);
                var dfd = Q.defer<R>();
                actionFunc(dfd, arg);
                return dfd.promise;
            }

            function failureCallNextAction(err) {
                errors.push(err);
                var dfd = Q.defer<R>();
                actionFunc(dfd, arg);
                return dfd.promise;
            }

            // handle errors if all actions need to run
            if (!stopOnFirstError) {
                return promise.then(successCallNextAction, failureCallNextAction);
            }
            else {
                return promise.then(successCallNextAction);
            }
        }, initalDfd.promise);

        return promise.then(function (res) {
            results.push(res);
            // remove the first item since the initial promise in the args.reduce(...) call is a dummy promise to start the chain
            results.shift();
            return results;
        });
    }


    /** Chain one deferred to another, so resolve and reject callbacks pass from {@code srcPromise} to {@code dstPromise}
     * @param srcPromise: the source promise to listen to via {@link Promise#then}
     * @param dstPromise: the destination to pipe {@code srcPromise} {@link Promise#resolve} and {@link Promise#reject} callbacks to
     */
    static chainTo<T, F>(srcPromise: PsPromise<T, F>, dstDfd: PsDeferred<T, F>) {
        srcPromise.then(function chainedPromiseSuccess(res) {
            dstDfd.resolve(res);
        }, function chainedPromiseFailure(err) {
            dstDfd.reject(err);
        });
    }


    /** Chain one deferred to another, so resolve and reject callbacks pass from {@code srcPromise} to {@code dstPromise}.
     * With optional success and failure functions that are called before the {@code dstProimse} is resolved/rejected.
     * @param srcPromise: the source promise to listen to via {@link Promise#then}
     * @param dstPromise: the destination to pipe {@code srcPromise} {@link Promise#resolve} and {@link Promise#reject} callbacks to
     * @param [successCall]: optional function to call if {@code srcPromise} succeeds,
     * which can optionally modify the result forwarded to {@code dstPromise}
     * @param [failureCall]: optional function to call if {@code srcPromise} fails,
     * which can optionally modify the error forwarded to {@code dstPromise}
     */
    static chainToWith<T, F1, F2>(srcPromise: PsPromise<T, F1>, dstDfd: PsDeferred<T, F2>, successCall: (obj: T) => T | void, failureCall: (err: F1) => F2 | void) {
        if (srcPromise == null || dstDfd == null) {
            throw new Error("incorrect usage (" + srcPromise + ", " + dstDfd + ", ...), expected (Q.IPromise, Q.Deferred, ...)");
        }

        srcPromise.then(function chainedWithActionPromiseSucess(res) {
            if (successCall) {
                var newRes = null;
                try {
                    newRes = successCall(res);
                } catch (successCallErr) {
                    dstDfd.reject(successCallErr);
                }
                if (newRes != null) {
                    res = newRes;
                }
            }
            dstDfd.resolve(res);
        }, function chainedWithActionPromiseFailure(err) {
            var newErr: F2 = null;
            if (failureCall) {
                var tmpErr: F2 | void = null;
                try {
                    tmpErr = failureCall(err);
                } catch (failureCallErr) {
                    tmpErr = failureCallErr;
                }
                if (tmpErr != null) {
                    newErr = <F2>tmpErr;
                }
            }
            else {
                newErr = <any>err;
            }
            dstDfd.reject(newErr);
        });
    }


    /** Caches an asynchronous task that returns a deferred so that subsequent calls to
     * the task resolve or reject with the initial cached result or error
     * @param work: the function that performs the work and returns a deferred
     * @return a function with the same signature as {@code work} that the returns a cached deferred
     */
    static createCachedDeferredTask<T, F>(work: () => PsDeferred<T, F>): () => PsDeferred<T, F> {
        function cachedDeferResolver(): PsDeferred<T, F> {
            var cachedDfd = Defer.newDefer<T, F>();
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
    }


    /** Caches an asynchronous task that returns a promise so that subsequent calls to
     * the task resolve or reject with the initial cached result or error
     * @param work: the function that performs the work and returns a promise
     * @return a function with the same signature as {@code work} that the returns a cached promise
     */
    static createCachedPromiseTask<T extends Q.IPromise<any>>(work: () => T): () => T {
        function cachedPromiseResolver(): T {
            var cachedPromise: T = undefined;

            if (cachedPromise === undefined) {
                var workPromise = work();
                cachedPromise = workPromise || null;
            }

            return cachedPromise;
        }

        return cachedPromiseResolver;
    }

}


export = Defer;

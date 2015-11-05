/** Helper functions for calling/composing functions
 */
module Functions {

    /** A no-op function that takes any/no arguments and returns nothing */
    export var NO_OP: () => void = function () { };


    export function callFunc<T>(func: (...args) => T, thisArg: any, ...args: any[]): T {
        return applyFunc(func, thisArg, args);
    }


    export function applyFunc<T>(func: (...args) => T, thisArg: any, args: any[]): T {
        if (typeof func === "function") {
            return func.apply(thisArg, args);
        }
        return null;
    }


    export function tryCatch<T>(tryFunc: (...args) => T, catchFunc: (err) => (void | T), thisArg?: any, args?: any[]): T {
        var res = null;
        if (typeof tryFunc === "function") {
            try {
                res = tryFunc.apply(thisArg, args);
            } catch (err) {
                var catchRes = catchFunc(err);
                if (catchRes != null) {
                    res = catchRes;
                }
            }
        }
        return res;
    }


    export function isFunction(func): boolean {
        return typeof func === "function";
    }


    /** Create a function that lazily returns a computed value
     * @param initializer: the function that initializes the lazy field and returns it (this function will only be called once)
     * @return a function that returns the cached value returned by the {@code initializer} function
     */
    export function lazyField<T>(initializer: () => T): () => T {
        var value = null;
        return function lazyInitializer() {
            if (value == null) {
                value = initializer();
            }
            return value;
        };
    }


    /** Create a function that takes 1 argument and lazily returns a computed value
     * @see createLazyInitializer()
     */
    export function lazyGetter1Arg<A1, T>(initializer: (arg: A1) => T): (arg: A1) => T {
        var value = null;
        return function lazyInitializer(arg: A1) {
            if (value == null) {
                value = initializer(arg);
            }
            return value;
        };
    }


    /** Create a function that takes 2 arguments and lazily returns a computed value
     * @see createLazyInitializer()
     */
    export function lazyGetter2Arg<A1, A2, T>(initializer: (arg1: A1, arg2: A2) => T): (arg1: A1, arg2: A2) => T {
        var value = null;
        return function lazyInitializer(arg1: A1, arg2: A2) {
            if (value == null) {
                value = initializer(arg1, arg2);
            }
            return value;
        };
    }


    /** Creates a new function that wraps a given function.
     * Useful for logging performance, number of calls, etc.
     * @param func: the function to call each time this function is called
     * @param callCondition: a function that returns a true/false flag indicating whether the returned wrapper function should
     * call it's inner wrapped function or not.  If null or undefined, the inner wrapped function is always called when the returned function is called
     */
    export function createFuncTimer<T extends Function>(func: T, callCondition?: () => boolean, name?: string): { name: string; totalTimeMillis: number; calls: number; wrapperFunc: T } {
        var wrapper = {
            name: name,
            totalTimeMillis: 0,
            calls: 0,
            wrapperFunc: null,
        };

        wrapper.wrapperFunc = <T><Function>(function wrapperFunc() {
            if (callCondition && callCondition() === false) { return; }
            var startTime = Date.now();
            var res = func.apply(undefined, arguments);
            wrapper.totalTimeMillis += (Date.now() - startTime);
            wrapper.calls++;
            return res;
        });

        return wrapper;
    }

}

export = Functions;

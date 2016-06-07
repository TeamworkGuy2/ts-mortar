/** Helper functions for calling/composing functions
 */
module Functions {

    /** A no-op function that takes any/no arguments and returns nothing */
    export var NO_OP: () => void = function () { };


    export function callFunc<T>(func: (...args: any[]) => T, thisArg: any, ...args: any[]): T {
        return applyFunc(func, thisArg, args);
    }


    export function applyFunc<T>(func: (...args: any[]) => T, thisArg: any, args: any[]): T {
        if (typeof func === "function") {
            return func.apply(thisArg, args);
        }
        return null;
    }


    export function tryCatch<T>(tryFunc: (...args: any[]) => T, catchFunc: (err) => (void | T), thisArg?: any, args?: any[]): T {
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
     * with an optiona 'refetch' parameter which, if true, forces the initializer to be called again
     */
    export function lazyField<T>(initializer: () => T): ((refetch?: boolean) => T) {
        var value = null;
        return function lazyInitializer(refetch?: boolean) {
            if (value == null || refetch === true) {
                value = initializer();
            }
            return value;
        };
    }


    /** Create a function that calls another function with pre-specified arguments and returns the result
     */
    export function partial<A, T>(func: (a: A) => T):       (a: A) => T;
    export function partial<A, T>(func: (a: A) => T, a: A): () => T;

    export function partial<A, B, T>(func: (a: A, b: B) => T):             (a: A, b: B) => T;
    export function partial<A, B, T>(func: (a: A, b: B) => T, a: A):       (b: B) => T;
    export function partial<A, B, T>(func: (a: A, b: B) => T, a: A, b: B): () => T;

    export function partial<A, B, C, T>(func: (a: A, b: B, c: C) => T):                   (a: A, b: B, c: C) => T;
    export function partial<A, B, C, T>(func: (a: A, b: B, c: C) => T, a: A):             (b: B, c: C) => T;
    export function partial<A, B, C, T>(func: (a: A, b: B, c: C) => T, a: A, b: B):       (c: C) => T;
    export function partial<A, B, C, T>(func: (a: A, b: B, c: C) => T, a: A, b: B, c: C): () => T;

    export function partial<T>(func: (...args: any[]) => T, ...args: any[]): (...args: any[]) => T {
        switch (func.length) {
            case 1:
                switch (args.length) {
                    case 0: return function partial1Bind0(a) { return func(a); };
                    case 1: return function partial1Bind1() { return func(args[0]); }
                    default: return function partial1BindMany() { return func.apply(undefined, arguments); };
                }
            case 2:
                switch (args.length) {
                    case 0: return function partial2Bind0(a, b) { return func(a, b); };
                    case 1: return function partial2Bind1(b) { return func(args[0], b); }
                    case 2: return function partial2Bind2() { return func(args[0], args[1]); }
                    default: return function partial2BindMany() { return func.apply(undefined, arguments); };
                }
            case 3:
                switch (args.length) {
                    case 0: return function partial3Bind0(a, b, c) { return func(a, b, c); };
                    case 1: return function partial3Bind1(b, c) { return func(args[0], b, c); }
                    case 2: return function partial3Bind2(c) { return func(args[0], args[1], c); }
                    case 3: return function partial3Bind3() { return func(args[0], args[1], args[2]); }
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
                            for (var i = 0, s = args.length; i < s; i++) { allArgs[i] = args[i]; }
                            for (var i = 0, s = arguments.length; i < s; i++) { allArgs.push(arguments[i]); }
                            return func.apply(undefined, allArgs);
                        };
                }
        }
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

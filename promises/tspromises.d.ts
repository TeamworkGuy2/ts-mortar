
// Definitions for 'Q' like promises/deferreds with strongly typed error values
// Definitions by: TeamworkGuy2 <https://github.com/TeamworkGuy2>
// Definitions: https://github.com/TeamworkGuy2/ts-mortar

// strongly typed promise errors
interface PsPromise<T, F> extends Q.Promise<T> {
    then<U>(onFulfill?: (value: T) => U | Q.IPromise<U>): PsPromise<U, F>;
    then<U, V>(onFulfill?: (value: T) => U | Q.IPromise<U>, onReject?: (error: F) => V | Q.IPromise<V>, onProgress?: (progress: any) => any): PsPromise<U, V>;
    done<U, V>(onFulfilled?: (value: T) => U | Q.IPromise<U>, onRejected?: (reason: F) => V | Q.IPromise<V>, onProgress?: (progress: any) => any): void;
}

interface PsPromiseVoid extends PsPromise<void, void> {
    then<U, F>(onFulfill?: () => U | Q.IPromise<U>): PsPromise<U, F>;
    then<U, V, F>(onFulfill?: () => U | Q.IPromise<U>, onReject?: (error: F) => V | Q.IPromise<V>, onProgress?: (progress: any) => any): PsPromise<U, V>;
    done<U, V, F>(onFulfilled?: () => U | Q.IPromise<U>, onRejected?: (reason: F) => V | Q.IPromise<V>, onProgress?: (progress: any) => any): void;
}

interface PsPromiseError<R> extends PsPromise<void, R> {
}

interface PsPromiseErrorString extends PsPromise<void, string> {
}

interface PsDeferred<T, F> extends Q.Deferred<T> {
    promise: PsPromise<T, F>;
    resolve(result?: T);
    reject(reason: F);
}

interface PsDeferredVoid extends Q.Deferred<void> {
    promise: PsPromiseVoid;
    resolve(result?: void);
    reject(reason?: void);
}

interface PsDeferredError<F> extends PsDeferred<void, F>, Q.Deferred<void> {
    promise: PsPromiseError<F>;
    resolve(result?: void);
    reject(error: F);
}

interface PsDeferredErrorString extends PsDeferredError<string>, PsDeferred<void, string> {
}

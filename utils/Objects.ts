
/** Object utility functions, includes:
 * - extend(...) and extendToStatic(...) for extending '.prototype' and object properties
 * - values() counterpart to Object.keys()
 * - has*Properties() various functions for checking if 0 or more properties match a given condition
 */
module Objects {

    /** Get a set of property values from an object.
     * The list of property names can be provided, or if not provided,
     * all of the object's key values will be retrieved.
     * Example: ObjectUtil.values({ alpha: "101", beta: "22", charlie: "3" })
     * returns: ["101", "22", "3"]
     *
     * @param obj the object to retrieve property values from
     * @param keys optional (default: Object.keys(obj)) the list of property names
     * to retrieve from the object
     * @returns the values associated with 'keys' or 'Object.keys(obj)'
     */
    export function values<T, K extends keyof T>(obj: T, keys?: K[] | null | undefined): (T[K])[];
    export function values<T>(obj: { [id: string]: T } | { [id: number]: T }, keys?: string[] | null | undefined): T[];
    export function values<T>(obj: { [id: string]: T } | { [id: number]: T }, keys?: string[] | null | undefined): T[] {
        if (keys != null && !Array.isArray(keys)) {
            throw new Error("incorrect usage (" + obj + ", " + keys + "), expected (Object obj, Array<String> [keys])");
        }
        if (keys == null) {
            keys = Object.keys(obj);
        }

        var size = keys.length;
        var results: T[] = [];
        for (var i = 0; i < size; i++) {
            results.push((<any>obj)[keys[i]]);
        }
        return results;
    }


    /** Get a set of non-null property values from an object.
     * The list of property names can be provided, or if not provided,
     * all of the object's key values will be retrieved.
     * Example: ObjectUtil.valuesNotNull({ alpha: "1", beta: "2", charlie: "3", delta: null })
     * returns: ["1", "2", "3"]
     *
     * @param obj the object to retrieve property values from
     * @param keys optional (default: Object.keys(obj)) the list of property names
     * to retrieve from the object
     * @returns the non-null values associated with 'keys' or the
     * non-null values associated with 'Object.keys(obj)''
     */
    export function valuesNotNull<T, K extends keyof T>(obj: T, keys?: K[] | null | undefined): (T[K])[];
    export function valuesNotNull<T>(obj: { [id: string]: T } | { [id: number]: T }, keys?: string[] | null | undefined): T[];
    export function valuesNotNull<T>(obj: { [id: string]: T } | { [id: number]: T }, keys?: string[] | null | undefined): T[] {
        if (keys != null && !Array.isArray(keys)) {
            throw new Error("incorrect usage (" + obj + ", " + keys + "), expected (Object obj, Array<String> [keys])");
        }
        if (keys == null) {
            keys = Object.keys(obj);
        }

        var vals: T[] = [];
        for (var i = 0, size = keys.length; i < size; i++) {
            var prop = (<any>obj)[keys[i]];
            if (prop != null) {
                vals.push(prop);
            }
        }
        return vals;
    }


    /** Check if an object has at least 1 non-null property from a list of property names
     * @see hasMatchingProperties()
     */
    export function hasAnyNonFalseyProps<T>(obj: T | null | undefined, propNames: (keyof T & string)[]) {
        return hasMatchingProps(obj, propNames, function (val) { return !!val; }, propNames != null ? 1 : 0);
    }


    /** Check if an object has at least 1 non-null property from a list of property names
     * @see hasMatchingProperties()
     */
    export function hasAnyNonNullProps<T>(obj: T | null | undefined, propNames: (keyof T & string)[]) {
        return hasMatchingProps(obj, propNames, function (val) { return val != null; }, propNames != null ? 1 : 0);
    }


    /** Check if an object has non-null values for all of the propery names specified
     * @see hasMatchingProperties()
     */
    export function hasNonNullProps<T>(obj: T | null | undefined, propNames: (keyof T & string)[]) {
        return hasMatchingProps(obj, propNames, function (val) { return val != null; }, propNames != null ? propNames.length : 0);
    }


    /** Check if an object has matching values for all of the properties specified
     * Example: hasMatchingProperties({ alpha: 100 }, ["alpha"], function (v, n) { return v != null; })
     * returns: true
     * Or example: hasMatchingProperties({ alpha: 100, beta: null }, ["alpha", "beta", "gamma", "delta", "epsilon"], function (v, n) { return v != null; }, 3)
     * returns: false (and should return after checking 4 properties, since there are 5 properties, only 1 of the first 4 matches, and 3 are required)
     *
     * @param obj the object to check
     * @param propNames the array of property names to check for in 'obj'
     * @param requiredCount the number of properties (in the order they appear in the 'propNames' array)
     * required to be non-null before returning true, defaults to the size in the 'propNames' array
     * @returns true if the required number of properties exist in the object and match the condition function specified, false otherwise
     */
    export function hasMatchingProps<T>(obj: T | null | undefined, propNames: (keyof T & string)[], filter: (propVal: any, propName: string) => boolean, requiredCount: number = (propNames != null ? propNames.length : 0)): boolean {
        if (obj == null) {
            return false;
        }
        if (!Array.isArray(propNames)) {
            throw new Error("incorrect usage (" + obj + ", " + propNames + "), expected (Object obj, string[] propNames, Function filter, Number requiredCount?)");
        }

        var nonNullCount = 0;
        for (var i = 0, size = propNames.length; i < size; i++) {
            var propNameI = propNames[i];
            // test each property
            if (filter(obj[propNameI], propNameI)) {
                nonNullCount++;
                if (nonNullCount >= requiredCount) {
                    return true;
                }
            }
            else if (i - nonNullCount >= size - requiredCount) {
                // enough properties checks have already returned false, that we can return false early
                break;
            }
        }
        return false;
    }


    /** Create a deep copy of a source object.
     * NOTE: symbols, built-in types (such as array buffer, regex, etc.), and prototypes are not copied
     * @param source the object to copy
     */
    export function cloneDeep<T>(source: T): T;
    export function cloneDeep<T>(source: T | null | undefined): T | null;
    export function cloneDeep<T>(source: T | null | undefined): T | null {
        if (source == null) { return null; }
        var srcType: string;

        if (Array.isArray(source)) {
            var srcAry = <any[]><any>source;
            var res: any[] = [];
            for (var i = 0, size = srcAry.length; i < size; i++) {
                var srcItem = srcAry[i];
                res[i] = (srcItem !== null && typeof srcItem === "object") ? cloneDeep(srcItem) : srcItem;
            }
            return <T><any>res;
        }
        else if ((srcType = Object.prototype.toString.call(source)) === "[object Date]") {
            return <T><any>new Date((<any>source).getTime());
        }
        else if (srcType === "[object Object]") {
            var target = {};
            var keys = Object.keys(source);
            for (var ii = 0, sizeI = keys.length; ii < sizeI; ii++) {
                var keyI = keys[ii];
                var srcProp = (<any>source)[keyI];
                (<any>target)[keyI] = (srcProp !== null && typeof srcProp === "object") ? cloneDeep(srcProp) : srcProp;
            }
            return <T>target;
        }
        return source;
    }


    /** Create a deep copy of a source object excluding 'undefined' properties.
     * NOTE: symbols, built-in types (such as array buffer, regex, etc.), and prototypes are not copied
     * @param source the object to copy
     */
    export function cloneDeepNonUndefined<T>(source: T): T;
    export function cloneDeepNonUndefined<T>(source: T | null | undefined): T | null | undefined;
    export function cloneDeepNonUndefined<T>(source: T | null | undefined): T | null | undefined {
        if (source == null) { return null; }
        var srcType: string;

        if (Array.isArray(source)) {
            var srcAry = <any[]><any>source;
            var res: any[] = [];
            for (var i = 0, size = srcAry.length; i < size; i++) {
                var srcItem = srcAry[i];
                res[i] = (srcItem !== null && typeof srcItem === "object") ? cloneDeepNonUndefined(srcItem) : srcItem;
            }
            return <T><any>res;
        }
        else if ((srcType = Object.prototype.toString.call(source)) === "[object Date]") {
            return <T><any>new Date((<any>source).getTime());
        }
        else if (srcType === "[object Object]") {
            var target = {};
            var keys = Object.keys(source);
            for (var ii = 0, sizeI = keys.length; ii < sizeI; ii++) {
                var keyI = keys[ii];
                var srcProp = (<any>source)[keyI];
                if (srcProp !== undefined) {
                    (<any>target)[keyI] = (srcProp !== null && typeof srcProp === "object") ? cloneDeepNonUndefined(srcProp) : srcProp;
                }
            }
            return <T>target;
        }
        return source;
    }


    /** Create a shallow copy of a source object (only copy the object's property/element references).
     * NOTE: built-in types (such as array buffer, regex, etc.) are not copied, only objects and arrays are currently copied
     * @param source the object to copy
     * @param srcKeys optional list of property names to copy from the object, if present, only these properties are copied, else, all properties are copied
     */
    export function clone<T>(source: T | null | undefined, assigner?: (dst: object, src: T, keys?: string[]) => any): T;
    export function clone<T>(source: T | null | undefined, srcKeys?: string[], assigner?: (dst: object, src: T, keys?: string[]) => any): any;
    export function clone<T>(source: T | null | undefined, srcKeys?: string[] | ((dst: object, src: T, keys?: string[]) => any), assigner: (dst: any, src: T, keys?: string[]) => any = assign): any {
        if (source == null) { return null; }
        if (typeof srcKeys === "function") { assigner = <any>srcKeys; srcKeys = <undefined><any>null; }
        var srcType: string;

        if (Array.isArray(source)) {
            var res: any[] = [];
            Array.prototype.push.apply(res, source);
            return res;
        }
        else if ((srcType = Object.prototype.toString.call(source)) === "[object Date]") {
            return new Date((<any>source).getTime());
        }
        else if (srcType === "[object Object]") {
            return assigner({}, source, <string[]>srcKeys);
        }
        return source;
    }


    /** Assign source object properties to a target object.
     * If 'sources' contains multiple objects with the same property, the property from the last object in 'sources' takes preceedence.
     * Example: assign({ a: "Q", b: 2 }, { a: "Z", b: "B", c: 3 })
     * returns { a: "Z", b: "B", c: 3 }
     *
     * @param target the object to add/overwrite the properties to
     * @param sources the object to copy properties from
     */
    export function assign<T1, T2>(target: T1, source: T2): T1 & T2;
    export function assign<T1, T2, K extends (keyof T1 | keyof T2)>(target: T1, source: T2, srcKeys: K[]): { [R in K]: (T1 & T2)[R] };
    export function assign(target: object, source: object, srcKeys?: string[]): any {
        if (target == null) { throw new TypeError("assign() target cannot be null"); }

        var keys = srcKeys || Object.keys(source);
        for (var ii = 0, sizeI = keys.length; ii < sizeI; ii++) {
            var keyI = keys[ii];
            (<any>target)[keyI] = (<any>source)[keyI];
        }
        return target;
    }


    /** Assign source object properties to a target object excluding 'undefined' properties.
     * If 'sources' contains multiple objects with the same property, the property from the last object in 'sources' takes preceedence.
     * Example: assign({ a: "Q", b: 2 }, { a: "Z", b: "B", c: 3 })
     * returns { a: "Z", b: "B", c: 3 }
     *
     * @param target the object to add/overwrite the properties to
     * @param sources the object to copy properties from
     */
    export function assignNonUndefined<T1, T2>(target: T1, source: T2): T1 & T2;
    export function assignNonUndefined<T1, T2, K extends (keyof T1 | keyof T2)>(target: T1, source: T2, srcKeys: K[]): { [R in K]: (T1 & T2)[R] };
    export function assignNonUndefined(target: object, source: object, srcKeys?: string[]): any {
        if (target == null) { throw new TypeError("assign() target cannot be null"); }

        var keys = srcKeys || Object.keys(source);
        for (var ii = 0, sizeI = keys.length; ii < sizeI; ii++) {
            var keyI = keys[ii];
            var srcProp = (<any>source)[keyI];
            if (srcProp !== undefined) {
                (<any>target)[keyI] = srcProp;
            }
        }
        return target;
    }


    /** Assign source object properties to a target object.
     * If 'sources' contains multiple objects with the same property, the property from the last object in 'sources' takes preceedence.
     * Example: assignAll({ a: "Q", b: 2 }, [{ a: "Z", b: "B", c: 3 }, { a: "A", d: 4 }])
     * returns { a: "A", b: "B", c: 3, d: 4 }
     *
     * @param target the object to add/overwrite the properties to
     * @param sources the objects to copy properties from
     */
    export function assignAll<T>(target: T, sources: T[]): T;
    export function assignAll<T, S>(target: T, sources: S[]): (T & S);
    export function assignAll(target: object, sources: object[], srcsKeys?: string[][]): any;
    export function assignAll(target: object, sources: object[], srcsKeys?: string[][]): any {
        if (target == null) { throw new TypeError("assignAll() target cannot be null"); }

        for (var i = 0, size = sources.length; i < size; i++) {
            var src = sources[i];
            var srcKeys = (srcsKeys && srcsKeys[i]) || Object.keys(src);
            for (var ii = 0, sizeI = srcKeys.length; ii < sizeI; ii++) {
                var keyI = srcKeys[ii];
                var srcProp = (<any>src)[keyI];
                if (srcProp !== undefined) {
                    (<any>target)[keyI] = srcProp;
                }
            }
        }
        return target;
    }


    /** Modify classChild to extend classParent via prototypal inheritance.
     * Side-effect: classChild's prototype is modified.
     * @param classChild the sub class that inherits from 'classParent''
     * @param classParent the super class that 'classChild' will inherit from
     * @param allowChildToOverride true to keep existing 'classChild' properties, false to overwrite
     * child properties with parent properties when classParent and classChild have properties with the same name
     * @param deepExtend optional (default: false) if duplicate properties are found on the 'classChild' prototype that also exist on the 'classParent' prototype, then true allows
     * the last duplicate property to take precedence, false allows the first property to take precedence. Property precedence is also determined by 'allowChildToOverride'
     */
    export function extendPrototype(classChild: { prototype: object }, classParent: { prototype: object }, allowChildToOverride: boolean, deepExtend: boolean = false): void {
        if (classParent.prototype == null) {
            throw new Error(classParent + ", does not have the property '.prototype'");
        }
        var childProto = classChild.prototype;
        var newChildProto = Object.create(classParent.prototype);
        classChild.prototype = newChildProto;

        for (var key in childProto) {
            if (childProto.hasOwnProperty(key)) {
                var parentConflicts = newChildProto.hasOwnProperty(key) || (deepExtend && key in newChildProto);
                if ((parentConflicts && allowChildToOverride) || !parentConflicts) {
                    var descriptor = <PropertyDescriptor>Object.getOwnPropertyDescriptor(childProto, key);
                    if (descriptor.get || descriptor.set) {
                        Object.defineProperty(newChildProto, key, descriptor);
                    }
                    else {
                        newChildProto[key] = (<any>childProto)[key];
                    }
                }
            }
        }

        Object.defineProperty(classChild.prototype, "constructor", {
            value: classChild
        });
    }


    /** Modify classChild to extend classParent via prototype-to-static inheritance.
     * Side-effect: classChild is modified.
     * @param classChild the sub class that inherits from 'classParent''
     * @param classParent the super class that 'classChild' will inherit from
     * @param allowChildToOverride true to keep existing 'classChild' properties, false to overwrite
     * child properties with parent properties when classParent and classChild have properties with
     * the same name, also see 'throwErrorIfOverwrites''
     * @param throwErrorIfOverwrites true to throw an error if a 'classParent' property overwrites
     * a 'classChild' property, false to ignore the parent property and keep the classChild property
     * @see #extend()
     */
    export function extendToStatic(classChild: object, classParent: { prototype: object }, allowChildToOverride: boolean, throwErrorIfOverwrites: boolean = true): void {
        var parentProto = classParent.prototype;
        for (var key in parentProto) {
            if (parentProto.hasOwnProperty(key)) {
                if (allowChildToOverride && classChild.hasOwnProperty(key)) {
                    if (throwErrorIfOverwrites) {
                        throw new Error("child object '" + classChild + "' already has a property named '" + key + "', cannot inherit from parent '" + classParent + "'");
                    }
                    else {
                        // do nothing, allow child to keep it's override property
                    }
                }
                else {
                    var descriptor = <PropertyDescriptor>Object.getOwnPropertyDescriptor(parentProto, key);
                    if (descriptor.get || descriptor.set) {
                        Object.defineProperty(classChild, key, descriptor);
                    }
                    else {
                        (<any>classChild)[key] = (<any>parentProto)[key];
                    }
                }
            }
        }
    }


    /** Given a map of key/values, return a new map containing those keys and values inverted.
     * Example: { a: b, key: 123 }
     * returns: { b: a, 123: key }
     * @param srcMap the object to invert
     */
    export function invert<M extends { [key: string]: string }>(srcMap: M): { [key in M[keyof M]]: keyof M };
    export function invert(srcMap: object): { [key: string]: string };
    export function invert(srcMap: object): { [key: string]: string } {
        var inverseMap = Object.keys(srcMap).reduce((map, name) => {
            map[(<any>srcMap)[name]] = name;
            return map;
        }, <{ [key: string]: string }>{});
        return inverseMap;
    }


    /** Create a copy of a map (object where all properties are the same type) using a copy function for the properties.
     * @param source the source map
     * @param srcKeys optional, list of property names to copy from the object, if present, only these properties are copied, else, all properties are copied
     * @param mapFunc optional, function used to copy each of the properties from the source map, the return value is used as the new value for each property,
     * if undefined is returned, that property is not written to the returned object
     * @returns a new object containing the transformed properties
     */
    export function map<T>(source: T): T;
    export function map<T, R>(source: { [key: string]: T }, srcKeys: string[] | null | undefined, mapFunc?: (key: string, value: T) => R): { [key: string]: R };
    export function map<T, R>(source: { [key: string]: T }, mapFunc?: (key: string, value: T) => R): { [key: string]: R };
    export function map<T>(source: T, mapFunc?: (key: keyof T, value: any) => any): any;
    export function map<T>(source: T, srcKeys: (keyof T)[] | null | undefined, mapFunc?: (key: keyof T, value: any) => any): any
    export function map<T>(source: T, srcKeys?: (keyof T)[] | ((key: keyof T & string, value: any) => any) | null | undefined, mapFunc?: (key: keyof T & string, value: any) => any): any {
        if (source == null) { return null; }
        if (typeof srcKeys === "function") {
            mapFunc = <(key: string, value: any) => any>srcKeys;
            srcKeys = <undefined><any>null;
        }

        var target = <any>{};
        var keys = <(keyof T & string)[]>srcKeys || <(keyof T & string)[]>Object.keys(source);

        for (var i = 0, size = keys.length; i < size; i++) {
            var key = keys[i];
            var prop = source[key];
            var propRes = mapFunc == null || prop === undefined ? prop : mapFunc(key, prop);
            if (propRes !== undefined) {
                target[<string>key] = propRes;
            }
        }

        return target;
    }


    /** Convert an object to an array by iterating over the properties and transforming each property using a mapping function
     * @param obj the object to transform
     * @param srcKeys optional, list of property names to transform, if present, only these properties are transformed, else all of the properties on 'obj' are transformed
     * @param mapFunc the function that transforms a property name and value to a new value
     * @returns an array of the resulting properties generated using the 'mapFunc'
     */
    export function toArray<T, K extends keyof T, R>(obj: T, mapFunc: (key: K, value: T[K], index: number, propNames: K[], obj: T) => R): R[];
    export function toArray<T, K extends keyof T, R>(obj: T, srcKeys: K[], mapFunc: (key: K, value: T[K], index: number, propNames: K[], obj: T) => R): R[];
    export function toArray<T, K extends keyof T, R>(obj: T, srcKeys: K[] | ((key: K & string, value: T[K], index: number, propNames: K[], obj: T) => R), mapFunc?: (key: K & string, value: any, index: number, propNames: K[], obj: T) => R): R[] {
        if (obj == null) { return []; }
        if (typeof srcKeys === "function") {
            mapFunc = <(key: K & string, value: any, index: number, propNames: K[], obj: any) => R>srcKeys;
            srcKeys = <any>null;
        }

        var res: R[] = [];
        var keys = <(K & string)[]>srcKeys || <(K & string)[]>Object.keys(obj);

        for (var i = 0, size = keys.length; i < size; i++) {
            var key = keys[i];
            var prop = obj[key];
            res.push((<(key: K & string, value: any, index: number, propNames: K[], obj: any) => R>mapFunc)(key, prop, i, keys, obj));
        }

        return res;
    }

}

export = Objects;

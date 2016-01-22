
/** Object utility functions, includes:
 * - extend(...) and extendToStatic(...) for extending '.prototype' and object properties
 * - values() counterpart to Object.keys()
 * - has*Properties() various functions for checking if 0 or more properties match a given condition
 */
module Objects {

    /** Get a set of property values from an object.
     * The list of property names can be provided, or if not provided,
     * all of the object's key values will be retrieved.
     * Example: {@code ObjectUtil.values({ alpha: "1", beta: "2", charlie: "3" })}
     * returns: {@code ["1", "2", "3"]}
     *
     * @param obj: the object to retrieve property values from
     * @param [keys=Object.keys(obj)]: the list of property names
     * to retrieve from the object
     * @return the values associated with {@code keys} or {@code Object.keys(obj)}
     */
    export function values<T>(obj: { [id: string]: T } | { [id: number]: T }, keys?: string[]): T[] {
        if (keys != null && !Array.isArray(keys)) {
            throw new Error("incorrect usage (" + obj + ", " + keys + "), expected (Object obj, Array<String> [keys])");
        }
        if (keys == null) {
            keys = Object.keys(obj);
        }

        var size = keys.length;
        var results: any[] = new Array(size);
        for (var i = 0; i < size; i++) {
            results[i] = obj[keys[i]];
        }
        return results;
    }


    /** Get a set of non-null property values from an object.
     * The list of property names can be provided, or if not provided,
     * all of the object's key values will be retrieved.
     * Example: {@code ObjectUtil.valuesNotNull({ alpha: "1", beta: "2", charlie: "3", delta: null })}
     * returns: {@code ["1", "2", "3"]}
     *
     * @param obj: the object to retrieve property values from
     * @param [keys=Object.keys(obj)]: the list of property names
     * to retrieve from the object
     * @return the non-null values associated with {@code keys} or the
     * non-null values associated with {@code Object.keys(obj)}
     */
    export function valuesNotNull<T>(obj: { [id: string]: T } | { [id: number]: T }, keys?: string[]): T[] {
        if (keys != null && !Array.isArray(keys)) {
            throw new Error("incorrect usage (" + obj + ", " + keys + "), expected (Object obj, Array<String> [keys])");
        }
        if (keys == null) {
            keys = Object.keys(obj);
        }

        var vals: any[] = [];
        for (var i = 0, size = keys.length; i < size; i++) {
            var prop = obj[keys[i]];
            if (prop != null) {
                vals.push(prop);
            }
        }
        return vals;
    }


    /** Check if an object has at least 1 non-null property from a list of property names
     * @see hasMatchingProperties()
     */
    export function hasAnyNonFalseyProps(obj: any, propNames: string[]) {
        return hasMatchingProps(obj, propNames, function template_notNull(val) { return !!val; }, propNames != null ? 1 : 0);
    }


    /** Check if an object has at least 1 non-null property from a list of property names
     * @see hasMatchingProperties()
     */
    export function hasAnyNonNullProps(obj: any, propNames: string[]) {
        return hasMatchingProps(obj, propNames, function template_notNull(val) { return val != null; }, propNames != null ? 1 : 0);
    }


    /** Check if an object has non-null values for all of the propery names specified
     * @see hasMatchingProperties()
     */
    export function hasNonNullProps(obj: any, propNames: string[]) {
        return hasMatchingProps(obj, propNames, function template_notNull(val) { return val != null; }, propNames != null ? propNames.length : 0);
    }


    /** Check if an object has matching values for all of the properties specified
     * Example: {@code hasMatchingProperties({ alpha: 100 }, ["alpha"], function (v) { return v != null; })}
     * returns: {@code true}
     * Or example: {@code hasMatchingProperties({ alpha: 100, beta: null }, ["alpha", "beta", "gamma", "delta", "epsilon"], function (v) { return v != null; }, 3)}
     * returns: {@code false} (and should return after checking 4 properties, since there are 5 properties, only 1 of the first 4 matches, and 3 are required)
     *
     * @param obj: the object to check
     * @param propNames: the array of property names to check for in {@code obj}
     * @param requiredCount: the number of properties (in the order they appear in the {@code propNames} array)
     * required to be non-null before returning true, defaults to the size in the {@code propNames} array
     * @return true if the required number of properties exist in the object and match the condition function specified, false otherwise
     */
    export function hasMatchingProps(obj: any, propNames: string[], template_condition: (propVal) => boolean, requiredCount: number = (propNames != null ? propNames.length : 0)): boolean {
        if (obj == null) {
            return false;
        }
        if (!Array.isArray(propNames)) {
            throw new Error("incorrect usage (" + obj + ", " + propNames + "), expected (Object obj, Array<String> propNames, Function template_condition, Number requiredCount?)");
        }

        var nonNullCount = 0;
        for (var i = 0, size = propNames.length; i < size; i++) {
            var propNameI = propNames[i];
            // test each property
            if (obj.hasOwnProperty(propNameI) && template_condition(obj[propNameI]) === true) {
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


    /** Return the first non-null argument
     * @param arguments: an list of parameters to search through
     * @return the first argument that is not null, or null if all of the arguments are null
     */
    export function coalesce<T>(...args: T[]): T {
        for (var i = 0, size = args.length; i < size; i++) {
            var arg = args[i];
            if (arg != null) {
                return arg;
            }
        }
        return null;
    }


    export function cloneDeep<T>(source: T): T {
        if (source == null) { throw new TypeError("cloneDeep() source cannot be null"); }

        if (Array.isArray(source)) {
            var srcAry = <any[]><any>source;
            var res = [];
            for (var i = 0, size = srcAry.length; i < size; i++) {
                var srcItem = srcAry[i];
                res[i] = (srcItem !== null && typeof srcItem === "object") ? cloneDeep(srcItem) : srcItem;
            }
            return <T><any>res;
        }
        else {
            var target = {};
            var srcKeys = Object.keys(source);
            for (var ii = 0, sizeI = srcKeys.length; ii < sizeI; ii++) {
                var keyI = srcKeys[ii];
                var srcProp = source[keyI];
                if (srcProp !== undefined) {
                    target[keyI] = (srcProp !== null && typeof srcProp === "object") ? cloneDeep(srcProp) : srcProp;
                }
            }
            return <T>target;
        }
    }


    export function clone<T>(source: T, srcKeys?: string[]): T {
        if (source == null) { throw new TypeError("clone() source cannot be null"); }

        if (Array.isArray(source)) {
            var res = [];
            Array.prototype.push.apply(res, source);
            return <T><any>res;
        }
        else {
            return <T>assign({}, source, srcKeys);
        }
    }


    /** Assign source object properties to a target object.
     * If 'sources' contains multiple objects with the same property, the property from the last object in 'sources' takes preceedence.
     * Example: {@code assign({ a: "Q", b: 2 }, { a: "Z", b: "B", c: 3 })
     * returns {@code { a: "Z", b: "B", c: 3 }}
     *
     * @param target the object to add/overwrite the properties to
     * @param sources the object to copy properties from
     */
    export function assign(target: any, source: any, srcKeys?: string[]) {
        if (target == null) { throw new TypeError("assign() target cannot be null"); }

        srcKeys = srcKeys || Object.keys(source);
        for (var ii = 0, sizeI = srcKeys.length; ii < sizeI; ii++) {
            var keyI = srcKeys[ii];
            var srcProp = source[keyI];
            if (srcProp !== undefined) {
                target[keyI] = srcProp;
            }
        }
        return target;
    }


    /** Assign source object properties to a target object.
     * If 'sources' contains multiple objects with the same property, the property from the last object in 'sources' takes preceedence.
     * Example: {@code assignAll({ a: "Q", b: 2 }, [{ a: "Z", b: "B", c: 3 }, { a: "A", d: 4 }])
     * returns {@code { a: "A", b: "B", c: 3, d: 4 }}
     *
     * @param target the object to add/overwrite the properties to
     * @param sources the objects to copy properties from
     */
    export function assignAll(target: any, sources: any[], srcsKeys?: string[][]) {
        if (target == null) { throw new TypeError("assign() target cannot be null"); }

        for (var i = 0, size = sources.length; i < size; i++) {
            var src = sources[i];
            var srcKeys = (srcsKeys && srcsKeys[i]) || Object.keys(src);
            for (var ii = 0, sizeI = srcKeys.length; ii < sizeI; ii++) {
                var keyI = srcKeys[ii];
                var srcProp = src[keyI];
                if (srcProp !== undefined) {
                    target[keyI] = srcProp;
                }
            }
        }
        return target;
    }


    /** Get a property from an object without the risk of an undefined error.
     * Return null if either the object or the property are null or undefined.
     * Example: {@code getProp(undefined, "alpha")}
     * returns: {@code null}
     * Or example: {@code getProp({ alpha: 342 }, "alpha")}
     * returns: {@code 342}
     *
     * @param obj: the object to retrieve the property from
     * @param propertyName: the name of the object property to retrieve
     * @return the property retrieved from the object if both the object and property are not null, else null
     */
    export function getProp(obj: any, propertyName: string): any {
        if (obj == null) { return null; }
        var prop = obj[propertyName];
        return prop == null ? null : prop;
    }


    /** Get multiple properties from an object without the risk of an undefined error.
     * Return an empty array if either the object or the list of property names are null or undefined.
     * Example: {@code getProps(undefined, ["alpha", "beta"])}
     * returns: {@code []}
     * Or example: {@code getProp({ alpha: 342, beta: "B" }, ["alpha", "beta"])}
     * returns: {@code [342, "B"]}
     *
     * @param obj: the object to retrieve the properties from
     * @param propertyNames: the names of the object properties to retrieve
     * @return the properties retrieved from the object if both the object
     * and property names are not null, else an empty array
     */
    export function getProps(obj: any, propertyNames: string[]): any[] {
        if (obj == null || propertyNames == null || !Array.isArray(propertyNames)) { return []; }
        var size = propertyNames.length;
        var res = new Array(size);
        for (var i = 0; i < size; i++) {
            res[i] = obj[propertyNames[i]] || null;
        }
        return res;
    }


    /** Convert null or undefined values to an empty string, else returns the value unmodified
     * Example: {@code orEmptyString(8543.213)}
     * returns: {@code 8543.213}
     * Or example: {@code orEmptyString(null)}
     * returns: {@code ""}
     *
     * @param val: the value to check
     * @return the {@code val} object or {@code ""} if val is null or undefined
     */
    export function orEmptyString<T>(val: T): any {
        return val != null ? val : "";
    }


    /** Modify classChild to extend classParent via prototypal inheritance.
     * Side-effect: classChild's prototype is modified.
     * @param classChild: the sub class that inherits from {@code classParent}
     * @param classParent: the super class that {@code classChild} will inherit from
     * @param allowChildToOverride: true to keep existing {@code classChild} properties, false to overwrite
     * child properties with parent properties when classParent and classChild have properties with the same name
     */
    export function extend(classChild: any, classParent: any, allowChildToOverride: boolean, deepExtend: boolean = false): void {
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
                    var descriptor = Object.getOwnPropertyDescriptor(childProto, key);
                    if (descriptor.get || descriptor.set) {
                        Object.defineProperty(newChildProto, key, descriptor);
                    }
                    else {
                        newChildProto[key] = childProto[key];
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
     * @param classChild: the sub class that inherits from {@code classParent}
     * @param classParent: the super class that {@code classChild} will inherit from
     * @param allowChildToOverride: true to keep existing {@code classChild} properties, false to overwrite
     * child properties with parent properties when classParent and classChild have properties with the same name,
     * also see {@code throwErrorIfOverwrites}
     * @param throwErrorIfOverwrites: true to throw an error if a {@code classParent} property overwrites
     * a {@code classChild} property, false to ignore the parent property and keep the classChild property
     * @see #extend()
     */
    export function extendToStatic(classChild: any, classParent: any, allowChildToOverride: boolean, throwErrorIfOverwrites: boolean = true): void {
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
                    var descriptor = Object.getOwnPropertyDescriptor(parentProto, key);
                    if (descriptor.get || descriptor.set) {
                        Object.defineProperty(classChild, key, descriptor);
                    }
                    else {
                        classChild[key] = parentProto[key];
                    }
                }
            }
        }
    }

}

export = Objects;

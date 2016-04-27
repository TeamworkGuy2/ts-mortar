"use strict";
/** Object utility functions, includes:
 * - extend(...) and extendToStatic(...) for extending '.prototype' and object properties
 * - values() counterpart to Object.keys()
 * - has*Properties() various functions for checking if 0 or more properties match a given condition
 */
var Objects;
(function (Objects) {
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
    function values(obj, keys) {
        if (keys != null && !Array.isArray(keys)) {
            throw new Error("incorrect usage (" + obj + ", " + keys + "), expected (Object obj, Array<String> [keys])");
        }
        if (keys == null) {
            keys = Object.keys(obj);
        }
        var size = keys.length;
        var results = new Array(size);
        for (var i = 0; i < size; i++) {
            results[i] = obj[keys[i]];
        }
        return results;
    }
    Objects.values = values;
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
    function valuesNotNull(obj, keys) {
        if (keys != null && !Array.isArray(keys)) {
            throw new Error("incorrect usage (" + obj + ", " + keys + "), expected (Object obj, Array<String> [keys])");
        }
        if (keys == null) {
            keys = Object.keys(obj);
        }
        var vals = [];
        for (var i = 0, size = keys.length; i < size; i++) {
            var prop = obj[keys[i]];
            if (prop != null) {
                vals.push(prop);
            }
        }
        return vals;
    }
    Objects.valuesNotNull = valuesNotNull;
    /** Check if an object has at least 1 non-null property from a list of property names
     * @see hasMatchingProperties()
     */
    function hasAnyNonFalseyProps(obj, propNames) {
        return hasMatchingProps(obj, propNames, function template_notNull(val) { return !!val; }, propNames != null ? 1 : 0);
    }
    Objects.hasAnyNonFalseyProps = hasAnyNonFalseyProps;
    /** Check if an object has at least 1 non-null property from a list of property names
     * @see hasMatchingProperties()
     */
    function hasAnyNonNullProps(obj, propNames) {
        return hasMatchingProps(obj, propNames, function template_notNull(val) { return val != null; }, propNames != null ? 1 : 0);
    }
    Objects.hasAnyNonNullProps = hasAnyNonNullProps;
    /** Check if an object has non-null values for all of the propery names specified
     * @see hasMatchingProperties()
     */
    function hasNonNullProps(obj, propNames) {
        return hasMatchingProps(obj, propNames, function template_notNull(val) { return val != null; }, propNames != null ? propNames.length : 0);
    }
    Objects.hasNonNullProps = hasNonNullProps;
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
    function hasMatchingProps(obj, propNames, template_condition, requiredCount) {
        if (requiredCount === void 0) { requiredCount = (propNames != null ? propNames.length : 0); }
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
    Objects.hasMatchingProps = hasMatchingProps;
    /** Create a deep copy of a source object.
     * NOTE: symbols, built-in types (such as array buffer, regex, etc.), and prototypes are not copied
     * @param source the object to copy
     */
    function cloneDeep(source) {
        if (source == null) {
            throw new TypeError("cloneDeep() source cannot be null");
        }
        var srcType;
        if (Array.isArray(source)) {
            var srcAry = source;
            var res = [];
            for (var i = 0, size = srcAry.length; i < size; i++) {
                var srcItem = srcAry[i];
                res[i] = (srcItem !== null && typeof srcItem === "object") ? cloneDeep(srcItem) : srcItem;
            }
            return res;
        }
        else if ((srcType = Object.prototype.toString.call(source)) === "[object Date]") {
            return new Date(source.getTime());
        }
        else if (srcType === "[object Object]") {
            var target = {};
            var srcKeys = Object.keys(source);
            for (var ii = 0, sizeI = srcKeys.length; ii < sizeI; ii++) {
                var keyI = srcKeys[ii];
                var srcProp = source[keyI];
                if (srcProp !== undefined) {
                    target[keyI] = (srcProp !== null && typeof srcProp === "object") ? cloneDeep(srcProp) : srcProp;
                }
            }
            return target;
        }
        return source;
    }
    Objects.cloneDeep = cloneDeep;
    function clone(source, srcKeys) {
        if (source == null) {
            throw new TypeError("clone() source cannot be null");
        }
        if (Array.isArray(source)) {
            var res = [];
            Array.prototype.push.apply(res, source);
            return res;
        }
        else {
            return assign({}, source, srcKeys);
        }
    }
    Objects.clone = clone;
    function assign(target, source, srcKeys) {
        if (target == null) {
            throw new TypeError("assign() target cannot be null");
        }
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
    Objects.assign = assign;
    /** Assign source object properties to a target object.
     * If 'sources' contains multiple objects with the same property, the property from the last object in 'sources' takes preceedence.
     * Example: {@code assignAll({ a: "Q", b: 2 }, [{ a: "Z", b: "B", c: 3 }, { a: "A", d: 4 }])
     * returns {@code { a: "A", b: "B", c: 3, d: 4 }}
     *
     * @param target the object to add/overwrite the properties to
     * @param sources the objects to copy properties from
     */
    function assignAll(target, sources, srcsKeys) {
        if (target == null) {
            throw new TypeError("assignAll() target cannot be null");
        }
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
    Objects.assignAll = assignAll;
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
    function getProp(obj, propertyName) {
        if (obj == null) {
            return null;
        }
        var prop = obj[propertyName];
        return prop == null ? null : prop;
    }
    Objects.getProp = getProp;
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
    function getProps(obj, propertyNames) {
        if (obj == null || propertyNames == null || !Array.isArray(propertyNames)) {
            return [];
        }
        var size = propertyNames.length;
        var res = new Array(size);
        for (var i = 0; i < size; i++) {
            res[i] = obj[propertyNames[i]] || null;
        }
        return res;
    }
    Objects.getProps = getProps;
    /** Convert null or undefined values to an empty string, else returns the value unmodified
     * Example: {@code orEmptyString(8543.213)}
     * returns: {@code 8543.213}
     * Or example: {@code orEmptyString(null)}
     * returns: {@code ""}
     *
     * @param val: the value to check
     * @return the {@code val} object or {@code ""} if val is null or undefined
     */
    function orEmptyString(val) {
        return val != null ? val : "";
    }
    Objects.orEmptyString = orEmptyString;
    /** Modify classChild to extend classParent via prototypal inheritance.
     * Side-effect: classChild's prototype is modified.
     * @param classChild: the sub class that inherits from {@code classParent}
     * @param classParent: the super class that {@code classChild} will inherit from
     * @param allowChildToOverride: true to keep existing {@code classChild} properties, false to overwrite
     * child properties with parent properties when classParent and classChild have properties with the same name
     */
    function extend(classChild, classParent, allowChildToOverride, deepExtend) {
        if (deepExtend === void 0) { deepExtend = false; }
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
    Objects.extend = extend;
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
    function extendToStatic(classChild, classParent, allowChildToOverride, throwErrorIfOverwrites) {
        if (throwErrorIfOverwrites === void 0) { throwErrorIfOverwrites = true; }
        var parentProto = classParent.prototype;
        for (var key in parentProto) {
            if (parentProto.hasOwnProperty(key)) {
                if (allowChildToOverride && classChild.hasOwnProperty(key)) {
                    if (throwErrorIfOverwrites) {
                        throw new Error("child object '" + classChild + "' already has a property named '" + key + "', cannot inherit from parent '" + classParent + "'");
                    }
                    else {
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
    Objects.extendToStatic = extendToStatic;
    /** Given a map of key/values, return a new map containing those keys and values inverted.
     * Example: {@code { a: b, key: 123 }}
     * returns: {@code { b: a, 123: key }}
     * @param srcMap the object to invert
     */
    function invert(srcMap) {
        var inverseMap = Object.keys(srcMap).reduce(function (map, name) {
            map[srcMap[name]] = name;
            return map;
        }, {});
        return inverseMap;
    }
    Objects.invert = invert;
    function map(source, srcKeys, mapFunc) {
        if (source == null) {
            return null;
        }
        if (typeof srcKeys === "function") {
            mapFunc = srcKeys;
            srcKeys = null;
        }
        var target = {};
        var keys = srcKeys || Object.keys(source);
        for (var i = 0, size = keys.length; i < size; i++) {
            var key = keys[i];
            var prop = source[key];
            var propRes = mapFunc == null || prop === undefined ? prop : mapFunc(key, prop);
            if (propRes !== undefined) {
                target[key] = propRes;
            }
        }
        return target;
    }
    Objects.map = map;
    function toArray(obj, srcKeys, mapFunc) {
        if (obj == null) {
            return [];
        }
        if (typeof srcKeys === "function") {
            mapFunc = srcKeys;
            srcKeys = null;
        }
        var res = [];
        var keys = srcKeys || Object.keys(obj);
        for (var i = 0, size = keys.length; i < size; i++) {
            var key = keys[i];
            var prop = obj[key];
            res[i] = mapFunc(key, prop, i, keys, obj);
        }
        return res;
    }
    Objects.toArray = toArray;
})(Objects || (Objects = {}));
module.exports = Objects;

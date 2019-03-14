"use strict";
/** Object utility functions, includes:
 * - extend(...) and extendToStatic(...) for extending '.prototype' and object properties
 * - values() counterpart to Object.keys()
 * - has*Properties() various functions for checking if 0 or more properties match a given condition
 */
var Objects;
(function (Objects) {
    function values(obj, keys) {
        if (keys != null && !Array.isArray(keys)) {
            throw new Error("incorrect usage (" + obj + ", " + keys + "), expected (Object obj, Array<String> [keys])");
        }
        if (keys == null) {
            keys = Object.keys(obj);
        }
        var size = keys.length;
        var results = [];
        for (var i = 0; i < size; i++) {
            results.push(obj[keys[i]]);
        }
        return results;
    }
    Objects.values = values;
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
        return hasMatchingProps(obj, propNames, function (val) { return !!val; }, propNames != null ? 1 : 0);
    }
    Objects.hasAnyNonFalseyProps = hasAnyNonFalseyProps;
    /** Check if an object has at least 1 non-null property from a list of property names
     * @see hasMatchingProperties()
     */
    function hasAnyNonNullProps(obj, propNames) {
        return hasMatchingProps(obj, propNames, function (val) { return val != null; }, propNames != null ? 1 : 0);
    }
    Objects.hasAnyNonNullProps = hasAnyNonNullProps;
    /** Check if an object has non-null values for all of the propery names specified
     * @see hasMatchingProperties()
     */
    function hasNonNullProps(obj, propNames) {
        return hasMatchingProps(obj, propNames, function (val) { return val != null; }, propNames != null ? propNames.length : 0);
    }
    Objects.hasNonNullProps = hasNonNullProps;
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
    function hasMatchingProps(obj, propNames, filter, requiredCount) {
        if (requiredCount === void 0) { requiredCount = (propNames != null ? propNames.length : 0); }
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
    Objects.hasMatchingProps = hasMatchingProps;
    function cloneDeep(source) {
        if (source == null) {
            return null;
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
            var keys = Object.keys(source);
            for (var ii = 0, sizeI = keys.length; ii < sizeI; ii++) {
                var keyI = keys[ii];
                var srcProp = source[keyI];
                target[keyI] = (srcProp !== null && typeof srcProp === "object") ? cloneDeep(srcProp) : srcProp;
            }
            return target;
        }
        return source;
    }
    Objects.cloneDeep = cloneDeep;
    function cloneDeepNonUndefined(source) {
        if (source == null) {
            return null;
        }
        var srcType;
        if (Array.isArray(source)) {
            var srcAry = source;
            var res = [];
            for (var i = 0, size = srcAry.length; i < size; i++) {
                var srcItem = srcAry[i];
                res[i] = (srcItem !== null && typeof srcItem === "object") ? cloneDeepNonUndefined(srcItem) : srcItem;
            }
            return res;
        }
        else if ((srcType = Object.prototype.toString.call(source)) === "[object Date]") {
            return new Date(source.getTime());
        }
        else if (srcType === "[object Object]") {
            var target = {};
            var keys = Object.keys(source);
            for (var ii = 0, sizeI = keys.length; ii < sizeI; ii++) {
                var keyI = keys[ii];
                var srcProp = source[keyI];
                if (srcProp !== undefined) {
                    target[keyI] = (srcProp !== null && typeof srcProp === "object") ? cloneDeepNonUndefined(srcProp) : srcProp;
                }
            }
            return target;
        }
        return source;
    }
    Objects.cloneDeepNonUndefined = cloneDeepNonUndefined;
    function clone(source, srcKeys, assigner) {
        if (assigner === void 0) { assigner = assign; }
        if (source == null) {
            return null;
        }
        if (typeof srcKeys === "function") {
            assigner = srcKeys;
            srcKeys = null;
        }
        var srcType;
        if (Array.isArray(source)) {
            var res = [];
            Array.prototype.push.apply(res, source);
            return res;
        }
        else if ((srcType = Object.prototype.toString.call(source)) === "[object Date]") {
            return new Date(source.getTime());
        }
        else if (srcType === "[object Object]") {
            return assigner({}, source, srcKeys);
        }
        return source;
    }
    Objects.clone = clone;
    function assign(target, source, srcKeys) {
        if (target == null) {
            throw new TypeError("assign() target cannot be null");
        }
        var keys = srcKeys || Object.keys(source);
        for (var ii = 0, sizeI = keys.length; ii < sizeI; ii++) {
            var keyI = keys[ii];
            target[keyI] = source[keyI];
        }
        return target;
    }
    Objects.assign = assign;
    function assignNonUndefined(target, source, srcKeys) {
        if (target == null) {
            throw new TypeError("assign() target cannot be null");
        }
        var keys = srcKeys || Object.keys(source);
        for (var ii = 0, sizeI = keys.length; ii < sizeI; ii++) {
            var keyI = keys[ii];
            var srcProp = source[keyI];
            if (srcProp !== undefined) {
                target[keyI] = srcProp;
            }
        }
        return target;
    }
    Objects.assignNonUndefined = assignNonUndefined;
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
    /** Modify classChild to extend classParent via prototypal inheritance.
     * Side-effect: classChild's prototype is modified.
     * @param classChild the sub class that inherits from 'classParent''
     * @param classParent the super class that 'classChild' will inherit from
     * @param allowChildToOverride true to keep existing 'classChild' properties, false to overwrite
     * child properties with parent properties when classParent and classChild have properties with the same name
     * @param deepExtend optional (default: false) if duplicate properties are found on the 'classChild' prototype that also exist on the 'classParent' prototype, then true allows
     * the last duplicate property to take precedence, false allows the first property to take precedence. Property precedence is also determined by 'allowChildToOverride'
     */
    function extendPrototype(classChild, classParent, allowChildToOverride, deepExtend) {
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
    Objects.extendPrototype = extendPrototype;
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
    Objects.extendToStatic = extendToStatic;
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
            res.push(mapFunc(key, prop, i, keys, obj));
        }
        return res;
    }
    Objects.toArray = toArray;
})(Objects || (Objects = {}));
module.exports = Objects;

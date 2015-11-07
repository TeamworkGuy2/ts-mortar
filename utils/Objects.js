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
        var results = new Array(size);
        for (var i = 0; i < size; i++) {
            results[i] = obj[keys[i]];
        }
        return results;
    }
    Objects.values = values;
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
    function hasAnyNonFalseyProps(obj, propNames) {
        return hasMatchingProps(obj, propNames, function template_notNull(val) { return !!val; }, propNames != null ? 1 : 0);
    }
    Objects.hasAnyNonFalseyProps = hasAnyNonFalseyProps;
    function hasAnyNonNullProps(obj, propNames) {
        return hasMatchingProps(obj, propNames, function template_notNull(val) { return val != null; }, propNames != null ? 1 : 0);
    }
    Objects.hasAnyNonNullProps = hasAnyNonNullProps;
    function hasNonNullProps(obj, propNames) {
        return hasMatchingProps(obj, propNames, function template_notNull(val) { return val != null; }, propNames != null ? propNames.length : 0);
    }
    Objects.hasNonNullProps = hasNonNullProps;
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
            if (obj.hasOwnProperty(propNameI) && template_condition(obj[propNameI]) === true) {
                nonNullCount++;
                if (nonNullCount >= requiredCount) {
                    return true;
                }
            }
            else if (i - nonNullCount >= size - requiredCount) {
                break;
            }
        }
        return false;
    }
    Objects.hasMatchingProps = hasMatchingProps;
    function coalesce() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        for (var i = 0, size = args.length; i < size; i++) {
            var arg = args[i];
            if (arg != null) {
                return arg;
            }
        }
        return null;
    }
    Objects.coalesce = coalesce;
    function getProp(obj, propertyName) {
        if (obj == null) {
            return null;
        }
        var prop = obj[propertyName];
        return prop == null ? null : prop;
    }
    Objects.getProp = getProp;
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
    function orEmptyString(val) {
        return val != null ? val : "";
    }
    Objects.orEmptyString = orEmptyString;
    function extend(classChild, classParent, allowChildToOverride) {
        if (allowChildToOverride === void 0) { allowChildToOverride = true; }
        if (classParent.prototype == null) {
            throw new Error(classParent + ", does not have the property '.prototype'");
        }
        var childProto = classChild.prototype;
        var newChildProto = Object.create(classParent.prototype);
        classChild.prototype = newChildProto;
        for (var key in childProto) {
            if (childProto.hasOwnProperty(key)) {
                if (allowChildToOverride && newChildProto.hasOwnProperty(key)) {
                }
                else {
                    newChildProto[key] = childProto[key];
                }
            }
        }
        Object.defineProperty(classChild.prototype, "constructor", {
            value: classChild
        });
    }
    Objects.extend = extend;
    function extendToStatic(classChild, classParent, allowChildToOverride, throwErrorIfOverwrites) {
        if (allowChildToOverride === void 0) { allowChildToOverride = true; }
        if (throwErrorIfOverwrites === void 0) { throwErrorIfOverwrites = true; }
        var parentProto = classParent.prototype;
        for (var key in parentProto) {
            if (parentProto.hasOwnProperty(key)) {
                if (allowChildToOverride && classChild.hasOwnProperty(key)) {
                    if (throwErrorIfOverwrites) {
                        throw new Error("child object '" + classChild + "' already has a property named '" + key + "', cannot inherit from parent '" + classParent + "'");
                    }
                }
                else {
                    classChild[key] = parentProto[key];
                }
            }
        }
    }
    Objects.extendToStatic = extendToStatic;
})(Objects || (Objects = {}));
module.exports = Objects;

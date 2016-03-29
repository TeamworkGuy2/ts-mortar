"use strict";
var Objects = require("./Objects");
var EnumCreator;
(function (EnumCreator) {
    var EnumClassImpl = (function () {
        function EnumClassImpl(enumClass, enumConstantClass, enumConstants) {
            this.enumClass = enumClass;
            this.enumConstantClass = enumConstantClass;
            this.enumConstants = enumConstants;
        }
        EnumClassImpl.prototype.isInstance = function (obj) {
            return obj != null && (obj.constructor != null &&
                ((obj.constructor.name === this.enumConstantClass.name) || (obj instanceof this.enumConstantClass)));
        };
        EnumClassImpl.prototype.values = function () {
            return this.enumConstants;
        };
        EnumClassImpl.prototype.parse = function (name, throwErrorIfNotEnum) {
            var enumVal = null;
            if (this.enumClass.hasOwnProperty(name)) {
                enumVal = this.enumClass[name];
            }
            if (enumVal === null && throwErrorIfNotEnum) {
                throw new Error("enum constant '" + name + "' is not a member of enum '" + this.enumClass + "'");
            }
            return enumVal;
        };
        return EnumClassImpl;
    }());
    EnumCreator.EnumClassImpl = EnumClassImpl;
    var EnumConstantImpl = (function () {
        function EnumConstantImpl(name) {
            this._name = name;
        }
        EnumConstantImpl.prototype.name = function () {
            return this._name;
        };
        EnumConstantImpl.prototype.toString = function () {
            return this._name;
        };
        return EnumConstantImpl;
    }());
    EnumCreator.EnumConstantImpl = EnumConstantImpl;
    function initEnumConst(enumConst, name) {
        EnumConstantImpl.call(enumConst, name);
    }
    EnumCreator.initEnumConst = initEnumConst;
    function initEnumClass(enumClass, enumConstantClass, enumConstantsGetter) {
        Objects.extend(enumClass, EnumConstantImpl, false, true);
        var enumConstants = enumConstantsGetter();
        EnumClassImpl.call(enumClass, enumClass, enumConstantClass, enumConstants);
        Objects.extendToStatic(enumClass, EnumClassImpl, false);
    }
    EnumCreator.initEnumClass = initEnumClass;
})(EnumCreator || (EnumCreator = {}));
module.exports = EnumCreator;

"use strict";
var Objects = require("./Objects");
/** A class for creating Java/C# like enums from objects.
 * Can create enum classes with EnumCreator.initEnumClass(EnumClass, EnumClass, enumInstancesConstructorFunc)
 * And create enum instances by calling EnumCreator.EnumConstantImpl.call(this, nameString) in the enum instance constructor
 */
var EnumCreator;
(function (EnumCreator) {
    var EnumClass = (function () {
        function EnumClass(enumClass, enumConstantClass, enumConstants) {
            this.enumClass = enumClass;
            this.enumConstantClass = enumConstantClass;
            this.enumConstants = enumConstants;
        }
        EnumClass.prototype.isInstance = function (obj) {
            return obj != null && (obj.constructor != null &&
                ((obj.constructor.name === this.enumConstantClass.name) || (obj instanceof this.enumConstantClass)));
        };
        EnumClass.prototype.values = function () {
            return this.enumConstants;
        };
        EnumClass.prototype.tryParse = function (name) {
            var enumVal = this.enumClass[name];
            return enumVal;
        };
        EnumClass.prototype.parse = function (name) {
            var enumVal = this.tryParse(name);
            if (enumVal == null) {
                throw new Error("enum '" + this.enumClass + "' does not contain a member named '" + name + "'");
            }
            return enumVal;
        };
        return EnumClass;
    }());
    EnumCreator.EnumClass = EnumClass;
    var EnumConstantImpl = (function () {
        function EnumConstantImpl(name, ordinal) {
            this.name = name;
            this.ordinal = ordinal;
        }
        EnumConstantImpl.prototype.toString = function () {
            return this.name;
        };
        return EnumConstantImpl;
    }());
    EnumCreator.EnumConstantImpl = EnumConstantImpl;
    function asMember(enumMember) {
        return enumMember;
    }
    function initEnumMember(enumMember, name, ordinal) {
        EnumConstantImpl.call(enumMember, name, ordinal);
        return enumMember;
    }
    EnumCreator.initEnumMember = initEnumMember;
    function initEnumClass(enumClass, enumMemberClass, enumMembersCreator, names, getName) {
        // extend the enum member type
        Objects.extend(enumMemberClass, EnumConstantImpl, false, true);
        var membersAry = [];
        var enumMembers = enumMembersCreator(asMember);
        // setup the enum members
        names = names || Object.keys(enumMembers);
        for (var i = 0, size = names.length; i < size; i++) {
            var key = names[i];
            var enumMember = enumMembers[key];
            var resName = getName ? getName(key, enumMember) : key;
            var ordinal = i;
            var newMember = initEnumMember(enumMember, resName, ordinal);
            enumClass[resName] = newMember;
            membersAry.push(newMember);
        }
        membersAry.sort(function (a, b) { return a.ordinal - b.ordinal; });
        // extend the enum class
        EnumClass.call(enumClass, enumClass, enumMemberClass, membersAry);
        Objects.extendToStatic(enumClass, EnumClass, false);
        return enumClass;
    }
    EnumCreator.initEnumClass = initEnumClass;
})(EnumCreator || (EnumCreator = {}));
module.exports = EnumCreator;

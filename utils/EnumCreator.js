"use strict";
/// <reference path="./enum-creator.d.ts" />
var Objects = require("./Objects");
/** A class for creating Java/C# like enums from objects.
 * Here's an example of creating an enum:
 *
 * class MyEnumBase {
 *     public special: any;
 *
 *     constructor(special: any) {
 *         this.special = special;
 *     }
 * }
 *
 * var MyEnum = EnumCreator.initEnumClass(MyEnumBase, MyEnumBase, (toMember) => {
 *     return {
 *         SMALL: toMember(new MyEnumBase("6px")),
 *         MEDIUM: toMember(new MyEnumBase("10px")),
 *         LARGE: toMember(new MyEnumBase("16px")),
 *     };
 * });
 *
 * type MyEnum = MyEnumBase & EnumCreator.EnumMember;
 *
 * export = MyEnum;
 */
var EnumCreatorImpl;
(function (EnumCreatorImpl) {
    var EnumClass = /** @class */ (function () {
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
    EnumCreatorImpl.EnumClass = EnumClass;
    var EnumMemberImpl = /** @class */ (function () {
        function EnumMemberImpl(name, ordinal) {
            this.name = name;
            this.ordinal = ordinal;
        }
        EnumMemberImpl.prototype.toString = function () {
            return this.name;
        };
        return EnumMemberImpl;
    }());
    EnumCreatorImpl.EnumMemberImpl = EnumMemberImpl;
    function asMember(enumMember) {
        return enumMember;
    }
    function initEnumMember(enumMember, name, ordinal) {
        EnumMemberImpl.call(enumMember, name, ordinal);
        return enumMember;
    }
    EnumCreatorImpl.initEnumMember = initEnumMember;
    /** Take an existing class and modify it so it implements EnumType and
     * take a getter for the enum's members and modify each so they implement EnumMember.
     * @param enumClass the enum class
     * @param enumMemberClass the enum member class (can be different than 'enumClass', but commonly the same)
     * @param enumMembersCreator function to get/create the enum's members,
     * this must returns a map associating member names to member objects that are first passed to the 'memberCreator' parameter passed to this function
     * @param [names] optional list of the member names (must match property names of the returned object from 'enumMembersCreator', allows a specific order to be imposed on the enum members
     * @param [getName] optional function to transform the name of each enum member
     * @param [memberVisitor] optional function to transform each enum member
     */
    function initEnumClass(enumClass, enumMemberClass, enumMembersCreator, names, getName, memberVisitor) {
        // extend the enum member type
        Objects.extend(enumMemberClass, EnumMemberImpl, false, true);
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
            if (memberVisitor != null) {
                var res = memberVisitor(newMember);
                if (res != null) {
                    newMember = res;
                }
            }
            enumClass[resName] = newMember;
            membersAry.push(newMember);
        }
        membersAry.sort(function (a, b) { return a.ordinal - b.ordinal; });
        // extend the enum class
        EnumClass.call(enumClass, enumClass, enumMemberClass, membersAry);
        Objects.extendToStatic(enumClass, EnumClass, false);
        return enumClass;
    }
    EnumCreatorImpl.initEnumClass = initEnumClass;
})(EnumCreatorImpl || (EnumCreatorImpl = {}));
module.exports = EnumCreatorImpl;

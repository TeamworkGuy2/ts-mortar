/// <reference path="./enum-creator.d.ts" />
import Objects = require("./Objects");

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
module EnumCreatorImpl {

    export type EnumMember = EnumCreator.EnumMember;

    export type EnumType<T> = EnumCreator.EnumType<T>;


    export class EnumClass<T> implements EnumType<T> {
        private enumConstants: T[];
        private enumClass: any;
        private enumConstantClass: any;


        constructor(enumClass: any, enumConstantClass: any, enumConstants: T[]) {
            this.enumClass = enumClass;
            this.enumConstantClass = enumConstantClass;
            this.enumConstants = enumConstants;
        }


        public isInstance(obj: any): boolean {
            return obj != null && (obj.constructor != null &&
                ((obj.constructor.name === this.enumConstantClass.name) || (obj instanceof this.enumConstantClass)));
        }


        public values(): T[] {
            return this.enumConstants;
        }


        public tryParse(name: string): T {
            var enumVal = this.enumClass[name];
            return enumVal;
        }
    

        public parse(name: string): T {
            var enumVal = this.tryParse(name);
            if (enumVal == null) {
                throw new Error("enum '" + this.enumClass + "' does not contain a member named '" + name + "'");
            }
            return enumVal;
        }

    }




    export class EnumMemberImpl implements EnumMember {
        public name: string;
        public ordinal: number;


        constructor(name: string, ordinal: number) {
            this.name = name;
            this.ordinal = ordinal;
        }


        public toString() {
            return this.name;
        }

    }




    function asMember<T>(enumMember: T): T & EnumMember {
        return <T & EnumMember>enumMember;
    }


    export function initEnumMember<T>(enumMember: T, name: string, ordinal: number): T & EnumMember {
        EnumMemberImpl.call(enumMember, name, ordinal);
        return <T & EnumMember>enumMember;
    }


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
    export function initEnumClass<E extends object, T extends object, R>(enumClass: E, enumMemberClass: { prototype: T }, enumMembersCreator: (memberCreator: (member: T) => T & EnumMember) => R, names?: string[],
            getName?: (name: string, enumConst: T) => string, memberVisitor?: (member: T & EnumMember) => void | (T & EnumMember)): R & E & EnumClass<T & EnumMember> {
        // extend the enum member type
        Objects.extend(enumMemberClass, EnumMemberImpl, false, true);

        var membersAry: (T & EnumMemberImpl)[] = [];
        var enumMembers = enumMembersCreator(asMember);

        // setup the enum members
        names = names || Object.keys(enumMembers);
        for (var i = 0, size = names.length; i < size; i++) {
            var key = names[i];
            var enumMember: T = enumMembers[key];
            var resName = getName ? getName(key, enumMember) : key;
            var ordinal = i;
            var newMember = initEnumMember(enumMember, resName, ordinal);
            if (memberVisitor != null) {
                var res = memberVisitor(newMember);
                if (res != null) {
                    newMember = <T & EnumMember>res;
                }
            }
            enumClass[resName] = newMember;
            membersAry.push(newMember);
        }

        membersAry.sort((a, b) => a.ordinal - b.ordinal);
        // extend the enum class
        EnumClass.call(enumClass, enumClass, enumMemberClass, membersAry);
        Objects.extendToStatic(enumClass, EnumClass, false);

        return <R & E & EnumClass<T & EnumMember>><any>enumClass;
    }

}

export = EnumCreatorImpl;

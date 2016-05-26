import Objects = require("./Objects");

/** A class for creating Java/C# like enums from objects.
 * Can create enum classes with EnumCreator.initEnumClass(EnumClass, EnumClass, enumInstancesConstructorFunc)
 * And create enum instances by calling EnumCreator.EnumConstantImpl.call(this, nameString) in the enum instance constructor
 */
module EnumCreator {

    export interface EnumType<T> {

        isInstance(obj: any): boolean;

        values(): T[];

        tryParse(name: string): T;

        parse(name: string): T;
    }


    export interface EnumMember {

        name: string;

        ordinal: number;

        toString(): string;
    }


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


    export class EnumConstantImpl implements EnumMember {
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
        EnumConstantImpl.call(enumMember, name, ordinal);
        return <T & EnumMember>enumMember;
    }


    export function initEnumClass<E, T, R>(enumClass: E, enumMemberClass: { prototype: T }, enumMembersCreator: (memberCreator: (member: T) => T & EnumMember) => R, names?: string[],
            getName?: (name: string, enumConst: T) => string): R & EnumClass<T & EnumMember> {
        // extend the enum member type
        Objects.extend(enumMemberClass, EnumConstantImpl, false, true);

        var membersAry: (T & EnumConstantImpl)[] = [];
        var enumMembers = enumMembersCreator(asMember);

        // setup the enum members
        names = names || Object.keys(enumMembers);
        for (var i = 0, size = names.length; i < size; i++) {
            var key = names[i];
            var enumMember: T = enumMembers[key];
            var resName = getName ? getName(key, enumMember) : key;
            var ordinal = i;
            var newMember = initEnumMember(enumMember, resName, ordinal);
            enumClass[resName] = newMember;
            membersAry.push(newMember);
        }

        membersAry.sort((a, b) => a.ordinal - b.ordinal);
        // extend the enum class
        EnumClass.call(enumClass, enumClass, enumMemberClass, membersAry);
        Objects.extendToStatic(enumClass, EnumClass, false);

        return <R & EnumClass<T & EnumMember>><any>enumClass;
    }

}

export = EnumCreator;

import Objects = require("./Objects");

module EnumCreator {

    export interface EnumType<T> {

        isInstance(obj: any): boolean;

        values(): T[];

        parse(name: string, throwErrorIfNotEnum?: boolean): T;
    }


    export interface EnumConstant {

        name(): string;

        toString(): string;
    }


    export class EnumClassImpl<T> implements EnumType<T> {
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


        public parse(name: string, throwErrorIfNotEnum?: boolean): T {
            var enumVal: T = null;
            if (this.enumClass.hasOwnProperty(name)) {
                enumVal = this.enumClass[name];
            }
            if (enumVal === null && throwErrorIfNotEnum) {
                throw new Error("enum constant '" + name + "' is not a member of enum '" + this.enumClass + "'");
            }
            return enumVal;
        }

    }


    export class EnumConstantImpl implements EnumConstant {
        private _name: string;


        constructor(name: string) {
            this._name = name;
        }


        public name() {
            return this._name;
        }


        public toString() {
            return this._name;
        }

    }


    export function initEnumConst(enumConst: any, name: string) {
        EnumConstantImpl.call(enumConst, name);
    }


    export function initEnumClass<T>(enumClass: EnumType<T>, enumConstantClass: { prototype: T }, enumConstantsGetter: () => T[]) {
        Objects.extend(enumClass, EnumConstantImpl, false, true);
        var enumConstants = enumConstantsGetter();
        EnumClassImpl.call(enumClass, enumClass, enumConstantClass, enumConstants);
        Objects.extendToStatic(enumClass, EnumClassImpl, false);
    }

}

export = EnumCreator;

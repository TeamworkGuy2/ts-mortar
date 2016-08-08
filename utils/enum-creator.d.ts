declare module EnumCreator {

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

}
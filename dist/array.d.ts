import { Validator, Schema } from "./base";
declare type ArraySchema<T> = {
    validator: Validator<Array<T>>;
    min: (n: number) => ArraySchema<T>;
    max: (n: number) => ArraySchema<T>;
    len: (n: number) => ArraySchema<T>;
    forAll: (f: (i: T, index: number, array: Array<T>) => boolean) => ArraySchema<T>;
    map: (f: (i: T, index: number, array: Array<T>) => T) => ArraySchema<T>;
    filter: (f: <U>(i: T, index: number, array: Array<T>) => boolean) => ArraySchema<T>;
};
export declare const array: <T>(items?: Schema<T>) => ArraySchema<T>;
export {};
//# sourceMappingURL=array.d.ts.map
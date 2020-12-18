import { Validator, Schema } from "./base";
export declare const array: <T>(items?: Schema<T>) => {
    validator: Validator<T[]>;
    min: (n: number) => any;
    max: (n: number) => any;
    len: (n: number) => any;
    forAll: (f: (i: T, index: number, array: T[]) => boolean) => any;
    map: (f: (i: T, index: number, array: T[]) => T) => any;
    filter: (f: <U>(i: T, index: number, array: T[]) => boolean) => any;
};
//# sourceMappingURL=array.d.ts.map
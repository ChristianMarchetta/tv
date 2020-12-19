declare const simpleTypeFilter: (s: string) => (v: any) => boolean;
declare type Filter<T> = (v: T) => boolean;
declare type Map<T> = (v: T) => T;
declare type FilterObj<T> = {
    f: Filter<T>;
    m: undefined;
    label: string;
};
declare type MapObj<T> = {
    m: Map<T>;
    f: undefined;
    label: string;
};
declare type Validator<T> = (FilterObj<T> | MapObj<T>)[][];
declare type Schema<T> = {
    validator: Validator<T>;
};
declare type SuperSchema = {
    [x: string]: Schema<number | boolean | string | Array<unknown> | SuperSchema>;
};
declare const filter: <T>(func: Filter<T>, label?: string) => FilterObj<T>;
declare const map: <T>(map: Map<T>, label?: string) => MapObj<T>;
declare const equals: <T>(c: T) => FilterObj<unknown>;
declare const validate: <T>(x: any, schema: Schema<T>) => T;
declare const push: <T>(v: Validator<T>, ...ops: (FilterObj<T> | MapObj<T>)[]) => Validator<T>;
declare type toType<T> = T extends Schema<number> ? number : T extends Schema<string> ? string : T extends Schema<boolean> ? boolean : T extends Schema<Array<infer O>> ? Array<toType<Schema<O>>> : T extends Schema<infer O> ? {
    [K in keyof O]: toType<O[K]>;
} : any;
export { validate, simpleTypeFilter, FilterObj, MapObj, Validator, Filter, Map, filter, map, equals, push, Schema, toType, SuperSchema };
//# sourceMappingURL=base.d.ts.map
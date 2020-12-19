import { Validator, SuperSchema } from "./base";
declare type ObjectSchema<T> = {
    validator: Validator<T>;
    anyOf: (...keys: string[]) => ObjectSchema<T>;
    oneOf: (...keys: string[]) => ObjectSchema<T>;
    required: (...keys: string[]) => ObjectSchema<T>;
    needs: (k: string, ...ks: Array<string>) => ObjectSchema<T>;
};
export declare const object: <T extends SuperSchema>(args: T, deleteAdditional?: boolean) => ObjectSchema<T>;
export {};
//# sourceMappingURL=object.d.ts.map
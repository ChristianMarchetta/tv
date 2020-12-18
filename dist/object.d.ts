import { Validator, SuperSchema } from "./base";
export declare const object: <T extends SuperSchema>(args: T, deleteAdditional?: boolean) => {
    validator: Validator<T>;
    anyOf: (...keys: string[]) => any;
    oneOf: (...keys: string[]) => any;
    required: (...keys: string[]) => any;
    needs: (k: string, ...ks: Array<string>) => any;
};
//# sourceMappingURL=object.d.ts.map
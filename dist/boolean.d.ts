import { Validator } from "./base";
declare type BooleanSchema = {
    validator: Validator<boolean>;
    true: () => BooleanSchema;
    false: () => BooleanSchema;
    not: () => BooleanSchema;
};
export declare const boolean: () => BooleanSchema;
export {};
//# sourceMappingURL=boolean.d.ts.map
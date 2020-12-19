import { Validator } from "./base";
export declare const boolean: () => BooleanValidator;
declare type BooleanValidator = {
    validator: Validator<boolean>;
    true: () => BooleanValidator;
    false: () => BooleanValidator;
    not: () => BooleanValidator;
};
export {};
//# sourceMappingURL=boolean.d.ts.map
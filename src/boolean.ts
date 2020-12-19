import {simpleTypeFilter, Validator, filter, map, push, Schema, FilterObj, MapObj, equals} from "./base"


type BooleanSchema = {
    validator: Validator<boolean>,

    true: () => BooleanSchema

    false: () => BooleanSchema

    not : () => BooleanSchema
}

export const boolean = ():BooleanSchema => {
    const validator = [[filter(simpleTypeFilter("boolean"), "boolean")]] as Validator<boolean>


    const composeOn = <T>(output:T, o:FilterObj<boolean>|MapObj<boolean>):T => {
        push(validator, o)
        return output
    }


    const m = {
        validator: validator,

        //Filters  

        true: () => composeOn(m, equals(true)),

        false: () => composeOn(m, equals(false)),

        //Mappings

        not : () => composeOn(m, map((v:boolean) => !v))
    }

    return m
}


import {simpleTypeFilter, Validator, filter, map, push, Schema, FilterObj, MapObj, equals} from "./base"


const isInt = (v:number) => {
    return !isNaN(v) && v === Math.floor(v);
}

export const boolean = () => {
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
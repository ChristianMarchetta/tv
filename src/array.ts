import {simpleTypeFilter, Validator, filter, map, push, FilterObj, MapObj, Schema, SuperSchema, validate} from "./base"

type ArraySchema<T> = {
    validator: Validator<Array<T>>

    //Filters
    min : (n:number) => ArraySchema<T>
    max : (n:number) => ArraySchema<T>
    len : (n:number) => ArraySchema<T>
    forAll: (f:(i:T, index:number, array:Array<T>)=>boolean) => ArraySchema<T>

    //Mappings
    map: (f:(i:T, index:number, array:Array<T>)=>T) => ArraySchema<T>
    filter: (f:<U>(i:T, index:number, array:Array<T>)=>boolean) => ArraySchema<T>
}

export const array = <T>(items:Schema<T>=undefined):ArraySchema<T> => {

    
    const first = [
        filter(simpleTypeFilter("object"), "object"),
        filter((o:object) => o !== null, "not null"),
        filter((o:object) => Array.isArray(o), "is Array")
    ] as (FilterObj<Array<T>> | MapObj<Array<T>>)[]

    const then = []



    if(items != undefined){
        then.push(map((v:Array<T>) => {
            for(let i = 0; i < v.length; i++){
                v[i] = validate(v[i], items) as T
            }
            return v
        }))
    }



    const validator =  [then, first]  as Validator<Array<T>>//validators are validated from the back


    const composeOn = <O>(output:O, o:FilterObj<Array<T>> | MapObj<Array<T>>):O => {
        push(validator, o)
        return output
    }

    const m = {
        validator: validator,

        //Filters

        min : (n:number) => composeOn(m, filter((v:Array<T>) => v.length >= n, "Arr-min")),

        max : (n:number) => composeOn(m, filter((v:Array<T>) => v.length <= n, "Arr-max")),

        len : (n:number) => composeOn(m, filter((v:Array<T>) => v.length == n)),

        forAll: (f:(i:T, index:number, array:Array<T>)=>boolean) => composeOn(m, filter((v:Array<T>) => {
            
            for(let i = 0; i< v.length; i++){
                if(!f(v[i], i, v))
                    return false
            }
            return true;

        }, "For All")),

        map: (f:(i:T, index:number, array:Array<T>)=>T) => composeOn(m, map((v:Array<T>) => {
            return v.map(f)
        })),

        filter: (f:<U>(i:T, index:number, array:Array<T>)=>boolean) => composeOn(m, map((v:Array<T>) => {
            return v.filter(f)
        }))

    }

    return m
}
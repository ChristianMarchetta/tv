import {simpleTypeFilter, Validator, filter, Filter, map, validate, FilterObj, MapObj, push, Schema, SuperSchema, toType} from "./base"
import { number } from "./number"


const fastAnd = <T>(arr:Array<T>, f:Filter<T>) =>{
    for(const i of arr){
        if(!f(i))
            return false
    }
    return true
}

const fastOr = <T>(arr:Array<T>, f:Filter<T>) =>{
    for(const i of arr){
        if(f(i))
            return true
    }
    return false
}

const fastXor = <T>(arr:Array<T>, f:Filter<T>) =>{
    let found = false
    for(const i of arr){
        const b = f(i)
        if(found && b)
            return false
        
        else if(!found && b)
            found = true
    }
    return found
}


const addValidators = (validators:SuperSchema) => map((o:object) => {
    for(const i in validators){
        if(o[i] !== undefined)
            o[i] = validate(o[i], validators[i])
    }
    return o
})

const deleteAdditionalPropsAndValidate = (validators:SuperSchema) => map((o:object) => {
    for(const i in o){
        if(validators[i] === undefined){
            delete o[i]
        }else{
            o[i] = validate(o[i], validators[i])
        }
    }
    return o
})




export const object = <T extends SuperSchema>(args:T, deleteAdditional:boolean=false) => {

    // input is declared of type T because by doing so, and assigning it to m.subvalidators below, the toType function works properly.
    //however, we still need the any type to do the validations correctly


    const first = [
        filter(simpleTypeFilter("object"), "object"),
        filter((o:object) => o !== null, "not null"),
        filter((o:object) => !Array.isArray(o), "not Array")
    ] as (FilterObj<T> | MapObj<T>)[]

    const then = []

    if(deleteAdditional){
        then.push(deleteAdditionalPropsAndValidate(args))
    }else{
        then.push(addValidators(args))
    }    

    const validator =  [then, first]  as Validator<T>//validators are validated from the back


    const composeOn = <T>(output:T, o:FilterObj<object>|MapObj<object>):T => {
        push(validator, o)
        return output
    }


    

    const m = {
        validator: validator,

        //subValidators: args,
    
        anyOf : (...keys:string[]) => composeOn(m, filter((o:object) => fastOr(keys, k => o[k] !== undefined))),

        oneOf : (...keys:string[]) => composeOn(m, filter((o:object) => fastXor(keys, k => o[k] !== undefined))),

        required : (...keys:string[]) => composeOn(m, filter((o:object) => fastAnd(keys, k => o[k] !== undefined), "and")),

        //if k is defined, then all the other keys must be defined
        needs : (k:string, ...ks:Array<string>) => composeOn(m, filter((o:object) => o[k] === undefined ? true : fastAnd(ks, k => o[k] !== undefined)))
    }

    return m
}
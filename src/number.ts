import {simpleTypeFilter, Validator, filter, map, push, Schema, FilterObj, MapObj} from "./base"


type NumberSchema = {
    validator: Validator<number>

    //Filters  

    min: (n:number) => NumberSchema
    max: (n:number) => NumberSchema
    integer : () => NumberSchema
    float : () => NumberSchema
    positive : () => NumberSchema
    natural : () => NumberSchema
    negative : () => NumberSchema
    negative0 : () => NumberSchema

    //Mappings

    add : (n:number) => NumberSchema
    sub : (n:number) => NumberSchema
    times : (n:number) => NumberSchema
    divideby : (n:number) => NumberSchema
    divides : (n:number) => NumberSchema
    mod : (n:number) => NumberSchema
    //reverse of mod
    dom : (n:number) => NumberSchema
    atan2 : (x:number) => NumberSchema
    nata2 : (y:number) => NumberSchema
    hypot : (...ns:number[]) => NumberSchema
    imul : (n:number) => NumberSchema
    upperBound : (n:number) => NumberSchema
    lowerBound : (n:number) => NumberSchema
    pow : (exp:number) => NumberSchema
    //the reverse of pow
    wop : (base:number) => NumberSchema
    abs : () => NumberSchema
    acos : () => NumberSchema
    acosh : () => NumberSchema
    asin : () => NumberSchema
    asinh : () => NumberSchema
    atan : () => NumberSchema
    atanh : () => NumberSchema
    cbrt : () => NumberSchema
    ceil : () => NumberSchema
    clz32 : () => NumberSchema
    cos : () => NumberSchema
    cosh : () => NumberSchema
    exp : () => NumberSchema
    expm1 : () => NumberSchema
    floor : () => NumberSchema
    fround : () => NumberSchema
    log : () => NumberSchema
    log1p : () => NumberSchema
    log10 : () => NumberSchema
    log2 : () => NumberSchema
    round : () => NumberSchema
    sign : () => NumberSchema
    sin : () => NumberSchema
    sinh : () => NumberSchema
    sqrt : () => NumberSchema
    tan : () => NumberSchema
    tanh : () => NumberSchema
    trunc : () => NumberSchema
}



const isInt = (v:number) => {
    return !isNaN(v) && v === Math.floor(v);
}

export const number = ():NumberSchema => {
    const validator = [[filter(simpleTypeFilter("number"), "number")]] as Validator<number>


    const composeOn = <T>(output:T, o:FilterObj<number>|MapObj<number>):T => {
        push(validator, o)
        return output
    }


    const m = {
        validator: validator,

        //Filters  

        min: (n:number) => composeOn(m, filter((v:number) => v >= n, "Min")),

        max: (n:number) => composeOn(m, filter((v:number) => v <= n, "Max")),

        integer : () => composeOn(m, filter(isInt)),

        float : () => composeOn(m, filter((v:number) => ! isInt(v))),

        positive : () => composeOn(m, filter(v => v > 0)),

        natural : () => composeOn(m, filter(v => v >= 0)),

        negative : () => composeOn(m, filter(v => v < 0)),

        negative0 : () => composeOn(m, filter(v => v <= 0)),


        //Mappings

        add : (n:number) => composeOn(m, map((v:number) => v + n)),

        sub : (n:number) => composeOn(m, map((v:number) => v - n)),

        times : (n:number) => composeOn(m, map((v:number) => v * n)),

        divideby : (n:number) => composeOn(m, map((v:number) => v / n)),

        divides : (n:number) => composeOn(m, map((v:number) => n / v)),

        mod : (n:number) => composeOn(m, map((v:number) => v % n)),

        //reverse of mod
        dom : (n:number) => composeOn(m, map((v:number) => n % v)),

        atan2 : (x:number) => composeOn(m, map((y:number) => Math.atan2(y, x))),

        nata2 : (y:number) => composeOn(m, map((x:number) => Math.atan2(y, x))),

        hypot : (...ns:number[]) => composeOn(m, map((v:number) => Math.hypot(v, ...ns))),

        imul : (n:number) => composeOn(m, map((v:number) => Math.imul(v, n))),

        upperBound : (n:number) => composeOn(m, map((v:number) => v > n ? n : v)),

        lowerBound : (n:number) => composeOn(m, map((v:number) => v < n ? n : v)),

        pow : (exp:number) => composeOn(m, map((base:number) =>  Math.pow(base, exp))),

        //the reverse of pow
        wop : (base:number) => composeOn(m, map((exp:number) => Math.pow(base, exp))),

        abs : () => composeOn(m, map(Math.abs)),

        acos : () => composeOn(m, map(Math.acos)),

        acosh : () => composeOn(m, map(Math.acosh)),

        asin : () => composeOn(m, map(Math.asin)),

        asinh : () => composeOn(m, map(Math.asinh)),

        atan : () => composeOn(m, map(Math.atan)),

        atanh : () => composeOn(m, map(Math.atanh)),

        cbrt : () => composeOn(m, map(Math.cbrt)),

        ceil : () => composeOn(m, map(Math.ceil)),

        clz32 : () => composeOn(m, map(Math.clz32)),

        cos : () => composeOn(m, map(Math.cos)),

        cosh : () => composeOn(m, map(Math.cosh)),

        exp : () => composeOn(m, map(Math.exp)),

        expm1 : () => composeOn(m, map(Math.expm1)),

        floor : () => composeOn(m, map(Math.floor)),

        fround : () => composeOn(m, map(Math.fround)),

        log : () => composeOn(m, map(Math.log)),

        log1p : () => composeOn(m, map(Math.log1p)),

        log10 : () => composeOn(m, map(Math.log10)),

        log2 : () => composeOn(m, map(Math.log2)),

        round : () => composeOn(m, map(Math.round)),

        sign : () => composeOn(m, map(Math.sign)),

        sin : () => composeOn(m, map(Math.sin)),

        sinh : () => composeOn(m, map(Math.sinh)),

        sqrt : () => composeOn(m, map(Math.sqrt)),

        tan : () => composeOn(m, map(Math.tan)),

        tanh : () => composeOn(m, map(Math.tanh)),

        trunc : () => composeOn(m, map(Math.trunc))

    }

    return m
}
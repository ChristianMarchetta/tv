import {simpleTypeFilter, Validator, filter, map, push, FilterObj, MapObj, Schema} from "./base"



export const string = () => {

    const validator = [[filter(simpleTypeFilter("string"), "string")]] as Validator<string>


    const composeOn = <T>(output:T, o:FilterObj<string>|MapObj<string>):T => {
        push(validator, o)
        return output
    }


    const m = {
        validator: validator,


        //Filters

        min : (n:number) => composeOn(m, filter((v:string) => v.length >= n, "s-min")),

        max : (n:number) => composeOn(m, filter((v:string) => v.length <= n, "s-max")),

        len : (n:number) => composeOn(m, filter((v:string) => v.length == n)),

        includes : (searchString:string, position:number=0) => composeOn(m, filter((v:string) => v.includes(searchString, position))),

        startWith : (searchString:string, length:number=undefined) => composeOn(m, filter((v:string) => v.startsWith(searchString, length))),

        endsWith : (searchString:string, length:number=undefined) => composeOn(m, filter((v:string) => v.endsWith(searchString, length))),

        test : (re:RegExp) => composeOn(m, filter((v:string) => re.test(v))),

        //https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
        email : () => m.test(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/),

        uuid_v4 : () => m.test(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i),


        //Mappings

        concat : (...strs:string[]) => composeOn(m, map((v:string) => v.concat(...strs))),

        prepend : (...strs:string[]) => composeOn(m, map((v:string) => String.prototype.concat(...strs, v))),

        postpend : () => m.concat,

        substring : (indexStart:number, indexEnd:number=undefined) => composeOn(m, map((v:string) => v.substr(indexStart, indexEnd ))),

        padEnd : (targetLength:number, padString:string="\U+0020") => composeOn(m, map((v:string) => v.padEnd(targetLength, padString))),

        padStart : (targetLength:number, padString:string="\U+0020") => composeOn(m, map((v:string) => v.padStart(targetLength, padString))),

        repeat : (n:number) => composeOn(m, map((v:string) => v.repeat(n))),

        replace : (searchFor:string|RegExp, replaceWith:string) => composeOn(m, map((v:string) => v.replace(searchFor, replaceWith))),

        slice : (beginIndex:number, endIndex:number=undefined) => composeOn(m, map((v:string) => v.slice(beginIndex, endIndex))),

        toLocaleLowerCase : (locale:string|string[]=undefined) => composeOn(m, map((v:string) => v.toLocaleLowerCase(locale))),

        toLocaleUpperCase : (locale:string|string[]=undefined) => composeOn(m, map((v:string) => v.toLocaleUpperCase(locale))),

        toLowerCase : () => composeOn(m, map((v:string) => v.toLowerCase())),

        toUpperCase : () => composeOn(m, map((v:string) => v.toUpperCase())),

        trim : () => composeOn(m, map((v:string) => v.trim())),

        trimStart : () => composeOn(m, map((v:string) => v.trimStart())),

        trimEnd : () =>  composeOn(m, map((v:string) => v.trimEnd())),

        trimLeft : () =>  composeOn(m, map((v:string) => v.trimLeft())),

        trimRight : () =>  composeOn(m, map((v:string) => v.trimRight())),

    }

    return m
}
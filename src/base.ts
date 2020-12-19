const simpleTypeFilter = (s:string)=> ((v:any) => {const t = typeof v; return t === s})

type Filter<T> = (v:T) => boolean

type Map<T> = (v:T) => T

type FilterObj<T> = {f:Filter<T>, m:undefined, label:string}

type MapObj<T> = {m:Map<T>, f:undefined, label:string}

type Validator<T> = (FilterObj<T> | MapObj<T>)[][]

type Schema<T> = {
    validator: Validator<T>
}

// type ObjectSchema = Schema<object> & {
//     subValidators: SuperSchema
// }

type SuperSchema = {[x:string] : Schema<number | boolean | string | Array<unknown> | SuperSchema>}

const filter = <T>(func:Filter<T>, label:string=""):FilterObj<T> => ({f:func, m:undefined, label:label})

const map = <T>(map:Map<T>, label:string=""):MapObj<T> => ({m:map, f:undefined, label:label})

const equals = <T>(c:T) => filter(v => v === c, "equals")


const validate = <T>(x, schema:Schema<T>):toType<Schema<T>> => {
    let r = x;

    const vs = schema.validator

    //console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

    for(let j = vs.length -1; j >= 0; j--){
        const v = vs[j]

        for(let i = 0; i < v.length; i++){
            if(v[i].f){
                //console.log("Input:", r, "Label:", v[i].label )
                if(!v[i].f(r))
                    throw new Error(`Validator ${i} failed - ${v[i].label}`)
            }else if(v[i].m){
                const prev = r
                r = v[i].m(r)
                //console.log("Input:", prev, "Mapping", r)
            }
        }
    }
    //console.log("Validation Result:", r)
    //console.log("||||||||||||||||||||||||||||||||")
    
    return r
}


const push = <T>(v:Validator<T>, ...ops:(FilterObj<T> | MapObj<T>)[]) => {
    v[v.length - 1].push(...ops)
    return v
}


type toType<T> = 

      T extends Schema<number> ? number 
    : T extends Schema<string> ? string 
    : T extends Schema<boolean> ? boolean
    
    //: T extends Schema<Array<infer O>> ? Array<{[K in keyof O] : toType<O[K]>}>

    : T extends Schema<Array<infer O>> ? Array<toType<Schema<O>>>

    : T extends Schema<infer O> ? {[K in keyof O] : toType<O[K]>}

    : any;


export {validate, simpleTypeFilter, FilterObj, MapObj, Validator, Filter, Map, filter, map, equals, push, Schema, toType, SuperSchema}
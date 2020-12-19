# Another Typescript Validator
This package let's you easily create schemas to validate JSON data and automatically convert schemas into types, so that you can avoid repetition and the problems that derive from it, and consequently ship faster.

## Installation
Simply install the package by running

    npm i another-typescript-validator

## Usage and main features

### Create complex schemas in minutes

    import {object, array, number, string, boolean, toType, validate} from  'another-typescript-validator'
    
    const  ItemSchema  =  object({
	    id: string().uuid_v4().toUpperCase(),
	    
	    name: string().trim().min(3).max(100),
	    
	    description: string().trim().max(1000),
	    
	    visible: boolean(),
	    
	    stock: number().integer().natural().max(10000),
	    
	    price: number().integer().positive().max(10000)
	    
    }).required('id', 'price')


### Convert schemas to types in one line

    type  Item  =  toType<typeof  ItemSchema>
	
	/* This is equivalent to:
	 * 
     * type  Item  = {  
	 *    id:  string;  
	 *    name:  string;  
	 *    description:  string;  
	 *    visible:  boolean;  
	 *    stock:  number;  
	 *    price:  number;  
     * }
     */
\*note optional types are not yet supported

### Validate raw JSON faster than light

    const  data  = {
        id: "f18ef195-7956-4f74-b02c-e1c23226d25d",    
	    name: "Super awesome 4k TV",
	    description: " I could use a trim ",
	    visible: true,
	    stock: 10,
	    price: 1000,
	    unwantedProperty: "nobody likes me"
    }
    
    const  television  =  validate(data, ItemSchema)
    
    console.log(television)
    
    /* Output:
    *  object {
	*	  id: 'F18EF195-7956-4F74-B02C-E1C23226D25D',
	*	  name: 'Super awesome 4k TV',
	*	  description: 'I could use a trim',
	*	  visible: true,
	*	  stock: 10,
	*	  price: 1000
	*	}
    */
  
This module takes an *efficiency before complexity* approach. Fast but complex algorithms are more welcomed than easy to understand but slower ones. Though still making the outside user experience super simple. In other words, *complex on the inside but easy from the outside*. 
This is often considered bad practice, but I don't care and I am cheap. I don't wanna pay any extra pennies for my serverless functions due to laziness.

### Nest objects and arrays as much as you want, it just works.

    const  CatalogSchema  =  object({
	    categories: array(object({
		    name: string().min(3).max(100),
		    items: array(ItemSchema).min(10)
	    })).min(1)
    })
    
    type  Catalog  =  toType<typeof  CatalogSchema>
    
    /* Equivalent to:
    * 
    * type  Catalog  = {  
	*    categories: {  
	* 	    name:  string;  
	* 	    items: {  
	* 		    id:  string;  
	* 		    name:  string;  
	* 		    description:  string;  
	* 		    visible:  boolean;  
	* 		    stock:  number;  
	* 		    price:  number;  
	* 	    }[];  
	*    }[];  
    * }
    */
    	

   
### Perform complex maps directly from the schema
  

    number().add(10).mod(2).sin().times(100)
    
    string().repeat(3).trim().slice(2, 3).toUpperCase()

**The majority of the Math and String class methods are already supported.** 
However, for now it is only possible to map between the same type, i.e. numbers can only be mapped to other numbers, strings can only be mapped to other strings and so on.


## Contributing
If you like this package, **please consider contributing**. This module is still in its early stages.

The **top priorities** are:

 - **Proper documentation for all functions**
 - **Proper testing**
 - **Support for optional properties**

Addition of new features is also appreciated. For example things I'd like to see implemented are:

 - efficient support for multiple types in arrays, i.e. `array(number(), string())` would validate an array of type `Array<number | string>`
 - Possibility to map between different types e.g. a string to an array of strings.
 - More support for custom filters and mappings, i.e. letting the end user easily specify custom filters and mappings.

When contributing, keep in mind our *efficiency before complexity* approach.

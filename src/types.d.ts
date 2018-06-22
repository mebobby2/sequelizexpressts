import { DataTypeAbstract, DefineAttributeColumnOptions } from "sequelize";

declare global {
  type SequelizeAttributes<T extends { [key: string]: any }> = {
    [P in keyof T]: string | DataTypeAbstract | DefineAttributeColumnOptions;
  };
}


// T extends
// is creating a generic that has a constraint

// { [key: string]: any }
// is a type of object with strings as keys and any as values

// T extends { [key: string]: any }
// is an generic that has a constraint that its properties must be strings and values can be any type

// keyof
// is a lookup type.
// e.g
//    interface Person {
//      name: string;
//      age: number;
//      location: string;
//    }
//    type K1 = keyof Person; // "name" | "age" | "location"
// another example
//    function getProperty<T, K extends keyof T>(obj: T, key: K) {
//      return obj[key];  // Inferred type is T[K]
//    }
//    let x = { foo: 10, bar: "hello!" };
//    let foo = getProperty(x, "foo"); // number

// in
// Both for..of and for..in statements iterate over lists; the values iterated on are different though,
//  for..in returns a list of keys on the object being iterated, whereas for..of returns a list of
// values of the numeric properties of the object being iterated.
// e.g.
// let list = [4, 5, 6];
// for (let i in list) {
//    console.log(i); // "0", "1", "2",
// }
// for (let i of list) {
//    console.log(i); // "4", "5", "6"
// }

// [P in keyof T]
// for every key of object T

// string | DataTypeAbstract | DefineAttributeColumnOptions
// is a union type. The variable can be either string, DataTypeAbstract, or DefineAttributeColumnOptions

// declare global
// declare keyword is used to declare variables that may not have originated from a TypeScript file.
// global originates from javascript language

# Sequelizexpressts

## Setup

1. yarn install
2. node_modules/.bin/sequelize db:create
3. node_modules/.bin/sequelize db:migrate
4. node_modules/.bin/sequelize db:seed:all

#### Postgres
Download and install postgresapp. It automatically creates a user for you that matches your system username.

## Develop

```yarn start``` in the background

## Usage
### Register
```
POST /register
{"email": "hello@me.com", "password": "sdsdfsdfsdfsdf", "confirmPassword": "sdsdfsdfsdfsdf"}
```

### Login
```
POST /login
{"email": "hell2o@me.com", "password": "sdsdfsdfsdfsdf"}
```

### Access Protected Resource
```
GET /some-protected-resource?token=<token-from-login-response>
```

## notes
### Namespaces
For most projects we recommend using external modules and using namespace for quick demos and porting old JavaScript code.
```
namespace Utility {
  export function log(msg) {
      console.log(msg);
  }
  export function error(msg) {
      console.error(msg);
  }
}

Utility.log('Call me');
```

### Declare Keyword
The TypeScript declare keyword is used to declare variables that may not have originated from a TypeScript file.

Not all JavaScript libraries/frameworks have TypeScript declaration files. On the other hand, we might want to use libraries/frameworks in our TypeScript files without getting compilation errors. What can we do?
One solution is to use the declare keyword. The declare keyword is used for ambient declarations where you want to define a variable that may not have originated from a TypeScript file.

For example, lets imagine that we have a library called myLibrary that doesn’t have a TypeScript declaration file and have a namespace called myLibrary in the global namespace. If you want to use that library in your TypeScript code, you can use the following code:

```
declare var myLibrary;
```

The type that the TypeScript runtime will give to myLibrary variable is the any type. The problem here is that you won’t have Intellisense for that variable in design time but you will be able to use the library in your code. Another option to have the same behavior without using the declare keyword is just using a variable with the any type:

```
var myLibrary: any;
```

Both of the code examples will result in the same JavaScript output but the declare example is more readable and expresses an ambient declaration.

### var vs let
var Variables in JavaScript are function scoped. This is different from many other languages (C# / Java etc.) where the variables are block scoped. If you bring a block scoped mindset to JavaScript, you would expect the following to print 123, instead it will print 456:

```
var foo = 123;
if (true) {
    var foo = 456;
}
console.log(foo); // 456
```

This is because { does not create a new variable scope. The variable foo is the same inside the if block as it is outside the if block. This is a common source of errors in JavaScript programming. This is why TypeScript (and ES6) introduces the let keyword to allow you to define variables with true block scope. That is if you use let instead of var you get a true unique element disconnected from what you might have defined outside the scope. The same example is demonstrated with let:

```
let foo = 123;
if (true) {
    let foo = 456;
}
console.log(foo); // 123
```

### Index types
With index types, you can get the compiler to check code that uses dynamic property names. For example, a common Javascript pattern is to pick a subset of properties from an object:

```
function pluck(o, names) {
    return names.map(n => o[n]);
}
```

Here’s how you would write and use this function in TypeScript, using the index type query and indexed access operators:

```
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

interface Person {
    name: string;
    age: number;
}
let person: Person = {
    name: 'Jarid',
    age: 35
};
let strings: string[] = pluck(person, ['name']); // ok, string[]
```

The compiler checks that name is actually a property on Person. The example introduces a couple of new type operators. First is keyof T, the **index type query operator**. For any type T, keyof T is the union of known, public property names of T. For example:

```
let personProps: keyof Person; // 'name' | 'age'
```

The second operator is T[K], the **indexed access operator**. Here, the type syntax reflects the expression syntax. That means that person['name'] has the type Person['name'] — which in our example is just string. However, just like index type queries, you can use T[K] in a generic context, which is where its real power comes to life. You just have to make sure that the type variable K extends keyof T. Here’s another example with a function named getProperty.

```
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]; // o[name] is of type T[K]
}
```

In getProperty, o: T and name: K, so that means o[name]: T[K]. Once you return the T[K] result, the compiler will instantiate the actual type of the key, so the return type of getProperty will vary according to which property you request.

```
let name: string = getProperty(person, 'name');
let age: number = getProperty(person, 'age');
let unknown = getProperty(person, 'unknown'); // error, 'unknown' is not in 'name' | 'age'
```

### Mapped types
A common task is to take an existing type and make each of its properties readonly:

```
interface PersonReadonly {
    readonly name: string;
    readonly age: number;
}
```

This happens often enough in Javascript that TypeScript provides a way to create new types based on old types — mapped types. In a mapped type, the new type transforms each property in the old type in the same way. For example, you can make all properties of a type readonly:

```
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

And to use it:

```
type ReadonlyPerson = Readonly<Person>;
```

The *in* keyword within the square brackets signals that we're dealing with a mapped type. [P in keyof T]: T[P] denotes that the type of each property P of type T should be transformed to T[P]. Without the readonly modifier, this would be an identity transformation.

### Function Interfaces
```
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}
```

An example from Redux library,

```
export interface ActionCreator<A> {
  (...args: any[]): A;
}
```
This means, the method signature for ActionCreator:
1. Takes a variable number of arguments (an array)
2. Each of the arguments are of the type *any*
3. The return type of the function is a generic.

So to use:
```
export interface IShowModalAction extends Action {
  type: "SHOW_MODAL";
  payload: {
    title: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  };
}

export const showModal: ActionCreator<IShowModalAction> = (title, primaryButtonText, secondaryButtonText) => ({
  type: SHOW_MODAL,
  payload: { title, primaryButtonText, secondaryButtonText },
});
```

So, showModal is an ActionCreator. It takes the arguments title, primaryButtonText, and secondaryButtonText. And it returns an object of type IShowModalAction.

## Sources
https://blog.gorrion.pl/node-express-js-typescript-sequelize/

https://michalzalecki.com/using-sequelize-with-typescript/

http://docs.sequelizejs.com/manual/tutorial/migrations.html

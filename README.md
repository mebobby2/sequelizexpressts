# Sequelizexpressts

## Setup

1. yarn install
2. node_modules/.bin/sequelize db:create
3. node_modules/.bin/sequelize db:migrate
4. node_modules/.bin/sequelize db:seed:all

#### Postgres
Download and install postgresapp. It automatically creates a user for you that matches your system username.

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

## Sources
https://blog.gorrion.pl/node-express-js-typescript-sequelize/

https://michalzalecki.com/using-sequelize-with-typescript/

http://docs.sequelizejs.com/manual/tutorial/migrations.html

console.log("Hello World");


// Const and let ( variables)
// variables
 let courseName : string = "Typescript";
 console.log(courseName);

 //Booleans
 let hasLiked : boolean = true;
 console.log(hasLiked);

 //Numbers
 let price : number = 100;
 console.log(price);

 let subs : number;
 subs = 2;
 console.log(subs);

 let numbsubs = 0;
 let numbert= 1000;
 console.log(numbert);

 // Enums
 enum Size {Small, Medium, Large};
 console.log(Size.Small);

 // Arrays
 let names : string[] = ["John", "Jane", "Jack"];
 console.log(names);

 // Tuples
 let person : [string, number] = ["John", 30];
 console.log(person);

 //Loop throught array
 for (let name of names) {
  console.log(name);
 }

 // a function to add two numbers

 function add(a: number, b: number): number {
  return a + b;
 }
 console.log(add(1, 2));

 function  greet( name: string): string {
  return "Hello " + name;
 }
 console.log(greet("John"));



//  A class with properties and methods

class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    greet(): string {
        return "Hello " + this.name;
    }

    getAge(): number {
        return this.age;
    }

    setAge(age: number): void {
        this.age = age;
    }
}

let person1 = new Person("John", 30);
console.log(person1.greet());
console.log(person1.getAge());
person1.setAge(31);
console.log(person1.getAge());


let numlikes = 100;
// numlikes = "a0101"; // This would cause a TypeScript error - can't assign string to number


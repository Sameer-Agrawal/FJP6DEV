class Person{
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    welcome(){
        console.log("Hello", this.name);
    }
}

class Student extends Person{
    constructor(name,age,cgpa){
        super(name,age);   // this is calling its parents constructor to inherit the properties
        this.cgpa = cgpa
    }
}

// let person = new Person("Sameer", 21);
// console.log(person);
let student = new Student("Jayraj", 22, 9.9);
console.log(student);

// person.welcome();
student.welcome();
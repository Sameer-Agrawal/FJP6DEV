// adding two numbers using arrow functions
// let add = (x,y) => {
//     return x+y;
// }

// console.log(add(2,4));
// let fun = ()=>{
//     console.log(this);
// }

// fun();

// // In arrow functions this depends on the scope of there parents
// let obj = {
//     name: "sameer"
// }

// function abc(){
//     let tester = () =>{
//         console.log(this);
//     }
//     tester();
// }

// abc();


// let arrayFunction = (a,b) => {
//     console.log(this);
// }

// arrayFunction(2,2);
// arrow function ka this uske outer scope pe depend karta hai
// jo bhi arrow function ke parent ka this hoga wo hi arrow function ka this hoga
let obj = {
    name: "Sameer",
    intro: function () {
        console.log(`Hi my name is ${this.name}`)
        let consoleSurname = () => {
            console.log(this);
        }
        consoleSurname();  // If the console Surname was a normal function then the value of this will be global object
        // But as we know the value of this in arrow function is the value of this in its parent 
        // In arrow function value of this is resolved lexically
    }
}

obj.intro();
// arrow function apna this lexically resolve karta haiiii

// let regularFunction = function(a,b){
//     console.log(this);
// }

// regularFunction(2,2);





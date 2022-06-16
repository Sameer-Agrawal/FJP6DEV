// function car(Name, Model, Color){
//     this.name = Name;
//     this.model = Model;
//     this.color = Color;

//     this.display = function(){
//         console.log("Hi I am driving ",this.model)
//     }
// }

// let car1 = new car("maruti", "suzuki", "red");
// console.log(car1)
// car1.display();


function car(Name, Model, Color){
    this.name = Name;   //here this is pointing towards an empty object
    this.model = Model;
    this.color = Color;
    this.test = function(){
        console.log(`Hi I am driving "${this.model}`);
    }
    // console.log(this);
}

let car1 = new car("maruti", "suzuki", "black") 
console.log(car1);

// This constructor function is used to make similar type of objects effectively


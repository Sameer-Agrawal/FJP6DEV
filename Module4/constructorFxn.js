function car(Name, Model, Color){
    this.name = Name;
    this.model = Model;
    this.color = Color;

    this.display = function(){
        console.log("Hi I am driving ",this.model)
    }
}

let car1 = new car("maruti", "suzuki", "red");
console.log(car1)
car1.display();
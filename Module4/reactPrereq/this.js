// this function is used for reference of an object
// this keyword value will depend on how it is called 

// console.log(this);
// In case of browser the above call will give windows object

// function abc(){   // In case of function invocation this will reference to global object
//     console.log(this);
// }

// abc();

let obj = {   
    name: "Sameer",
    ab: function(){
        function cd(){
            console.log(this);  // This will return global object as although the parent function is called through method invocation the function containing this is called through function invocation
        }
        cd();
    }
};

obj.ab();   // This is method invocation so this will point towards the object where the function is defined




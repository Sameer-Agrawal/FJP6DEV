let addBtn = document.querySelector(".add-btn");
let model = document.querySelector(".model-cont");
let addModel = true;

addBtn.addEventListener("click", function(e) {
    if(addModel){
        //Show the model
        model.style.display = "flex";
    }else{
        //Hide the model
        model.style.display = "none";
    }
    addModel = !addModel;
});
let addBtn = document.querySelector(".add-btn");
let modelCont = document.querySelector(".model-cont");
let textCont = document.querySelector(".textarea-cont");
let mainCont = document.querySelector(".main-cont");
let priorityColors = document.querySelectorAll(".priority-color");
let addModel = true;
let selectedColor = "black";

addBtn.addEventListener("click", function(e) {
    if(addModel){
        //Show the model
        modelCont.style.display = "flex";
    }else{
        //Hide the model
        modelCont.style.display = "none";
    }
    addModel = !addModel;
});

for(let i=0; i<priorityColors.length; i++){
    let priorityDivOneColor = priorityColors[i];
    priorityDivOneColor.addEventListener("click", function(e){
        // Firstly removing if the active class is already present!
        for(let j=0; j<priorityColors.length; j++){
            priorityColors[j].classList.remove("active");
        }
        priorityDivOneColor.classList.add("active");
        selectedColor = priorityDivOneColor.classList[0];
        // console.log(selectedColor);
    })
}

modelCont.addEventListener("keydown", function(e) {
    let key = e.key;
    // console.log(key);
    if(key=='Enter'){
        createTicket(textCont.value, selectedColor);
        textCont.value = "";
        modelCont.style.display = "none";
        addModel = !addModel;
    }
})

function createTicket(task, priorityColor){
    let ticketCont = document.createElement("div");
    ticketCont.setAttribute("class", "ticket-cont");
    ticketCont.innerHTML = `<div class="ticket-color ${priorityColor}"></div>
                            <div class="ticket-id">#qu123</div>
                            <div class="task-area">${task}</div>`
    mainCont.appendChild(ticketCont);
    // console.log(priorityColor)
}
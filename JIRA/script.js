let addBtn = document.querySelector(".add-btn");
let modelCont = document.querySelector(".model-cont");
let textCont = document.querySelector(".textarea-cont");
let mainCont = document.querySelector(".main-cont");
let addModel = true;

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

modelCont.addEventListener("keydown", function(e) {
    let key = e.key;
    // console.log(key);
    if(key=='Enter'){
        createTicket(textCont.value);
        textCont.value = "";
        modelCont.style.display = "none";
        addModel = !addModel;
    }
})

function createTicket(task){
    let ticketCont = document.createElement("div");
    ticketCont.setAttribute("class", "ticket-cont");
    ticketCont.innerHTML = `<div class="ticket-color"></div>
                            <div class="ticket-id">#qu123</div>
                            <div class="task-area">${task}</div>`
    mainCont.appendChild(ticketCont);
}
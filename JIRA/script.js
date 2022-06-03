let addBtn = document.querySelector(".add-btn");
let modelCont = document.querySelector(".model-cont");
let textCont = document.querySelector(".textarea-cont");
let mainCont = document.querySelector(".main-cont");
let priorityColors = document.querySelectorAll(".priority-color");
let colors = ["lightPink", "lightBlue", "lightGreen", "black"];
let removeBtn = document.querySelector(".remove-btn");
let removeFlag = false;
let addModel = true;
let selectedColor = colors[colors.length - 1];

addBtn.addEventListener("click", function (e) {
  if (addModel) {
    //Show the model
    modelCont.style.display = "flex";
  } else {
    //Hide the model
    modelCont.style.display = "none";
  }
  addModel = !addModel;
});

for (let i = 0; i < priorityColors.length; i++) {
  let priorityDivOneColor = priorityColors[i];
  priorityDivOneColor.addEventListener("click", function (e) {
    // Firstly removing if the active class is already present!
    for (let j = 0; j < priorityColors.length; j++) {
      priorityColors[j].classList.remove("active");
    }
    priorityDivOneColor.classList.add("active");
    selectedColor = priorityDivOneColor.classList[0];
    // console.log(selectedColor);
  });
}

modelCont.addEventListener("keydown", function (e) {
  let key = e.key;
  // console.log(key);
  if (key == "Enter") {
    createTicket(textCont.value, selectedColor);
    textCont.value = "";
    modelCont.style.display = "none";
    addModel = !addModel;
  }
});

removeBtn.addEventListener("click", function () {
  if (removeFlag) {
    removeBtn.style.color = "black";
  } else {
    removeBtn.style.color = "red";
  }
  removeFlag = !removeFlag;
});

function createTicket(task, priorityColor) {
  let ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");
  ticketCont.innerHTML = `<div class="ticket-color ${priorityColor}"></div>
                            <div class="ticket-id">#qu123</div>
                            <div class="task-area">${task}</div>`;
  mainCont.appendChild(ticketCont);
  // console.log(priorityColor)

  // Delete Functionality
  ticketCont.addEventListener("click", function () {
    if (removeFlag) {
      ticketCont.remove();
    }
  });

  // Adding Priority Color Change Functionality
  let priorityColorBand = ticketCont.querySelector(".ticket-color");
  priorityColorBand.addEventListener("click", function () {
    let currentlySelectedColor = priorityColorBand.classList[1];
    // Finding out the index of selected color
    let currentlySelectedColorIdx = -1;
    for (let i = 0; i < colors.length; i++) {
      if (currentlySelectedColor == colors[i]) {
        currentlySelectedColorIdx = i;
        break;
      }
    }
    let nextColorIdx = (currentlySelectedColorIdx + 1) % colors.length;
    let nextColor = colors[nextColorIdx];
    priorityColorBand.classList.remove(currentlySelectedColor);
    priorityColorBand.classList.add(nextColor);
  });
}

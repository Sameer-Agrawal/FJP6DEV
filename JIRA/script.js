let addBtn = document.querySelector(".add-btn");
let modelCont = document.querySelector(".model-cont");
let textCont = document.querySelector(".textarea-cont");
let mainCont = document.querySelector(".main-cont");
let priorityColors = document.querySelectorAll(".priority-color");
let colors = ["lightPink", "lightBlue", "lightGreen", "black"];
let removeBtn = document.querySelector(".remove-btn");
let removeFlag = false;
let addModel = true;
var uid = new ShortUniqueId();
let filters = document.querySelectorAll(".color");
//Creating an empty array in which we will add the tickets info!
let ticketArr = [];
let selectedColor = colors[colors.length - 1];

// Handling the filter functionality
for (let i = 0; i < filters.length; i++) {
  let choosenFilter = filters[i];
  choosenFilter.addEventListener("click", function () {
    // Lets create the filtered array
    let choosenColor = choosenFilter.classList[1];
    let filteredArr = [];
    for (let i = 0; i < ticketArr.length; i++) {
      if (ticketArr[i].ticketColor == choosenColor) {
        filteredArr.push(ticketArr[i]);
      }
    }
    // Removing all the tickets before filtration
    let allTickets = document.querySelectorAll(".ticket-cont");
    for (let i = 0; i < allTickets.length; i++) {
      allTickets[i].remove();
    }
    // Creating the tickets using filtered array
    for (let i = 0; i < filteredArr.length; i++) {
      createTicket(
        filteredArr[i].ticketContent,
        filteredArr[i].ticketColor,
        filteredArr[i].ticketId
      );
    }
  });

  choosenFilter.addEventListener("dblclick", function () {
    // Removing all the tickets before filtration
    let allTickets = document.querySelectorAll(".ticket-cont");
    for (let i = 0; i < allTickets.length; i++) {
      allTickets[i].remove();
    }

    for (let i = 0; i < ticketArr.length; i++) {
      createTicket(
        ticketArr[i].ticketContent,
        ticketArr[i].ticketColor,
        ticketArr[i].ticketId
      );
    }
  });
}

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

function createTicket(task, priorityColor, ticketID) {
  let Id;
  if (ticketID == undefined) {
    Id = uid();
  } else {
    Id = ticketID;
  }
  let ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");
  ticketCont.innerHTML = `<div class="ticket-color ${priorityColor}"></div>
                            <div class="ticket-id">#${Id}</div>
                            <div class="task-area">${task}</div>
                            <div class="lock-unlock"><i class="fa fa-lock"></i></div>`;
  mainCont.appendChild(ticketCont);
  // console.log(priorityColor)

  // Delete Functionality
  ticketCont.addEventListener("click", function () {
    if (removeFlag) {
      ticketCont.remove();
      let selectedIdx = getIdx(Id);
      ticketArr.splice(selectedIdx, 1);
    }
  });

  // Handling lock-unlock functionality
  let lockUnlockBtn = ticketCont.querySelector(".lock-unlock i");
  let taskAreaCont = ticketCont.querySelector(".task-area");
  lockUnlockBtn.addEventListener("click", function () {
    if (lockUnlockBtn.classList.contains("fa-lock")) {
      lockUnlockBtn.classList.remove("fa-lock");
      lockUnlockBtn.classList.add("fa-unlock");
      taskAreaCont.setAttribute("contenteditable", "true");
    } else {
      lockUnlockBtn.classList.remove("fa-unlock");
      lockUnlockBtn.classList.add("fa-lock");
      taskAreaCont.setAttribute("contenteditable", "false");
    }
    //Updating ticket array
    let selectedIdx = getIdx(Id);
    ticketArr[selectedIdx].ticketContent = taskAreaCont.textContent;
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

    //Updating ticket array
    let selectedIdx = getIdx(Id);
    ticketArr[selectedIdx].ticketColor = nextColor;
  });
  // Here we have successfully stored tickets in form of an object
  if (ticketID == undefined) {
    ticketArr.push({
      ticketColor: priorityColor,
      ticketContent: task,
      ticketId: Id,
    });
  }
  //   console.log(ticketArr);
}


function getIdx(Id){
    for (let i = 0; i < ticketArr.length; i++) {
        if (Id == ticketArr[i].ticketId) {
          return i;
        }
      }
}

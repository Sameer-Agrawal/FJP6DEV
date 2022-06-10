let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let topLeftCell = document.querySelector(".top-left-cell");
let allCells = document.querySelectorAll(".cell");
let addressInput = document.querySelector("#address");
let formulaInput = document.querySelector("#formula");
let lastSelectedCell;
let addSheetBtn = document.querySelector(".add-sheet");
let sheetList = document.querySelector(".sheets-list");
let allSheets;
let sheetId = 0;

// Working on sheet functionality
addSheetBtn.addEventListener("click", function(){
    sheetId++;
    let activeSheet = document.querySelector(".active-sheet");
    activeSheet.classList.remove("active-sheet");
    let newSheetDiv = document.createElement("div");
    newSheetDiv.classList.add("sheet");
    newSheetDiv.classList.add("active-sheet");
    newSheetDiv.setAttribute("sheetId",sheetId);
    newSheetDiv.innerText = `Sheet ${sheetId+1}`;
    sheetList.appendChild (newSheetDiv);
    // toggle functionality on sheet selection
    allSheets = document.querySelectorAll(".sheet")
    for(let i=0; i<allSheets.length; i++){
        allSheets[i].addEventListener("click", function(){
            let lastActiveSheet = document.querySelector(".active-sheet");
            lastActiveSheet.classList.remove("active-sheet");
            allSheets[i].classList.add("active-sheet");
        })
    }
})

cellsContentDiv.addEventListener("scroll",function(e){
    let scrollFromTop = e.target.scrollTop;
    let scrollFromLeft = e.target.scrollLeft;
    topRow.style.top = scrollFromTop+"px";
    leftCol.style.left = scrollFromLeft+"px";
    topLeftCell.style.top = scrollFromTop+"px";
    topLeftCell.style.left = scrollFromLeft+"px";
})

for(let i=0;i<allCells.length;i++){
    allCells[i].addEventListener("click",function(e){
        let rowId = Number(e.target.getAttribute("rowid"));
        let colId = Number(e.target.getAttribute("colid"));
        let address = String.fromCharCode(65+colId)+(rowId+1)+"";
        // console.log(address);
        let cellObject = db[rowId][colId];
        addressInput.value = address;
        //update UI
        formulaInput.value = cellObject.formula;
    })

    allCells[i].addEventListener("blur",function(e){
        lastSelectedCell = e.target;
        let cellValue = e.target.textContent;
        let rowId = Number(e.target.getAttribute("rowid"));
        let colId = Number(e.target.getAttribute("colid"));
        let cellObject = db[rowId][colId];
        if(cellObject.value == cellValue){
            return;
        }
        cellObject.value = cellValue;
        console.log("After UPdate",cellObject);
        updateChildren(cellObject);
    })

    allCells[i].addEventListener("keydown",function(e){
        if(e.key == 'Backspace'){  //child
            let cell = e.target;
            let {rowId, colId} = getRowIdColIdFromElement(cell);
            let cellObj = db[rowId][colId];
            if(cellObj.formula){
                cellObj.formula = "";    // <--
                formulaInput.value = "";
                cell.textContent = "";
                removeFormula(cellObj); 
            }
        }
    })
}
// lastSelectedCell

formulaInput.addEventListener("blur",function(e){
    let formula = e.target.value;
    if(formula){
        let rowId = Number(lastSelectedCell.getAttribute("rowid"));
        let colId = Number(lastSelectedCell.getAttribute("colid"));
        let cellObject = db[rowId][colId];
        if(cellObject.formula){
            removeFormula(cellObject);
        }
        let computedValue = solveFormula(formula,cellObject); // will implement in next commit
        //update db
        cellObject.value = computedValue;
        cellObject.formula = formula;
        //update ui
        lastSelectedCell.textContent = computedValue;
        updateChildren(cellObject);
    }
})



// Utils functions

function getRowIdColIdFromElement(element){
    let rowId  = element.getAttribute("rowid");
    let colId = element.getAttribute("colid");
    return {
        rowId,
        colId
    }
}

function getRowIdColIdFromAddress(address){
    //address = A1, B2
    let colId = address.charCodeAt(0)-65;
    let rowId = Number(address.substring(1))-1;
    return {
        rowId,
        colId
    }
}

// Updating the values of childrens
function updateChildren(cellObject){
    for(let i=0; i<cellObject.children.length; i++){
        let childName = cellObject.children[i];
        let {rowId, colId} = getRowIdColIdFromAddress(childName);
        let childCellObj = db[rowId][colId];
        let newValue = solveFormula(childCellObj.formula);
        // Lets update database
        childCellObj.value = newValue;
        // Lets update UI
        let cellUI = document.querySelector(`div[rowid='${rowId}'][colid='${colId}']`);
        cellUI.textContent = newValue;
        updateChildren(childCellObj);
    }
}

function solveFormula(formula,selfCellObject){
    //formula = (A1 + B2 + 2 - C3)
    let formulaComps = formula.split(" ");
    //formulaComps = [A1,+,B2,+,2,-,C3];
    for(let i=0;i<formulaComps.length;i++){
        let formulaComp = formulaComps[i];
        if(formulaComp[0]>="A" && formulaComp[0]<="Z"){
            let {rowId,colId} = getRowIdColIdFromAddress(formulaComp);
            let cellObject = db[rowId][colId];
            let value = cellObject.value;
            if(selfCellObject){
                cellObject.children.push(selfCellObject.name);
                selfCellObject.parent.push(cellObject.name);
            }
            // console.log(cellObject);
            // console.log(cellObject);
            formula = formula.replace(formulaComp,value);
        }
    }
    //formula -> 2 * 3 + 4 - 3
    let computedValue = eval(formula);
    return computedValue;
}

function removeFormula(cellObject){
    for(let i=0; i<cellObject.parent.length; i++){
        let parentName = cellObject.parent[i];
        let {rowId,colId} = getRowIdColIdFromAddress(parentName);
        let parentCellObject = db[rowId][colId];
        let updatedChildren = parentCellObject.children.filter(function(child) {
            return child != cellObject.name;
        })
        parentCellObject.children = updatedChildren;
    }
    cellObject.parent = [];
}
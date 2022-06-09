let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let topLeftCell = document.querySelector(".top-left-cell");
let allCells = document.querySelectorAll(".cell");
let addressInput = document.querySelector("#address");
let formulaInput = document.querySelector("#formula");
let lastSelectedCell;

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
    })
}
// lastSelectedCell

formulaInput.addEventListener("blur",function(e){
    let formula = e.target.value;
    if(formula){
        let rowId = Number(lastSelectedCell.getAttribute("rowid"));
        let colId = Number(lastSelectedCell.getAttribute("colid"));
        let cellObject = db[rowId][colId];
        let computedValue = solveFormula(formula,cellObject); // will implement in next commit
        //update db
        cellObject.value = computedValue;
        cellObject.formula = formula;
        //update ui
        lastSelectedCell.textContent = computedValue;
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
            cellObject.children.push(selfCellObject.name);
            console.log(cellObject);
            console.log(cellObject);
            formula = formula.replace(formulaComp,value);
        }
    }
    //formula -> 2 * 3 + 4 - 3
    let computedValue = eval(formula);
    return computedValue;
}
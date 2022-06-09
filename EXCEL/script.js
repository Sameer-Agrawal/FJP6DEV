let topLeftCell = document.querySelector(".top-left-cell");
let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let cells = document.querySelectorAll(".cell");
let addressInput = document.querySelector(".address");
let formulaInput = document.querySelector(".formula");
let lastSelectedCell;

cellsContent.addEventListener("scroll", function(e){
    let scrollFromTop = e.target.scrollTop;
    let scrollFromLeft = e.target.scrollLeft;
    topRow.style.top = scrollFromTop+"px";
    leftCol.style.left = scrollFromLeft+"px";
    topLeftCell.style.top = scrollFromTop+"px";
    topLeftCell.style.left = scrollFromLeft+"px";
})
    

for(let i=0; i<cells.length; i++){
    cells[i].addEventListener("click", function(e){
        let {colId, rowId} = getRowColId(e);
        let address = String.fromCharCode(65+colId) + (rowId+1) +"";
        let cellObj = db[rowId][colId];
        addressInput.value = address;
        // Update the UI of formula
        formulaInput.value = cellObj.formula;
    })
    // Update the value in db
    cells[i].addEventListener("blur", function(e){
        lastSelectedCell = e.target;
        let cellValue = e.target.textContent;
        let {colId, rowId} = getRowColId(e);
        let cellObj = db[rowId][colId];
        if(cellObj.value == cellValue){
            return;
        }
        cellObj.value = cellValue;
    })
}


formulaInput.addEventListener("blur", function(e) {
    let formula = e.target.formula;
    if(formula){
        let {colId, rowId} = getRowColId(lastSelectedCell);
        let cellObject = db[rowId][colId];
        let computedValue = solveFormula(formula);
        // Update db
        cellObject.value = computedValue;
        cellObject.formula = formula;
        // Update ui
        lastSelectedCell.textContent = computedValue; 
    }
})
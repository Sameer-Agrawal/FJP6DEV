function getRowIdColIdFromElement(element){
    let rowId  = Number(element.getAttribute("rowId"));
    let colId = Number(element.getAttribute("colId"));
    return {
        rowId,
        colId
    }
}

// A function that will give the computed value for the formula Input

function solveFormula(formula){
    // formula -> A1 + B2 -2
    let strArr = formula.split(" ");
    // strArr -> ['A1','+','B2','-','2'];
    // console.log(strArr);
    for(let ele=0; ele<strArr.length; ele++){
        let strElement = strArr[ele];
        if(strElement[0]>="A" && strElement[0]<="Z"){
            let {rowId, colId} = getRowIdColIdFromAddress(strElement);
            let cellObj = db[rowId][colId];
            let cellValue = cellObj.value;
            formula = formula.replace(strElement,cellValue);
        }
    }
    let computedValue = eval(formula);
    return computedValue;  // Expectation
}

function getRowIdColIdFromAddress(address){
    //address = A1
    let colId = address.charCodeAt(0)-65;
    let rowId = Number(address.substring(1))-1;
    return {
        rowId,
        colId
    }
}
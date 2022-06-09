function getRowColId(e){
    let colId = Number(e.target.getAttribute("colId"));
    let rowId = Number(e.target.getAttribute("rowId"));
    return {colId, rowId};
}
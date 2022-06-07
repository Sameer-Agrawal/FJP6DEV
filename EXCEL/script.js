let cellsContent = document.querySelector(".cells-content");

cellCreator();



function cellCreator(){
    let structure = "<div class='top-left-cell'></div>";
    // Top-row
    structure += "<div class='top-row'>"
    for(let count=0; count<26; count++){
        structure += `<div class='top-row-cells'>${String.fromCharCode(65+count)}</div>`
    }
    structure += "</div>"
    // Left-col
    structure += "<div class='left-col'>"
    for(let count=0; count<100; count++){
        structure += `<div class='left-col-cells'>${count+1}</div>`
    }
    structure += "</div>"
    // Excel-cells
    structure += "<div class='editable-cells'>"
    for(let row=0; row<100; row++){  // Creating 100 rows
        structure += "<div class='row'>";
        for(let col=0; col<26; col++){  // Creating 100 columns
            structure += "<div class='cell' contentEditable>CELLS</div>"
        }
        structure += "</div>";
    }
    structure += "</div>"
    cellsContent.innerHTML = structure;
}


let topLeftCell = document.querySelector(".top-left-cell");
let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");

cellsContent.addEventListener("scroll", function(e){
    let scrollFromTop = e.target.scrollTop;
    let scrollFromLeft = e.target.scrollLeft;
    topRow.style.top = scrollFromTop+"px";
    leftCol.style.left = scrollFromLeft+"px";
    topLeftCell.style.top = scrollFromTop+"px";
    topLeftCell.style.left = scrollFromLeft+"px";
    
})


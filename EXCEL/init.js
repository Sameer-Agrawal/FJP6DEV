// All the functions that will run on initialization of web page!

let cellsContent = document.querySelector(".cells-content");
let db;

cellCreator();
createDb();
console.log(db);

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
            structure += "<div class='cell' contentEditable></div>"
        }
        structure += "</div>";
    }
    structure += "</div>"
    cellsContent.innerHTML = structure;
}


function createDb(){
    db=[];
    for(let row=0; row<100; row++){
        let rowArr = [];
        for(let col=0; col<26; col++){
            let name = String.fromCharCode(65+col)+(row+1)+"";
            let cellObj = {
                name: name,
                value: ""
            };
            rowArr.push(cellObj);
        }
        db.push(rowArr);
    }
}


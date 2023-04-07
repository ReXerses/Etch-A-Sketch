const sizeCanvas = document.querySelector("#size-canvas");
const canvasDimensionC = document.querySelector("#canvasDimension");
const container = document.querySelector('.canvas');
const btnNew = document.querySelector('#newCanvas') ;


function makeGrid() {
    for (i = 0; i < canvasDimensionC.value; i++) {
      const row = document.createElement("div");
      row.className = "row";
      container.appendChild(row);

      for (j = 0; j < canvasDimensionC.value; j++) {
        const col = document.createElement("div");
        col.className = "col";
        row.appendChild(col);

      }
    }
}

function deleteGrid() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}





btnNew.addEventListener('click', () => {
    
    deleteGrid();
    makeGrid();
    
});


sizeCanvas.textContent = canvasDimensionC.value; //label number default

canvasDimensionC.addEventListener("input", (e) => {
  sizeCanvas.textContent = e.target.value;
})

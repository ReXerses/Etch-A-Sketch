const sizeCanvas = document.querySelector("#size-canvas");
const canvasDimensionC = document.querySelector("#canvasDimension");
const container = document.querySelector('.canvas');
const btnNew = document.querySelector('#newCanvas') ;
const chooseColor = document.querySelector('#chooseColor'); //button
const random = document.querySelector('#psyco'); //random button
const shade = document.querySelector('#dark'); //darker button
let token = '0'; // token of pickYourColor function
let brush = false;
let oldColor;

/* ----------------- grid creation/destruction ------------------- */

function makeGrid() {
    for (i = 0; i < canvasDimensionC.value; i++) {
      const row = document.createElement("div");
      row.className = "row";
      row.style.backgroundColor='rgb(255 255 255)';
      container.appendChild(row);

      for (j = 0; j < canvasDimensionC.value; j++) {
        const col = document.createElement("div");
        col.className = "col";
        col.style.backgroundColor='rgb(255 255 255)';
        row.appendChild(col);

      }
    }
}

function deleteGrid() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

/* ----------------------------------------------------------------- */


/* --------------------- color patterns functions ------------------ */

function getRandomColor(quantity) {
  let letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < quantity; i++) {
    for (let j = 0; j < 6; j++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  }

  return color;
}

function parse_rgb_string(rgb) {

  rgb = rgb.replace(/[^\d,]/g, '').split(',');
  return rgb;

}


function shadeColor(color, percent) {

    let arrayRGB = parse_rgb_string(color);

    let R = arrayRGB[0];
    let G = arrayRGB[1]; 
    let B = arrayRGB[2]; 

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = Math.round(R)
    G = Math.round(G)
    B = Math.round(B)

    return `rgb(${R}, ${G}, ${B})`;

}

/* ----------------------------------------------------------------- */

/* ------------------ function to control the token ---------------- */

function pickYourColor (token) {

  switch (token) {
    case '0' : 

      return 'rgb(144, 238, 144)'; 
      break;

    case '1' :

      const yourColor = document.querySelector('#your-color');
      oldColor =yourColor.value;
      return yourColor.value;
      break;

    case '2' :

      return getRandomColor(1);
      break;

    case '3' :

      return shadeColor (oldColor, -10);
      break;

    default : 
      break;
  }

} 

/* ----------------------------------------------------------------- */


/* ----- Default grid ---- */
makeGrid();
sizeCanvas.textContent = canvasDimensionC.value; //label number default
let quadrati = container.querySelectorAll(' .canvas > div > div ');



quadrati.forEach((quadrato) => {

  quadrato.addEventListener("mouseover", function( event ) {  
    if (brush) {
    oldColor= event.target.style.backgroundColor;
    event.target.style.backgroundColor= pickYourColor(token);

    }
  });
  
}); 
/* ----------------------------------- */


/* ------------ event listeners ------------ */

btnNew.addEventListener('click', () => {
    
    deleteGrid();
    makeGrid();
    quadrati = container.querySelectorAll(' .canvas > div > div ');

    quadrati.forEach((quadrato) => {
  
        quadrato.addEventListener("mouseover", function( event ) {  

          oldColor= event.target.style.backgroundColor;
          event.target.style.backgroundColor= pickYourColor(token);
            
        });
  
    });
}); 

chooseColor.addEventListener('click' , () => {
  token= '1';
})

random.addEventListener('click' , () => {
  token = '2';
})

shade.addEventListener('click' , () => {
  token = '3';
})


canvasDimensionC.addEventListener("input", (e) => {
  sizeCanvas.textContent = e.target.value;
})

document.querySelector('.canvas').addEventListener('click', () => {
  brush = !brush;

  if (brush) {
    document.querySelector('.brush').textContent='Brush : On';
  }else {
    document.querySelector('.brush').textContent='Brush : Off';
  }
});

/* --------------------------------------------------------- */
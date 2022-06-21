const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");

const INITIAL_COLOR = "#2c2c2c"
const CAVANS_WIDTH = canvas.offsetWidth;
const CAVANS_HEIGHT = canvas.offsetHeight;


canvas.width = CAVANS_WIDTH;
canvas.height = CAVANS_HEIGHT;

ctx.fillStyle = "white";
ctx.fillRect(0,0,CAVANS_WIDTH,CAVANS_HEIGHT);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPaintng(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function changeMode(event){
    console.log(event.target.textContent);
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function hadleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,CAVANS_WIDTH,CAVANS_HEIGHT);
    }
}

function handleCM(event){
    event.preventDefault();
}

function saveCanvas(){
    const image = canvas.toDataURL("image/jpeg");   // Default type=png
    const imgLink = document.createElement("a");
    imgLink.href = image;
    imgLink.download = "canvas_img";
    imgLink.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPaintng);
    canvas.addEventListener("mouseleave", stopPaintng);
    canvas.addEventListener("click", hadleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(colors => {colors.addEventListener("click", handleColorClick)});

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", changeMode);
}

if(saveBtn){
    saveBtn.addEventListener("click", saveCanvas);
}

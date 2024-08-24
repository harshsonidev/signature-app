const canvas = document.getElementById("signatureCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

// Set initial default values
let isDrawing = false;
let bgColor = "white";
let textColor = "black";

// Initialize canvas with default colors
function initializeCanvas() {
  canvas.style.backgroundColor = bgColor;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = 2;
}

initializeCanvas();

// Function to start drawing
function startDrawing(x, y) {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(x, y);
}

// Function to draw on the canvas
function draw(x, y) {
  if (isDrawing) {
    ctx.lineTo(x, y);
    ctx.strokeStyle = textColor;
    ctx.stroke();
  }
}

// Function to stop drawing
function stopDrawing() {
  isDrawing = false;
}

// Mouse events
canvas.addEventListener("mousedown", (e) => {
  startDrawing(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousemove", (e) => {
  draw(e.offsetX, e.offsetY);
});

canvas.addEventListener("mouseup", stopDrawing);

// Touch events
canvas.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  startDrawing(
    touch.clientX - canvas.getBoundingClientRect().left,
    touch.clientY - canvas.getBoundingClientRect().top
  );
  e.preventDefault(); // Prevent scrolling while drawing
});

canvas.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  draw(
    touch.clientX - canvas.getBoundingClientRect().left,
    touch.clientY - canvas.getBoundingClientRect().top
  );
  e.preventDefault(); // Prevent scrolling while drawing
});

canvas.addEventListener("touchend", stopDrawing);

function setBgColor(color) {
  bgColor = color;
  canvas.style.backgroundColor = color;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function setTextColor(color) {
  textColor = color;
}

function saveSignature() {
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "signature.png";
  link.click();
}

function resetCanvas() {
  bgColor = "white";
  textColor = "black";
  initializeCanvas();
}

function restartSignature() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = bgColor; // Restore background color
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

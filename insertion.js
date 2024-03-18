const container = document.getElementById("container");
var sizeSlider = document.getElementById("sizeSlider");
var sizeOutput = document.getElementById("sizeValue");
var currentSize = sizeSlider.value;
sizeOutput.innerHTML = currentSize;
sizeSlider.oninput = function () {
  currentSize = this.value;
  sizeOutput.innerHTML = currentSize;
  newarray();
};

var speedSlider = document.getElementById("speedSlider");
var speedOutput = document.getElementById("speedValue");
var currentSpeed = speedSlider.value;
speedOutput.innerHTML = currentSpeed;
speedSlider.oninput = function () {
  currentSpeed = this.value;
  speedOutput.innerHTML = currentSpeed;
};

var array = [];

function newarray() {
  const n = parseInt(currentSize);
  array = [];
  for (let i = 0; i < n; i++) {
    array[i] = Math.random() * 100;
  }
  showbars();
}

function play() {
  const copy = [...array];
  const moves = insertionsort(copy);
  animate(moves);
}

function animate(moves) {
  let i = 0;
  function next() {
    if (i < moves.length) {
      const move = moves[i++];
      if (move.type === "compare" || move.type === "swap") {
        const [index1, index2] = move.indices;
        showbars({ indices: [index1, index2], type: move.type });
        if (move.type === "swap") {
          [array[index1], array[index2]] = [array[index2], array[index1]];
        }
      }
      setTimeout(next, currentSpeed);
    } else {
      showbars();
    }
  }
  next();
}

function showbars(move) {
  container.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] + "%";
    bar.style.width = "10px";
    if (move && move.indices && move.indices.includes(i)) {
      bar.style.backgroundColor = move.type === "swap" ? "red" : "green";
    } else {
      bar.style.backgroundColor = "black";
    }
    container.appendChild(bar);
  }
}

function insertionsort(array) {
  const moves = [];
  const n = array.length;
  for (let i = 1; i < n; i++) {
    let current = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > current) {
      moves.push({ indices: [j, j + 1], type: "compare" });
      moves.push({ indices: [j, j + 1], type: "swap" });
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = current;
  }
  return moves;
}

newarray();

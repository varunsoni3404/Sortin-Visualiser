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
  const moves = selectionsort(copy);
  animate(moves);
}

function animate(moves) {
  if (moves.length === 0) {
    showbars();
    return;
  }
  const move = moves.shift();
  const [i, j] = move.indices;
  if (move.type == "select") {
    showbars(move);
  } else if (move.type == "swap") {
    [array[i], array[j]] = [array[j], array[i]];
    showbars(move);
  }
  setTimeout(() => {
    animate(moves);
  }, currentSpeed);
}

function showbars(move) {
  container.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] + "%";
    bar.style.width = "10px";
    if (move && move.indices.includes(i)) {
      bar.style.backgroundColor = move.type == "swap" ? "red" : "green";
    } else {
      bar.style.backgroundColor = "black";
    }
    container.appendChild(bar);
  }
}

function selectionsort(array) {
  const moves = [];
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      moves.push({ indices: [minIndex, j], type: "select" });
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      moves.push({ indices: [minIndex, i], type: "swap" });
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }
  return moves;
}


newarray();

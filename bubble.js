const array = [];
const container = document.getElementById("container");
var slider = document.getElementById("mySlider");
var output = document.getElementById("sliderValue");
var currentValue = slider.value;
output.innerHTML = currentValue;
slider.oninput = function () {
  currentValue = this.value;
  output.innerHTML = currentValue;
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


function newarray() {
  const n = parseInt(currentValue);
  array.length = 0;
  for (let i = 0; i < n; i++) {
    array[i] = Math.random() * 100;
  }
  showbars();
}

function play() {
  const copy = [...array];
  const moves = bubblesort(copy);
  animate(moves);
}

function animate(moves) {
  if (moves.length === 0) {
    showbars();
    return;
  }
  const move = moves.shift();
  const [i, j] = move.indices;
  if (move.type == "swap") {
    [array[i], array[j]] = [array[j], array[i]];
  }
  showbars(move);
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

function bubblesort(array) {
  const moves = [];
  do {
    var swapped = false;
    for (let i = 1; i < array.length; i++) {
      moves.push({ indices: [i - 1, i], type: "comp" });
      if (array[i - 1] > array[i]) {
        swapped = true;
        moves.push({ indices: [i - 1, i], type: "swap" });
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
      }
    }
  } while (swapped);
  return moves;
}

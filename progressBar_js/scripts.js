const limit = 5;
const barsDiv = document.querySelector("#bars");
const btn = document.querySelector("button");
let bars = 0;
let queue = 0;

btn.addEventListener("click", () => {
  if (bars < limit) {
    bars++;
    createBar();
  } else {
    queue++;
  }
});

function createBar() {
  const bar = document.createElement("div");
  bar.classList.add("bar");
  bar.style.position = "relative"; 
  bar.style.width = "0%";
  bar.style.backgroundColor = "blue"; 
  bar.style.height = "30px"; 
  bar.style.overflow = "hidden"; 
  bar.style.animation = "progress 4s linear forwards";
  barsDiv.append(bar);

  const text = document.createElement("span");
  text.style.position = "absolute";
  text.style.left = "50%"; 
  text.style.transform = "translateX(-50%)";
  text.style.color = "white";
  text.style.fontWeight = "bold";
  text.innerText = "0%";
  bar.append(text);

  let progress = 0;
  const interval = setInterval(() => {
    progress += 2.56;
    text.innerText = `${Math.round(progress)}%`;
    bar.style.width = `${progress}%`;
    console.log(progress)

    if (progress >= 101) {
      clearInterval(interval);
    }
  }, 100);

  setTimeout(() => removeBar(bar), 4000);
}

function removeBar(bar) {
  bar.remove();
  bars--;
  if (queue > 0) {
    queue--;
    bars++; 
    createBar();
  }
}
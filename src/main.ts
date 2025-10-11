import "./style.css";

let counter: number = 0; // Amount of potatos
let costClicker: number = 10; // Base price for an auto clicker
let clickerCount: number = 0; // Amount of auto clickers

// Potato button
const potato = document.createElement("div");
potato.className = "potato";
potato.textContent = "🥔";
potato.style.cursor = "pointer";
potato.style.fontSize = "100px";
potato.style.position = "absolute";

document.body.style.textAlign = "center";
document.body.style.marginTop = "0px";
document.body.appendChild(potato);

// clicker button
const clicker = document.createElement("button");
clicker.className = "clicker";
clicker.style.position = "absolute";
clicker.style.cursor = "pointer";
clicker.style.fontSize = "24px";
clicker.textContent = `Buy auto clicker: ${costClicker}🍟`;

clicker.style.textAlign = "center";
clicker.style.marginTop = "275px";
clicker.style.fontFamily = "cursive";
document.body.appendChild(clicker);

// Buy 2 clicker button
const clicker2 = document.createElement("button");
clicker2.className = "clicker2";
clicker2.style.position = "absolute";
clicker2.style.cursor = "pointer";
clicker2.style.fontSize = "24px";
clicker2.textContent = `Buy 2 auto clickers: ${costClicker * 2}🍟`;

clicker2.style.textAlign = "center";
clicker2.style.marginTop = "400px";
clicker2.style.fontFamily = "cursive";
document.body.appendChild(clicker2);

// Display amount of fries
const counterElement = document.createElement("p");
counterElement.id = "click-counter";
counterElement.textContent = `Fries 🍟: ${counter}`;
counterElement.style.fontSize = "24px";
counterElement.style.position = "absolute";
counterElement.style.fontFamily = "cursive";
counterElement.style.marginTop = "200px";

document.body.appendChild(counterElement);

updateButtons();

// Function for buying auto clickers
function buyClick() {
  if (counter >= costClicker) {
    counter -= costClicker;
    costClicker++;
    clickerCount++;
    clicker.textContent = `Buy auto clicker: ${costClicker}🍟`;
    clicker2.textContent = `Buy auto clicker: ${costClicker * 2}🍟`;
    updateButtons();
    console.log(clickerCount);
  } else if (counter < costClicker) {
    updateButtons();
  }
}

function buyClick2() {
  if (counter >= (costClicker * 2)) {
    counter -= costClicker * 2;
    costClicker += 2;
    clickerCount += 2;
    clicker.textContent = `Buy auto clicker: ${costClicker}🍟`;
    clicker2.textContent = `Buy auto clicker: ${costClicker * 2}🍟`;
    updateButtons();
    console.log(clickerCount);
  } else if (counter < (costClicker * 2)) {
    updateButtons();
  }
}

// Disable button when not enough
function updateButtons() {
  clicker.disabled = counter < costClicker;
  clicker2.disabled = counter < (costClicker * 2);
}

// setInterval growth
//setInterval(() => {
//  counter++;
//  counterElement.textContent = `Fries 🍟: ${counter}`;
//}, 1000);

// Continuous growth (used brace) requestAnimationFrame growth
let lastTime = performance.now();
function gameLoop(currentTime: number) {
  const deltaSec = (currentTime - lastTime) / 1000; // seconds passed
  if (clickerCount > 0) {
    counter += clickerCount * deltaSec; // fractional growth
    counterElement.textContent = `Fries 🍟: ${Math.floor(counter)}`;
    updateButtons();
  }
  lastTime = currentTime;
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop); 

// When potato button clicked
potato.addEventListener("click", () => {
  // Update click count
  counter++;
  counterElement.textContent = `Fries 🍟: ${counter}`;
  updateButtons();


  // Play animation
  potato.style.transform = "scale(0.8)";
  setTimeout(() => {
    potato.style.transform = "scale(1)";
  }, 100);

  // Run the sparkle function 10 times
  for (let i = 0; i < 10; i++) {
    createSparkle();
  }
});

// When purchase auto clicker button is clicked
clicker.addEventListener("click", () => {
  buyClick();

  // Animation
  clicker.style.transform = "scale(0.8)";
  setTimeout(() => {
    clicker.style.transform = "scale(1)";
  }, 100);
});
clicker2.addEventListener("click", () => {
  buyClick2();

  // Animation
  clicker2.style.transform = "scale(0.8)";
  setTimeout(() => {
    clicker2.style.transform = "scale(1)";
  }, 100);
});

// Function to create a sparkle particle (used brace to create this)
function createSparkle() {
  const sparkle = document.createElement("div");
  sparkle.textContent = "✨";
  sparkle.style.position = "absolute";
  sparkle.style.fontSize = "25px";
  sparkle.style.pointerEvents = "none"; // Don't interfere with clicks
  sparkle.style.textAlign = "center";

  // Random direction + distance
  const angle = Math.random() * 360;
  const distance = 50 + Math.random() * 50; // 50–100px
  const x = Math.cos((angle * Math.PI) / 180) * distance;
  const y = Math.sin((angle * Math.PI) / 180) * distance;

  potato.getBoundingClientRect();

  // Animate outward
  document.body.appendChild(sparkle);

  // Use setTimeout to trigger animation
  requestAnimationFrame(() => {
    sparkle.style.transition = "all 0.6s ease-out";
    sparkle.style.transform = `translate(${x}px, ${y}px) rotate(200deg)`;
    sparkle.style.opacity = "0";
  });

  // Clean up
  setTimeout(() => {
    sparkle.remove();
  }, 600);
}

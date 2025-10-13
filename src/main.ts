import "./style.css";

let counter: number = 0; // Amount of potatos
let costUp1: number = 10; // Base price for an auto clicker
let costUp2: number = 100;
let costUp3: number = 1000;
let upgrade1: number = 0;
let upgrade1Amt: number = 0;
let upgrade2: number = 0;
let upgrade2Amt: number = 0;
let upgrade3: number = 0;
let upgrade3Amt: number = 0;
let growthRate: number = 0;

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

// Upgrade 1 button
const up1 = document.createElement("button");
up1.className = "clicker";
up1.style.position = "absolute";
up1.style.cursor = "pointer";
up1.style.fontSize = "24px";
up1.textContent = `Buy harvester: -${costUp1}🍟: +0.1🍟/sec`;

up1.style.textAlign = "center";
up1.style.marginTop = "275px";
up1.style.fontFamily = "cursive";
document.body.appendChild(up1);

// Upgrade 2 button
const up2 = document.createElement("button");
up2.className = "clicker2";
up2.style.position = "absolute";
up2.style.cursor = "pointer";
up2.style.fontSize = "24px";
up2.textContent = `Buy sprinkler: -${costUp2}🍟: +2.0🍟/sec`;

up2.style.textAlign = "center";
up2.style.marginTop = "375px";
up2.style.fontFamily = "cursive";
document.body.appendChild(up2);

// Upgrade 3 button
const up3 = document.createElement("button");
up3.className = "clicker3";
up3.style.position = "absolute";
up3.style.cursor = "pointer";
up3.style.fontSize = "24px";
up3.textContent = `Buy Fertilizer: -${costUp3}🍟: +50.0🍟/sec`;

up3.style.textAlign = "center";
up3.style.marginTop = "475px";
up3.style.fontFamily = "cursive";
document.body.appendChild(up3);

// Display amount of fries
const counterElement = document.createElement("p");
counterElement.id = "click-counter";
counterElement.textContent = `Fries 🍟: ${counter}`;
counterElement.style.fontSize = "24px";
counterElement.style.position = "absolute";
counterElement.style.fontFamily = "cursive";
counterElement.style.marginTop = "200px";

document.body.appendChild(counterElement);

// Display amount of harvesters
const clickerAmt = document.createElement("p");
clickerAmt.id = "clicker-count";
clickerAmt.textContent = `Harvesters: ${upgrade1}`;
clickerAmt.style.fontSize = "24px";
clickerAmt.style.position = "absolute";
clickerAmt.style.fontFamily = "cursive";
clickerAmt.style.marginTop = "-500px";

document.body.appendChild(clickerAmt);

// Display amount of sprinklers
const sprinklerAmt = document.createElement("p");
sprinklerAmt.id = "clicker-count";
sprinklerAmt.textContent = `Sprinklers: ${upgrade2}`;
sprinklerAmt.style.fontSize = "24px";
sprinklerAmt.style.position = "absolute";
sprinklerAmt.style.fontFamily = "cursive";
sprinklerAmt.style.marginTop = "-400px";

document.body.appendChild(sprinklerAmt);

// Display amount of fertilizer
const fertilizerAmt = document.createElement("p");
fertilizerAmt.id = "clicker-count";
fertilizerAmt.textContent = `Fertilizer: ${upgrade3}`;
fertilizerAmt.style.fontSize = "24px";
fertilizerAmt.style.position = "absolute";
fertilizerAmt.style.fontFamily = "cursive";
fertilizerAmt.style.marginTop = "-300px";

document.body.appendChild(fertilizerAmt);

// Display growth rate
const growthR = document.createElement("p");
growthR.id = "clicker-count";
growthR.textContent = `🍟/sec: ${growthRate.toFixed(1)}`;
growthR.style.fontSize = "24px";
growthR.style.position = "absolute";
growthR.style.fontFamily = "cursive";
growthR.style.marginTop = "-200px";

document.body.appendChild(growthR);

updateButtons();

// Function for buying auto clickers
function buyClick() {
  if (counter >= costUp1) {
    counter -= costUp1;
    costUp1++;
    upgrade1 += 0.1;
    upgrade1Amt++;
    growthRate += 0.1;
    up1.textContent = `Buy harvester: -${costUp1}🍟: +0.1🍟/sec`;
    up2.textContent = `Buy sprinkler: -${costUp2}🍟: +2.0🍟/sec`;
    up3.textContent = `Buy fertilizer: -${costUp3}🍟: +50.0🍟/sec`;
    updateButtons();
    clickerAmt.textContent = `Harvesters: ${upgrade1Amt}`;
    growthR.textContent = `🍟/sec: ${growthRate.toFixed(1)}`;
  } else if (counter < costUp1) {
    updateButtons();
  }
}

function buyClick2() {
  if (counter >= costUp2) {
    counter -= costUp2;
    costUp2 += 10;
    upgrade2 += 2;
    upgrade2Amt++;
    growthRate += 2;
    up1.textContent = `Buy harvester: -${costUp1}🍟: +0.1🍟/sec`;
    up2.textContent = `Buy sprinkler: -${costUp2}🍟: +2.0🍟/sec`;
    up3.textContent = `Buy fertilizer: -${costUp3}🍟: +50.0🍟/sec`;
    updateButtons();
    sprinklerAmt.textContent = `Sprinklers: ${upgrade2Amt}`;
    growthR.textContent = `🍟/sec: ${growthRate.toFixed(1)}`;
  } else if (counter < costUp2) {
    updateButtons();
  }
}

function buyClick3() {
  if (counter >= costUp3) {
    counter -= costUp3;
    costUp3 += 100;
    upgrade3 += 50;
    upgrade3Amt++;
    growthRate += 50;
    up1.textContent = `Buy harvester: -${costUp1}🍟: +0.1🍟/sec`;
    up2.textContent = `Buy sprinkler: -${costUp2}🍟: +2.0🍟/sec`;
    up3.textContent = `Buy fertilizer: -${costUp3}🍟: +50.0🍟/sec`;
    updateButtons();
    fertilizerAmt.textContent = `Fertilizer: ${upgrade3Amt}`;
    growthR.textContent = `🍟/sec: ${growthRate.toFixed(1)}`;
  } else if (counter < costUp2) {
    updateButtons();
  }
}

// Disable button when not enough
function updateButtons() {
  up1.disabled = counter < costUp1;
  up2.disabled = counter < costUp2;
  up3.disabled = counter < costUp3;
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
  if (upgrade1 > 0) {
    counter += upgrade1 * deltaSec; // fractional growth
    counterElement.textContent = `Fries 🍟: ${Math.floor(counter)}`;
    updateButtons();
  }
  if (upgrade2 > 0) {
    counter += upgrade2 * deltaSec;
    counterElement.textContent = `Fries 🍟: ${Math.floor(counter)}`;
    updateButtons();
  }
  if (upgrade3 > 0) {
    counter += upgrade3 * deltaSec;
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
up1.addEventListener("click", () => {
  buyClick();

  // Animation
  up1.style.transform = "scale(0.8)";
  setTimeout(() => {
    up1.style.transform = "scale(1)";
  }, 100);
});
up2.addEventListener("click", () => {
  buyClick2();

  // Animation
  up2.style.transform = "scale(0.8)";
  setTimeout(() => {
    up2.style.transform = "scale(1)";
  }, 100);
});
up3.addEventListener("click", () => {
  buyClick3();

  // Animation
  up3.style.transform = "scale(0.8)";
  setTimeout(() => {
    up3.style.transform = "scale(1)";
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

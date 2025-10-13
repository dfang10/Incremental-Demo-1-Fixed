import "./style.css";

let counter: number = 1000; // Amount of potatos
let growthRate: number = 0; // Counter to keep track of fries per second

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

// Display amount of fries
const counterElement = document.createElement("p");
counterElement.id = "click-counter";
counterElement.textContent = `Fries 🍟: ${counter}`;
counterElement.style.fontSize = "24px";
counterElement.style.position = "absolute";
counterElement.style.fontFamily = "cursive";
counterElement.style.marginTop = "200px";

document.body.appendChild(counterElement);

// Display growth rate
const growthR = document.createElement("p");
growthR.id = "clicker-count";
growthR.textContent = `🍟/sec: ${growthRate.toFixed(1)}`;
growthR.style.fontSize = "24px";
growthR.style.position = "absolute";
growthR.style.fontFamily = "cursive";
growthR.style.marginTop = "-200px";

document.body.appendChild(growthR);

interface Upgrade {
  name: string;
  cost: number;
  rate: number;
  count: number;
  currentCost: number;
  button: HTMLButtonElement;
  countDisplay: HTMLParagraphElement;
}

const upgrades: Upgrade[] = [];

// Define initial data
const upgradeData = [
  { name: "Harvester", cost: 10, rate: 0.1 },
  { name: "Sprinkler", cost: 100, rate: 2.0 },
  { name: "Fertilizer", cost: 1000, rate: 50 },
];

// Create each upgrade with its own button
for (let i = 0; i < upgradeData.length; i++) {
  const data = upgradeData[i];

  // Create the button
  const button = document.createElement("button");
  button.style.position = "absolute";
  button.style.marginTop = `${300 + i * 100}px`;
  button.style.fontSize = "24px";
  button.style.fontFamily = "cursive";
  button.style.cursor = "pointer";

  const upgAmt = document.createElement("p");
  upgAmt.style.position = "absolute";
  upgAmt.style.marginTop = `${-500 + i * 100}px`;
  upgAmt.style.fontSize = "24px";
  upgAmt.style.fontFamily = "cursive";

  // Create the upgrade object and push it
  const upgrade: Upgrade = {
    name: data.name,
    cost: data.cost,
    rate: data.rate,
    count: 0,
    currentCost: data.cost, // starts at base cost
    button: button, // ✅ assign the dynamically created button
    countDisplay: upgAmt,
  };

  upgrades.push(upgrade);

  // Set initial text and disabled state
  button.textContent = `Buy ${upgrade.name}: -${
    upgrade.currentCost.toFixed(1)
  }🍟: +${upgrade.rate}🍟/sec`;
  button.disabled = counter < upgrade.currentCost;

  upgAmt.textContent = `${upgrade.name}: ${upgrade.count}`;

  // Attach click handler
  button.onclick = () => buyUpgrade(i);

  // Add to DOM
  document.body.appendChild(button);
  document.body.appendChild(upgAmt);
}

// Replace buyclick with
function buyUpgrade(index: number) {
  const item = upgrades[index];
  if (counter >= item.currentCost) {
    counter -= item.currentCost;
    item.currentCost *= 1.15;
    item.count++;
    growthRate += item.rate;
    updateUI();
    item.button.style.transform = "scale(0.8)";
    setTimeout(() => {
      item.button.style.transform = "scale(1)";
    }, 100);
  }
}

function updateUI() {
  for (const item of upgrades) {
    item.button.textContent = `Buy ${item.name}: -${
      item.currentCost.toFixed(1)
    }🍟: +${item.rate}🍟/sec`;
    item.button.disabled = counter < item.currentCost;
    item.countDisplay.textContent = `${item.name}: ${item.count}`;
  }

  growthR.textContent = `🍟/sec: ${growthRate.toFixed(1)}`;

  counterElement.textContent = `Fries 🍟: ${Math.floor(counter)}`;
}

// setInterval growth commented out
//setInterval(() => {
//  counter++;
//  counterElement.textContent = `Fries 🍟: ${counter}`;
//}, 1000);

// Continuous growth (used brace) requestAnimationFrame growth
let lastTime = performance.now();
function gameLoop(currentTime: number) {
  const deltaSec = (currentTime - lastTime) / 1000; // seconds passed
  counter += growthRate * deltaSec; // Fractional growth
  counterElement.textContent = `Fries 🍟: ${Math.floor(counter)}`; // Display fries after added to counter
  updateUI(); // Call update button to check if player has enough to purchase again
  lastTime = currentTime;
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

// When potato button clicked
potato.addEventListener("click", () => {
  // Update click count
  counter++;
  updateUI();

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

for (let i = 0; i < upgrades.length; i++) {
  const item = upgrades[i];
  item.button.onclick = () => buyUpgrade(i);
}

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
  const distance = 50 + Math.random() * 50; //
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

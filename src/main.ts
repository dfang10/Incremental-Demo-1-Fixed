import "./style.css";

let potatoAmt: number = 0;
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

// Display amount of fries
const counterElement = document.createElement("p");
counterElement.id = "click-counter";
counterElement.textContent = `Fries 🍟: ${potatoAmt}`;
counterElement.style.fontSize = "24px";
counterElement.style.position = "absolute";
counterElement.style.fontFamily = "cursive";
counterElement.style.marginTop = "200px";

document.body.appendChild(counterElement);

const upgradeAmtPosition = -700;
const upgradeBtnPosition = 300;
const textSpacing = 100;

// Display growth rate
const growthRateDisplay = document.createElement("p");
growthRateDisplay.id = "clicker-count";
growthRateDisplay.textContent = `🍟/sec: ${growthRate.toFixed(1)}`;
growthRateDisplay.style.fontSize = "24px";
growthRateDisplay.style.position = "absolute";
growthRateDisplay.style.fontFamily = "cursive";
growthRateDisplay.style.marginTop = "-200px";

document.body.appendChild(growthRateDisplay);

// Display descriptions
const descriptionDisplay = document.createElement("p");
descriptionDisplay.style.position = "absolute";
descriptionDisplay.style.marginTop = "-125px";
descriptionDisplay.style.fontSize = "18px";
descriptionDisplay.style.fontFamily = "cursive";
descriptionDisplay.textContent = "Hover over an upgrade to learn more.";
document.body.appendChild(descriptionDisplay);

// Upgrade interface, holds all data
interface Upgrade {
  name: string;
  cost: number;
  rate: number;
  count: number;
  currentCost: number;
  button: HTMLButtonElement;
  countDisplay: HTMLParagraphElement;
  description: string;
}

const upgrades: Upgrade[] = [];

// Define initial data
const upgradeData = [
  {
    name: "Harvester",
    cost: 10,
    rate: 0.1,
    description: "A rusty but reliable tool.",
  },
  {
    name: "Sprinkler",
    cost: 100,
    rate: 2.0,
    description: "Potatoes get thirsty, right?",
  },
  {
    name: "Fertilizer",
    cost: 1000,
    rate: 50,
    description: "Used to increase crop yield.",
  },
  {
    name: "Genetic modification",
    cost: 5000,
    rate: 200,
    description: "Larger and more potatoes.",
  },
  {
    name: "Starch shrine",
    cost: 10000,
    rate: 1000,
    description: "Is this really a good idea?",
  },
];

// Create each upgrade with its own button
for (let i = 0; i < upgradeData.length; i++) {
  const data = upgradeData[i];

  // Create the upgrade buttons
  const button = document.createElement("button");
  button.style.position = "absolute";
  button.style.marginTop = `${upgradeBtnPosition + i * textSpacing}px`;
  button.style.fontSize = "24px";
  button.style.fontFamily = "cursive";
  button.style.cursor = "pointer";

  // Create display for amount of each upgrade
  const upgAmt = document.createElement("p");
  upgAmt.style.position = "absolute";
  upgAmt.style.marginTop = `${upgradeAmtPosition + i * textSpacing}px`;
  upgAmt.style.fontSize = "24px";
  upgAmt.style.fontFamily = "cursive";

  // Create the upgrade object and push it
  const upgrade: Upgrade = {
    name: data.name,
    cost: data.cost,
    rate: data.rate,
    count: 0,
    currentCost: data.cost,
    button: button,
    countDisplay: upgAmt,
    description: data.description,
  };

  upgrades.push(upgrade);

  // Set initial text and disabled state
  button.textContent = `Buy ${upgrade.name}: -${
    upgrade.currentCost.toFixed(1)
  }🍟: +${upgrade.rate}🍟/sec`;
  button.disabled = potatoAmt < upgrade.currentCost;

  upgAmt.textContent = `${upgrade.name}: ${upgrade.count}`;

  // When an upgrade is purchased, run buyUpgrade with index
  button.onclick = () => buyUpgrade(i);

  // Display the item description if the user hovers over an upgrade
  button.onmouseover = () => {
    descriptionDisplay.textContent = data.description;
  };

  // When the users mouse isn't hovering over an upgrade
  button.onmouseout = () => {
    descriptionDisplay.textContent = "Hover over an upgrade to learn more.";
  };

  document.body.appendChild(button); // Display upgrade buttons
  document.body.appendChild(upgAmt); // Display amount of upgrades
}

// Buy upgrades function
function buyUpgrade(index: number) {
  const item = upgrades[index];
  if (potatoAmt >= item.currentCost) { 
    potatoAmt -= item.currentCost; 
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

// Updating the buttons function
function updateUI() {
  for (const item of upgrades) { 
    item.button.textContent = `Buy ${item.name}: -${
      item.currentCost.toFixed(1)
    }🍟: +${item.rate}🍟/sec`; 
    item.button.disabled = potatoAmt < item.currentCost; 
    item.countDisplay.textContent = `${item.name}: ${item.count}`; 
  }

  growthRateDisplay.textContent = `🍟/sec: ${growthRate.toFixed(1)}`; 

  counterElement.textContent = `Fries 🍟: ${Math.floor(potatoAmt)}`; 
}

// Continuous growth (used brace) requestAnimationFrame growth
let lastTime = performance.now();
function gameLoop(currentTime: number) {
  const deltaSec = (currentTime - lastTime) / 1000; 
  potatoAmt += growthRate * deltaSec; // Fractional growth
  counterElement.textContent = `Fries 🍟: ${Math.floor(potatoAmt)}`; 
  updateUI(); 
  lastTime = currentTime;
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

// When potato button clicked
potato.addEventListener("click", () => {
  potatoAmt++; 
  updateUI(); 

  // Play animation
  potato.style.transform = "scale(0.8)";
  setTimeout(() => {
    potato.style.transform = "scale(1)";
  }, 100);

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
  sparkle.style.pointerEvents = "none"; 
  sparkle.style.textAlign = "center";

  // Random direction + distance
  const angle = Math.random() * 360;
  const distance = 50 + Math.random() * 50; //
  const x = Math.cos((angle * Math.PI) / 180) * distance;
  const y = Math.sin((angle * Math.PI) / 180) * distance;

  potato.getBoundingClientRect();

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

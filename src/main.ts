import "./style.css";

let counter: number = 0; // Amount of potatos
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

// Display descriptions
const descriptionDisplay = document.createElement("p");
descriptionDisplay.style.position = "absolute";
descriptionDisplay.style.marginTop = "-125px";
descriptionDisplay.style.fontSize = "18px";
descriptionDisplay.style.fontFamily = "cursive";
descriptionDisplay.textContent = "Hover over an upgrade to learn more.";
document.body.appendChild(descriptionDisplay);

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
  button.style.marginTop = `${300 + i * 100}px`;
  button.style.fontSize = "24px";
  button.style.fontFamily = "cursive";
  button.style.cursor = "pointer";

  // Create display for amount of each upgrade
  const upgAmt = document.createElement("p");
  upgAmt.style.position = "absolute";
  upgAmt.style.marginTop = `${-700 + i * 100}px`;
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
  button.disabled = counter < upgrade.currentCost;

  upgAmt.textContent = `${upgrade.name}: ${upgrade.count}`; // Display upgrade and the amount

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
  if (counter >= item.currentCost) { // If the player can afford the upgrade
    counter -= item.currentCost; // Subtract the cost of the item with the amount the player has
    item.currentCost *= 1.15; // Increase the price of the item by 15%
    item.count++; // Add 1 to the item count
    growthRate += item.rate; // Add to the growth rate based off items value
    updateUI(); // Call updateUI
    // Play an animation when they purchase an upgrade
    item.button.style.transform = "scale(0.8)";
    setTimeout(() => {
      item.button.style.transform = "scale(1)";
    }, 100);
  }
}

// Updating the buttons function
function updateUI() {
  for (const item of upgrades) { // Get every item
    item.button.textContent = `Buy ${item.name}: -${
      item.currentCost.toFixed(1)
    }🍟: +${item.rate}🍟/sec`; // Show upgrade name, cost, and rate of fries/sec
    item.button.disabled = counter < item.currentCost; // If not able to purchase upgrade, disable the button
    item.countDisplay.textContent = `${item.name}: ${item.count}`; // Update the amount of each upgrade
  }

  growthR.textContent = `🍟/sec: ${growthRate.toFixed(1)}`; // Display amount of fries per second

  counterElement.textContent = `Fries 🍟: ${Math.floor(counter)}`; // Display amount of fries
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
  counter++; // Update click count
  updateUI(); //  Call updateUI function

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

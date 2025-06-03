//-------GAMEPLAY-SETUP----------
let oxygen = 100;
let oxygenInterval;

const oxygenDisplay = document.getElementById("oxygen-amount");
const oxygenPerSecond = document.getElementById("oxygen-per-second");

function updateOxygenDisplay() {
	oxygenDisplay.textContent = Math.floor(oxygen);
	oxygenPerSecond.textContent = getOxygenPerSecond();
}

setInterval(() => {
	oxygen += getOxygenPerSecond();
	updateOxygenDisplay();
}, 1000);

const popUpOxygen = document.querySelector(".game__modal-oxygen");
//-------FLOWERS-TO-BUY----------
const flowers = [
	//an array of objects
	{ name: "Daisy", amount: 0, baseCost: 10, oxygenPerSecond: 1 },
	{ name: "Sunflower", amount: 0, baseCost: 25, oxygenPerSecond: 3 },
	{ name: "Snakeplant", amount: 0, baseCost: 50, oxygenPerSecond: 7 },
	{ name: "Aloe vera", amount: 0, baseCost: 100, oxygenPerSecond: 15 },
	{ name: "Calatheas", amount: 0, baseCost: 125, oxygenPerSecond: 19 },
	{ name: "Moth orchid", amount: 0, baseCost: 150, oxygenPerSecond: 23 },
];

function getOxygenPerSecond() {
	let totalOxygen = 0;
	flowers.forEach((flower) => {
		const upgrade = upgrades.find((u) => u.name === `${flower.name} upgrade`);
		const upgradeMultiplier = upgrade ? Math.pow(2, upgrade.amount) : 1;

		totalOxygen += flower.amount * flower.oxygenPerSecond * upgradeMultiplier;
	});

	return totalOxygen;
}

function updateFlowerUI() {
	const flowerElements = document.querySelectorAll(".game__flower");

	flowerElements.forEach((flowerEl) => {
		//loop through each element in the flowerElements NodeList  FlowerEl => game.flower
		const name = flowerEl.dataset.name; //get data-name attribute from the current .game-flower and store it
		const flowerData = flowers.find((f) => f.name === name); //find the exactly match for the data-name that was stored before for example: if Daisy was Clicked then it returns it

		if (!flowerData) return; //Safety check: if no matching flower object is found, the function exits early for this flowerEl

		const upgrade = upgrades.find(
			(u) => u.name === `${flowerData.name} upgrade`
		);
		const upgradeMultiplier = upgrade ? Math.pow(2, upgrade.amount) : 1;

		//UPDATING UI
		flowerEl.querySelector(
			".game__flower-amount"
		).textContent = `Amount: ${flowerData.amount}`;
		flowerEl.querySelector(
			".game__flower-cost"
		).textContent = `Cost: ${flowerData.baseCost}$`;
		flowerEl.querySelector(
			".game__flower-oxygen"
		).textContent = `Base oxygen generation: ${
			flowerData.oxygenPerSecond * upgradeMultiplier
		}/s`;
		flowerEl.querySelector(
			".game__flower-oxygen-total"
		).textContent = `Total oxygen generation: ${
			flowerData.oxygenPerSecond * flowerData.amount * upgradeMultiplier
		}/s`;
	});
}

document.querySelectorAll(".game__flower").forEach((flowerEl) => {
	//Select all .game__flower elements from the html anmd loop through node-list
	flowerEl.addEventListener("click", () => {
		//add a listener to every .game__flower block when block is clicked, then anonymous fucntion will run
		const name = flowerEl.dataset.name; //get the flower's name from it's dataset name
		const flowerData = flowers.find((f) => f.name === name); //look up the corresponding flower object in flowers array, matching by name
		if (!flowerData) return; //safety check if no flower was found stop the function

		// Optional: Check if you have enough oxygen
		if (oxygen >= flowerData.baseCost) {
			//chceck if player has enough oxygen
			oxygen -= flowerData.baseCost; //substract the cost of the flower from the player's total oxygen
			flowerData.amount += 1; //increase the ownder amount of this lower by 1
			flowerData.baseCost = Math.floor(flowerData.baseCost * 1.2); // Increase cost for next buy
			updateFlowerUI(); //call this funcion
			updateOxygenDisplay(); //call this function
		} else {
			popUpOxygen.classList.add("game__modal--show");
		}
	});
});

//UPGRADES
const upgrades = [
	{ name: "Daisy upgrade", amount: 0, baseCost: 1000 },
	{ name: "Sunflower upgrade", amount: 0, baseCost: 10000 },
	{ name: "Snakeplant upgrade", amount: 0, baseCost: 15000 },
	{ name: "Aloe vera upgrade", amount: 0, baseCost: 20000 },
	{ name: "Calatheas upgrade", amount: 0, baseCost: 25000 },
	{ name: "Moth orchid upgrade", amount: 0, baseCost: 30000 },
];

function updateUpgradesUI() {
	const upgradeElements = document.querySelectorAll(".game__upgrade");

	upgradeElements.forEach((upgradeEl) => {
		const name = upgradeEl.dataset.name;
		const upgradeData = upgrades.find((f) => f.name === name);
		if (!upgradeData) return;

		upgradeEl.querySelector(
			".game__upgrade-amount"
		).textContent = `Amount: ${upgradeData.amount}`;
		upgradeEl.querySelector(
			".game__upgrade-cost"
		).textContent = `Cost: ${upgradeData.baseCost}$`;
	});
}

document.querySelectorAll(".game__upgrade").forEach((upgradeEl) => {
	upgradeEl.addEventListener("click", () => {
		const name = upgradeEl.dataset.name;
		const upgradeData = upgrades.find((f) => f.name === name);

		if (!upgradeData) return;

		if (oxygen >= upgradeData.baseCost) {
			oxygen -= upgradeData.baseCost;
			upgradeData.amount += 1;
			upgradeData.baseCost = Math.floor(upgradeData.baseCost * 2.5);
			updateUpgradesUI();
			updateFlowerUI();
			updateOxygenDisplay();
		} else {
			//POP-UP MODAL
			popUpOxygen.classList.add("game__modal--show");
		}
	});
});

//GAME SAVE

function saveProgress() {
	localStorage.setItem("flowers", JSON.stringify(flowers));
	localStorage.setItem("upgrades", JSON.stringify(upgrades));
	localStorage.setItem("oxygen", oxygen);
	localStorage.setItem("lastActiveTime", Date.now());
}

document.addEventListener("visibilitychange", () => {
	if (document.visibilityState === "hidden") {
		saveProgress();
	}
});

window.addEventListener("beforeunload", saveProgress);

function applyOfflineProgress() {
	const lastActive = localStorage.getItem("lastActiveTime");
	if (!lastActive) return;

	const now = Date.now();
	const secondsPassed = Math.floor((now - lastActive) / 1000);

	if (secondsPassed > 1) {
		const oxygenPerSecond = getOxygenPerSecond(); // your existing function
		const oxygenGained = oxygenPerSecond * secondsPassed;

		oxygen += oxygenGained;
		alert(
			`Welcome back! You gained ${oxygenGained} oxygen while you were away.`
		);
	}
}

window.addEventListener("load", () => {
	const savedFlowers = localStorage.getItem("flowers");
	const savedOxygen = localStorage.getItem("oxygen");

	if (savedFlowers) {
		const parsedFlowers = JSON.parse(savedFlowers);
		parsedFlowers.forEach((saved, index) => {
			if (flowers[index]) {
				flowers[index].amount = saved.amount;
				flowers[index].baseCost = saved.baseCost; // if cost can change
			}
		});
	}

	if (savedOxygen) {
		oxygen = parseFloat(savedOxygen);
	}

	applyOfflineProgress();
	updateUpgradesUI();
	updateFlowerUI();
	updateOxygenDisplay();
});

//DATA RESET

const resetBtn = document.querySelector("[data-action=reset]");
resetBtn.addEventListener("click", (event) => {
	event.preventDefault();

	// Clear localStorage
	localStorage.clear();

	// Reset in-memory game state
	oxygen = 100;

	// Reset flowers array to default values
	flowers.forEach((flower) => {
		flower.amount = 0;
		// Reset costs to original values
		switch (flower.name) {
			case "Daisy":
				flower.baseCost = 10;
				break;
			case "Sunflower":
				flower.baseCost = 25;
				break;
			case "Snakeplant":
				flower.baseCost = 50;
				break;
			case "Aloe vera":
				flower.baseCost = 100;
				break;
			case "Calatheas":
				flower.baseCost = 125;
				break;
			case "Moth orchid":
				flower.baseCost = 150;
				break;
		}
	});

	// Reset upgrades array
	upgrades.forEach((upgrade) => {
		upgrade.amount = 0;
		// Reset upgrade costs to original values
		switch (upgrade.name) {
			case "Daisy upgrade":
				upgrade.baseCost = 1000;
				break;
			case "Sunflower upgrade":
				upgrade.baseCost = 10000;
				break;
			case "Snakeplant upgrade":
				upgrade.baseCost = 15000;
				break;
			case "Aloe vera upgrade":
				upgrade.baseCost = 20000;
				break;
			case "Calatheas upgrade":
				upgrade.baseCost = 25000;
				break;
			case "Moth orchid upgrade":
				upgrade.baseCost = 30000;
				break;
		}
	});

	// Update all UI elements
	updateFlowerUI();
	updateUpgradesUI();
	updateOxygenDisplay();

	alert("Game reset successfully!");
});

const buttonPopUpClose = document.querySelector(".game__modal-ok");

buttonPopUpClose.addEventListener("click", () => {
	popUpOxygen.classList.remove("game__modal--show");
});

//-------GAMEPLAY-SETUP----------
let oxygen = 100;
let oxygenInterval;

//-------FLOWERS-TO-BUY----------
const flowers = [
	//an array of objects
	{ name: "Daisy", amount: 0, baseCost: 10, oxygenPerSecond: 1 },
	{ name: "Sunflower", amount: 0, baseCost: 25, oxygenPerSecond: 3 },
	{ name: "Snakeplant", amount: 0, baseCost: 50, oxygenPerSecond: 7 },
	{ name: "Aloe vera", amount: 0, baseCost: 100, oxygenPerSecond: 15},
	{ name: "Calatheas", amount: 0, baseCost: 125, oxygenPerSecond: 19},
	{ name: "Moth orchid", amount: 0, baseCost: 150, oxygenPerSecond: 23},
];



// You could also use reduce() - an array method
function getOxygenPerSecond() {
	//define a function called getOxygenPerSecond
	let total = 0; //initialize variable to store the output
	for (let flower of flowers) {
		// loop through every flower in an array flowers
		total += flower.amount * flower.oxygenPerSecond; //assign to total amount of flowers time oxygengeneration
	}

	return total; //return total
}

//set interval repeatedly runs a function with fixed deleay between each call
// function startGame() {
// 	if (!oxygenInterval) {
// 		oxygenInterval = setInterval(() => {
// 			oxygen += getOxygenPerSecond();
// 		}, 1000);
// 	}
// }

// window.startGame = startGame;

function updateFlowerUI() {
	const flowerElements = document.querySelectorAll(".game__flower");

	flowerElements.forEach((flowerEl) => {
		//loop through each element in the flowerElements NodeList  FlowerEl => game.flower
		const name = flowerEl.dataset.name; //get data-name attribute from the current .game-flower and store it
		const flowerData = flowers.find((f) => f.name === name); //find the exactly match for the data-name that was stored before for example: if Daisy was Clicked then it returns it
		if (!flowerData) return; //Safety check: if no matching flower object is found, the function exits early for this flowerEl

        //UPDATING UI
		flowerEl.querySelector(
			".game__flower-amount"
		).textContent = `Amount: ${flowerData.amount}`;
		flowerEl.querySelector(
			".game__flower-cost"
		).textContent = `Cost: ${flowerData.baseCost}$`;
		flowerEl.querySelector(
			".game__flower-oxygen"
		).textContent = `Oxygen generation: ${flowerData.oxygenPerSecond}/s`;
	});
}

document.querySelectorAll(".game__flower").forEach((flowerEl) => { //Select all .game__flower elements from the html anmd loop through node-list
	flowerEl.addEventListener("click", () => { //add a listener to every .game__flower block when block is clicked, then anonymous fucntion will run 
		const name = flowerEl.dataset.name; //get the flower's name from it's dataset name
		const flowerData = flowers.find((f) => f.name === name); //look up the corresponding flower object in flowers array, matching by name
		if (!flowerData) return; //safety check if no flower was found stop the function

		// Optional: Check if you have enough oxygen
		if (oxygen >= flowerData.baseCost) { //chceck if player has enough oxygen
			oxygen -= flowerData.baseCost; //substract the cost of the flower from the player's total oxygen
			flowerData.amount += 1; //increase the ownder amount of this lower by 1
			flowerData.baseCost = Math.floor(flowerData.baseCost * 1.2); // Increase cost for next buy
			updateFlowerUI(); //call this funcion
			updateOxygenDisplay(); //call this function
		} else { //if the player couldn't afford the flower then execute this
			alert("Not enough oxygen!"); //alrt window containing "Not enough oxygen"
		}
	});
});

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



//-------MUSIC-SETUP----------
const music = new Audio("../assets/audio/music.mp3"); //make a variable and create new Audio object with that path
music.loop = true; //does music loop? - yes

document.addEventListener("DOMContentLoaded", () => {
	const startMusic = () => {
		music.play();
		document.removeEventListener("click", startMusic); // only trigger once
	};

	document.addEventListener("click", startMusic);
});

const musicSlider = document.getElementById("music-volume");

music.volume = musicSlider.value;

musicSlider.addEventListener("input", () => {
  music.volume = musicSlider.value;
})


//-------CLICK-SOUND-SETUP---------- I dunno if it won't be annoying in the future
const clickSound = new Audio('../assets/audio/click.mp3')
const clickSoundSlider = document.getElementById("sfx-volume");

//store volume separately
let sfxVolume = clickSoundSlider.value;

//Listen for slider input
clickSoundSlider.addEventListener("input", () => {
  sfxVolume = clickSoundSlider.value;
})

//Play sound with correct volume
document.addEventListener("click", () => {
    //without cloning the audio isn't reused reliably, clicking over and over doesn't let them overlap
    const click = clickSound.cloneNode();
    click.volume = sfxVolume; //set volume on the cloned audio
    click.play()
})



// //-----------------------------------

//-------MAIN-MENU-SETUP----------
const mainMenu = document.querySelector(".main-menu")
const mainMenuBtns = document.querySelector("[data-section=home]");
const mainMenuStartBtn = document.querySelector('[data-action=start]')
const mainMenuSaveBtn = document.querySelector("[data-section=save-game");
const mainMenuLoadBtn = document.querySelector("[data-section=load-game]");
const mainMenuOptionsBtn = document.querySelector("[data-section=options");
const mainMenuCreditsBtn = document.querySelector("[data-section=credits");

const mainMenuBackBtns = document.querySelector("[data-section=main-menu");

function mainMenuSelect(event) {
	// console.log(event.target.dataset);
  if(event.target.dataset.action === "start") {
    mainMenu.classList.toggle("main-menu--hidden");
    // startGame(); //start the game when we press start
  }
  if (event.target.dataset.action === "save") {
		mainMenuBtns.style.opacity = 0;
		mainMenuBtns.style.display = "none";
    
    mainMenuSaveBtn.style.opacity = 1;
    mainMenuSaveBtn.style.display =  "flex";

    mainMenuLoadBtn.style.opacity = 0;
    mainMenuLoadBtn.style.display =  "none";

    mainMenuOptionsBtn.style.opacity = 0;
    mainMenuOptionsBtn.style.display =  "none";

    mainMenuCreditsBtn.style.opacity = 0;
    mainMenuCreditsBtn.style.display =  "none"; 
	}

  if (event.target.dataset.action === "load") {
		mainMenuBtns.style.opacity = 0;
		mainMenuBtns.style.display = "none";

    mainMenuLoadBtn.style.opacity = 1;
    mainMenuLoadBtn.style.display =  "flex";

    mainMenuSaveBtn.style.opacity = 0;
    mainMenuSaveBtn.style.display =  "flex";

    mainMenuOptionsBtn.style.opacity = 0;
    mainMenuOptionsBtn.style.display =  "none";

    mainMenuCreditsBtn.style.opacity = 0;
    mainMenuCreditsBtn.style.display =  "none"; 

	}
  if (event.target.dataset.action === "options") {
		mainMenuBtns.style.opacity = 0;
		mainMenuBtns.style.display = "none";

    mainMenuOptionsBtn.style.opacity = 1;
    mainMenuOptionsBtn.style.display =  "flex";

    mainMenuSaveBtn.style.opacity = 0;
    mainMenuSaveBtn.style.display =  "flex";

    mainMenuLoadBtn.style.opacity = 0;
    mainMenuLoadBtn.style.display =  "none";

    mainMenuCreditsBtn.style.opacity = 0;
    mainMenuCreditsBtn.style.display =  "none"; 
	}
	if (event.target.dataset.action === "credits") {
		mainMenuBtns.style.opacity = 0;
		mainMenuBtns.style.display = "none";
    
    mainMenuCreditsBtn.style.opacity = 1;
    mainMenuCreditsBtn.style.display =  "flex";

    mainMenuSaveBtn.style.opacity = 0;
    mainMenuSaveBtn.style.display =  "flex";

    mainMenuLoadBtn.style.opacity = 0;
    mainMenuLoadBtn.style.display =  "none";

    mainMenuOptionsBtn.style.opacity = 0;
    mainMenuOptionsBtn.style.display =  "none";

	}
}

//MAIN MENU BACK BUTTON
function mainMenuBack(event) {
  if(event.target.dataset.action === "back-home"){
    mainMenuBtns.style.opacity = 1;
		mainMenuBtns.style.display = "flex";
  }
}

mainMenuBtns.addEventListener("click", mainMenuSelect);
mainMenuBackBtns.addEventListener("click", mainMenuBack);

//TOGGLING MENU
const menuInGame = document.querySelector(".game__menu-button");

menuInGame.addEventListener("click", () => {
	mainMenu.classList.toggle("main-menu--hidden");
	mainMenu.style.opacity = "0.9";
})

const something = [];
const languages = [];
const things = [];

addEventListener("DOMContentLoaded", async function () {
  async function loadJSON(filePath) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Could not load JSON: " + error);
    }
  }

  const loadedSomething = await loadJSON("something.json");
  const loadedLanguages = await loadJSON("languages.json");
  const loadedThings = await loadJSON("things.json");

  // copy values into the already declared arrays
  something.push(...loadedSomething);
  languages.push(...loadedLanguages);
  things.push(...loadedThings);

  console.log("loaded json files");
});

const generateBtn = document.getElementById("generate");

function pickRandom(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

const thingText = document.getElementById("thing");
const somethingText = document.getElementById("something");
const languageText = document.getElementById("language");

const spinningSound = new Audio("sounds/spinning.mp3");
spinningSound.loop = true;
const stopSound = new Audio("sounds/stop.mp3");

function animateText(element, array, finalValue, delay = 0) {
  return new Promise((resolve) => {
    let iterations = 0;
    const maxIterations = 20;

    setTimeout(() => {
      const interval = setInterval(() => {
        element.innerText = pickRandom(array);
        iterations++;

        if (iterations === maxIterations) {
          clearInterval(interval);
          element.innerText = finalValue;
          resolve();
        }
      }, 50);
    }, delay);
  });
}

generateBtn.addEventListener("click", async function () {
  generateBtn.disabled = true;
  spinningSound.volume = 0.5; // Adjust volume if needed
  stopSound.volume = 0.3; // Adjust volume if needed

  spinningSound.play();

  const selectedThing = pickRandom(things);
  const selectedSomething = pickRandom(something);
  const selectedLanguage = pickRandom(languages);

  await Promise.all([
    animateText(thingText, things, selectedThing, 0),
    animateText(somethingText, something, selectedSomething, 1100),
    animateText(languageText, languages, selectedLanguage, 2100),
  ]);

  spinningSound.pause();
  spinningSound.currentTime = 0;
  stopSound.play();

  generateBtn.disabled = false;
});

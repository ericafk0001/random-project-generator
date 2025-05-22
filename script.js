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

generateBtn.addEventListener("click", function () {
  thingText.innerText = pickRandom(things);
  somethingText.innerText = pickRandom(something);
  languageText.innerText = pickRandom(languages);
});

const categIdx = [
  "Any",
  "Programming",
  "Miscellaneous",
  "Dark",
  "Pun",
  "Spooky",
  "Christmas",
];
const contentSector = document.querySelector(".content");
const categMenu = document.querySelector(".categ-menu");
const categItems = document.querySelector(".categ-items");
const cpyJoke = document.getElementById("cpy");
const jokeSector = document.getElementById("joke-sector");
const getJokeBtn = document.getElementById("get-joke");
const cpyAlert = document.querySelector("p");

categIdx.forEach((e) => {
  const createItems = document.createElement("div");
  createItems.classList.add("added-items");
  createItems.textContent = e;
  categItems.appendChild(createItems);
});

categMenu.addEventListener("click", () => {
  categItems.classList.toggle("hidden-items");
});

const addedItems = document.querySelectorAll(".added-items");
addedItems.forEach((e) => {
  e.addEventListener("click", () => {
    categMenu.textContent = e.textContent;
    categItems.classList.add("hidden-items");
    getJoke();
  });
});

async function getJoke() {
  const res = await fetch(
    `https://v2.jokeapi.dev/joke/${categMenu.textContent}?blacklistFlags=nsfw,political&type=twopart`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  const data = await res.json();
  jokeSector.innerHTML = `${data.setup}<br> <br>${data.delivery}`;
}

getJoke();

getJokeBtn.addEventListener("click", () => {
  getJoke();
});

cpyJoke.addEventListener("click", () => {
  navigator.clipboard.writeText(jokeSector.textContent);
  cpyAlert.classList.remove("cpy-alert");
  setTimeout(() => {
    cpyAlert.classList.add("cpy-alert");
  }, 1000);
});

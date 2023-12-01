let radioTitle = document.querySelector(".radios h2");
let radiosList = document.querySelector(".radio-list");
let lang = sessionStorage.getItem("currentLang");

let audio = document.querySelector("audio");

async function getRadio() {
  let myData = await fetch(`json/${lang}/radio.json`);
  let result = await myData.json();
  result.radios.forEach((el) => {
    createRadio(el.name, el.url, el.id);
  });
  let listen = document.querySelectorAll(".listen-icon");
  listen.forEach((e) => {
    e.addEventListener("click", () => {
      audio.src = e.dataset.link;
      radioTitle.textContent = e.dataset.radio;
    });
  });
}
getRadio();

function setClass(tab, el, cls) {
  tab.forEach((e) => {
    e.classList.remove(cls);
  });
  el.classList.add(cls);
}

function createRadio(nameR, href, numR) {
  let num = (numR - 1).toString().padStart(3, "0");

  let rd = document.createElement("span");
  let numRadio = document.createElement("span");
  let nameRadio = document.createElement("span");
  let headphones = document.createElement("span");
  let div = document.createElement("div");

  numRadio.textContent = num;
  nameRadio.textContent = nameR;
  headphones.textContent = "headphones";

  headphones.setAttribute("data-link", href);
  headphones.setAttribute("data-radio", nameR);
  headphones.className = "material-symbols-outlined listen-icon";

  div.appendChild(headphones);
  rd.appendChild(numRadio);
  rd.appendChild(nameRadio);
  rd.appendChild(div);
  radiosList.appendChild(rd);
}

//------------ lang ----------------//

let title = document.querySelector(".radios h2");
let description = document.querySelector(".radios .container > p");

async function language() {
  let myData = await fetch(
    `lang/${sessionStorage.getItem("currentLang")}/radio-p.json`
  );
  let result = await myData.json();
  title.textContent = result.title;
  description.textContent = result.p;
}

language();

let url = window.location.href;
let regEx = /id=\d+/g;
let id = url.match(regEx)[0].substr(3);

//------------ lang ----------------//

let title = document.querySelector(".reciters h2");
let description = document.querySelector(".reciters .container > p");
let nbSurah = document.querySelector(".reciters .description p");

async function language() {
  let myData = await fetch(
    `lang/${sessionStorage.getItem("currentLang")}/reciters-p.json`
  );
  let result = await myData.json();
  title.innerHTML = result.title;
  description.innerHTML = result.p;
  nbSurah.innerHTML = result.nb;
}

language();

//---------------------------------//

let riwayaList = document.querySelector(".riwaya-list");
let surahList = document.querySelector(".surah-list");
let audio = document.querySelector("audio");
let lang = sessionStorage.getItem("currentLang");

async function getReciter() {
  let myData = await fetch(`json/${lang}/reciters.json`);
  let result = await myData.json();
  result.reciters.forEach((e) => {
    if (e.id == id) {
      document.querySelector(".reciters h2 span").textContent = e.name;
      document.querySelector(".reciters p span").textContent = e.name;

      e.moshaf.forEach((el) => {
        createList(
          el.name.split("-")[0].trim(),
          el.id,
          el.surah_total,
          el.surah_list,
          el.server
        );
      });

      let riwayaListLi = document.querySelectorAll(".riwaya-list li");

      riwayaListLi[0].classList.add("active");
      setDescription(riwayaListLi[0].textContent, e.moshaf[0].surah_total);
      getSurah(riwayaListLi[0].dataset.list, riwayaListLi[0].dataset.server);

      riwayaListLi.forEach((e) => {
        e.addEventListener("click", () => {
          setClass(riwayaListLi, e, "active");
          setDescription(e.textContent, e.dataset.surah);
          surahList.innerHTML = "";
          getSurah(e.dataset.list, e.dataset.server);
        });
      });
    }
  });
}
getReciter();

function createList(text, att, nb, list, server) {
  let rw = document.createElement("li");
  let rwText = document.createTextNode(text);
  rw.setAttribute("data-class", att);
  rw.setAttribute("data-surah", nb);
  rw.setAttribute("data-list", list);
  rw.setAttribute("data-server", server);
  rw.appendChild(rwText);
  riwayaList.appendChild(rw);
}

function setClass(tab, el, cls) {
  tab.forEach((e) => {
    e.classList.remove(cls);
  });
  el.classList.add(cls);
}

function setDescription(rName, sNumber) {
  let riwayaName = document.querySelector(".description h3");
  let surahNumber = document.querySelector(".description p span");

  riwayaName.textContent = rName;
  surahNumber.textContent = sNumber;
}

async function getSurah(list, server) {
  let myData = await fetch(`json/${lang}/suwar.json`);
  let result = await myData.json();
  result.suwar.forEach((e) => {
    suwar(list, server, e);
  });
  let listen = document.querySelectorAll(".listen-icon");
  listen.forEach((e) => {
    e.addEventListener("click", () => {
      audio.src = e.dataset.link;
    });
  });
}

function suwar(list, server, e) {
  let tab = list.split(",");
  tab.forEach((el) => {
    if (el == e.id) {
      createSurah(e.id, e.name, server);
    }
  });
}

function createSurah(numS, nameS, link) {
  let num = numS.toString().padStart(3, "0");
  let span = document.createElement("span");
  let numSurah = document.createElement("span");
  let nameSurah = document.createElement("span");
  numSurah.textContent = num;
  nameSurah.textContent = nameS;

  let myDiv = document.createElement("div");
  let a = document.createElement("a");
  let headphones = document.createElement("span");
  headphones.setAttribute("data-link", `${link}${num}.mp3`);
  let download = document.createElement("span");
  a.href = `${link}${num}.mp3`;

  download.className = "material-symbols-outlined";
  headphones.className = "material-symbols-outlined listen-icon";
  headphones.textContent = "headphones";
  download.textContent = "download";
  a.appendChild(download);
  myDiv.appendChild(headphones);
  myDiv.appendChild(a);

  span.appendChild(numSurah);
  span.appendChild(nameSurah);
  span.appendChild(myDiv);
  surahList.appendChild(span);
}

let tvList = document.querySelector(".tv-list");
let video = document.getElementById("live-video");
let lang = sessionStorage.getItem("currentLang");

async function getLiveTv() {
  let myData = await fetch(`json/${lang}/live.json`);
  let result = await myData.json();

  result.livetv.forEach((el) => {
    createList(el.name, el.url);
  });
  let tvListLi = document.querySelectorAll(".tv-list li");
  tvListLi[0].classList.add("active");
  video.src = tvListLi[0].dataset.url;
  tvListLi.forEach((e) => {
    e.addEventListener("click", () => {
      setClass(tvListLi, e, "active");
      video.src = e.dataset.url;
    });
  });
}
getLiveTv();

function createList(text, url) {
  let tv = document.createElement("li");
  let tvText = document.createTextNode(text);
  tv.setAttribute("data-url", url);
  tv.appendChild(tvText);
  tvList.appendChild(tv);
}

function setClass(tab, el, cls) {
  tab.forEach((e) => {
    e.classList.remove(cls);
  });
  el.classList.add(cls);
}

//------------ lang ----------------//

let title = document.querySelector(".live h2");
let description = document.querySelector(".live .container > p");

async function language() {
  let myData = await fetch(
    `lang/${sessionStorage.getItem("currentLang")}/live-p.json`
  );
  let result = await myData.json();
  title.textContent = result.title;
  description.textContent = result.p;
}

language();

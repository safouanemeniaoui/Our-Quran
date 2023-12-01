let langs = document.querySelectorAll(".lang span");

if (sessionStorage.getItem("currentLang")) {
  langs.forEach((e) => {
    if (e.dataset.lang === sessionStorage.getItem("currentLang")) {
      setClass(langs, e, "active");
    }
  });
} else {
  sessionStorage.setItem("currentLang", "ar");
}

langs.forEach((e) => {
  e.addEventListener("click", () => {
    setClass(langs, e, "active");
    sessionStorage.setItem("currentLang", e.dataset.lang);
    location.reload();
  });
});

if (sessionStorage.getItem("currentLang") != "ar") {
  addStyle();
}

function setClass(tab, el, cls) {
  tab.forEach((e) => {
    e.classList.remove(cls);
  });
  el.classList.add(cls);
}

//---------- Menu set -------------//

let links = document.querySelectorAll("ul li a");
let i = 0;

async function landingMenu() {
  let myData = await fetch(
    `lang/${sessionStorage.getItem("currentLang")}/menu.json`
  );
  let result = await myData.json();
  links.forEach((e) => {
    e.textContent = [...Object.values(result.menu)][i];
    i++;
  });
}

landingMenu();

//---------- Footer set -------------//

let fooInfoTitle = document.querySelector(".footer-info h2");
let fooInfoP = document.querySelector(".footer-info p");
let designer = document.querySelector(".designer");

let importantLinks = document.querySelectorAll(".important-link a");
let address = document.querySelectorAll(".address div p");

let direction =
  sessionStorage.getItem("currentLang") == "ar" ? "left" : "right";

async function footer() {
  let myData = await fetch(
    `lang/${sessionStorage.getItem("currentLang")}/footer.json`
  );
  let result = await myData.json();
  fooInfoTitle.textContent = result.footerInfo.title;
  fooInfoP.innerHTML = result.footerInfo.p;

  let fooInfoUrl = document.getElementById("url");
  fooInfoUrl.textContent = result.footerInfo.span;

  importantLinks[0].innerHTML = `<span class="material-symbols-outlined">keyboard_double_arrow_${direction} </span> ${result.importantLink.link1}`;
  importantLinks[1].innerHTML = `<span class="material-symbols-outlined">keyboard_double_arrow_${direction} </span> ${result.importantLink.link2}`;
  importantLinks[2].innerHTML = `<span class="material-symbols-outlined">keyboard_double_arrow_${direction} </span> ${result.importantLink.link3}`;
  address[0].textContent = result.address.ad;
  address[1].textContent = result.address.time;
  designer.textContent = result.designer.text;
}
footer();

//----------------------------

function addStyle() {
  let head = document.getElementsByTagName("head")[0];

  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "css/lang.css";
  head.appendChild(link);
}

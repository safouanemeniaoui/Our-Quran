let menuIcon = document.querySelector(".menu-icon");
let menu = document.querySelector("nav ul");
let recitersList = document.querySelector(".reciters-list");
let lang = sessionStorage.getItem("currentLang");

menuIcon.addEventListener("click", () => {
  menu.classList.toggle("show");
});

async function getReciters() {
  let myData = await fetch(`json/${lang}/reciters.json`);
  let result = await myData.json();
  result.reciters.forEach((e) => {
    createReciter(e.name, e.letter, `reciter.html?id=${e.id}`, e.id);
  });
  setTimeout(() => {
    let mixer = mixitup(".container .reciters-list", {
      selectors: {
        target: "a",
      },
      animation: {
        duration: 400,
        nudge: true,
        easing: "ease-in-out",
        clampHeight: false,
      },
    });
  }, 1000);
}
getReciters();

function createReciter(name, tag, href, order) {
  tag = tag === "إ" ? "أ" : tag;
  let rc = document.createElement("a");
  let rcText = document.createTextNode(name);

  rc.className = `mix category-${tag}`;
  rc.href = href;
  rc.setAttribute("data-order", order);
  rc.appendChild(rcText);
  recitersList.appendChild(rc);
}

//------------ lang ----------------//

let reciters = document.querySelector(".reciters h2");
let filter = document.querySelectorAll(".filter button");

let j = 0;

async function language() {
  let myData = await fetch(
    `lang/${sessionStorage.getItem("currentLang")}/index-p.json`
  );
  let result = await myData.json();
  reciters.textContent = result.reciters.reciterText;
  filter.forEach((e) => {
    e.textContent = [...Object.values(result.filter)][j];
    if (j != 0) {
      e.dataset.filter = `.category-${[...Object.values(result.filter)][
        j
      ].toUpperCase()}`;
    }
    j++;
  });
}

language();

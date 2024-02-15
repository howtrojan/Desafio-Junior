function alternarMenu(event) {
  event.stopPropagation();
  const menu = document.querySelector(".navigation");
  menu.classList.toggle("show-menu");

  const topbar = document.querySelector(".topbar");
  topbar.classList.toggle("show-menu");

  const content = document.querySelector(".content");
  content.classList.toggle("expanded");

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.classList.toggle("expanded");
  });
}

const menuButton = document.getElementById("menu-icon");
menuButton.addEventListener("click", alternarMenu);

function fecharMenuEmTelasPequenas() {
  const screenWidth = window.innerWidth;
  const menu = document.querySelector(".navigation");
  if (screenWidth <= 768 && menu.classList.contains("show-menu")) {
    const menu = document.querySelector(".navigation");
    menu.classList.toggle("show-menu");

    const topbar = document.querySelector(".topbar");
    topbar.classList.toggle("show-menu");

    const content = document.querySelector(".content");
    content.classList.toggle("expanded");
    content.classList.toggle("collapsed");

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.classList.toggle("expanded");
    });
  }
}

window.addEventListener("resize", fecharMenuEmTelasPequenas);

function fecharMenuAoClicarFora(event) {
  const menu = document.querySelector(".navigation");
  if (!menu.contains(event.target) && menu.classList.contains("show-menu")) {
    const menu = document.querySelector(".navigation");
    menu.classList.toggle("show-menu");

    const topbar = document.querySelector(".topbar");
    topbar.classList.toggle("show-menu");

    const content = document.querySelector(".content");
    content.classList.toggle("expanded");
    content.classList.toggle("collapsed");

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.classList.toggle("expanded");
    });
  }
}

document.addEventListener("click", fecharMenuAoClicarFora);

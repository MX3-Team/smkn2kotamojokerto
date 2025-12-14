// ================================
// HERO ANIMATION
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".hero-content");
  if (content) {
    content.style.opacity = 0;
    content.style.transform = "translateY(30px)";

    setTimeout(() => {
      content.style.transition = "0.8s ease";
      content.style.opacity = 1;
      content.style.transform = "translateY(0)";
    }, 200);
  }
});

// ================================
// REVEAL SIJA
// ================================
const sija = document.querySelector(".sija");
if (sija) {
  sija.style.opacity = 0;
  sija.style.transform = "translateY(40px)";
  sija.style.transition = "0.8s ease";

  window.addEventListener("scroll", () => {
    const pos = sija.getBoundingClientRect().top;
    const screen = window.innerHeight;

    if (pos < screen - 100) {
      sija.style.opacity = 1;
      sija.style.transform = "translateY(0)";
    }
  });
}

const scroll = document.getElementById("cardScroll");

// DUPLIKASI ISI (1x saja)
scroll.innerHTML += scroll.innerHTML;

let isDown = false;
let startX;
let scrollLeft;

scroll.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX;
  scrollLeft = scroll.scrollLeft;
});

window.addEventListener("mouseup", () => {
  isDown = false;
});

scroll.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();

  const x = e.pageX;
  const walk = x - startX;
  scroll.scrollLeft = scrollLeft - walk;
});

// ===== LOOP SAAT MENTOK =====
scroll.addEventListener("scroll", () => {
  const maxScroll = scroll.scrollWidth / 2;

  // kalau lewat kanan → balik ke awal
  if (scroll.scrollLeft >= maxScroll) {
    scroll.scrollLeft -= maxScroll;
  }

  // kalau ke kiri banget → lompat ke akhir
  if (scroll.scrollLeft <= 0) {
    scroll.scrollLeft += maxScroll;
  }
});

document.addEventListener("DOMContentLoaded", function () {

  // NAVBAR SCROLL
  const navbar = document.querySelector(".navbar-custom");
  const logo = document.querySelector(".nav-logo");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 5) {
      navbar.classList.add("scrolled");
      logo.src = "asset/logo-hitam.webp";
    } else {
      navbar.classList.remove("scrolled");
      logo.src = "asset/logo-putih.webp";
    }
  });

  // REVEAL SCROLL
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    reveals.forEach(el => {
      const windowHeight = window.innerHeight;
      const revealTop = el.getBoundingClientRect().top;
      const revealPoint = 100;

      if (revealTop < windowHeight - revealPoint) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);

  // BUTTON JOIN → PPDB
  const btnJoin = document.querySelector(".btn-join");
  if (btnJoin) {
    btnJoin.addEventListener("click", () => {
      window.location.href = "ppdb.html";
    });
  }

});

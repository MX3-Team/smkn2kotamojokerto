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

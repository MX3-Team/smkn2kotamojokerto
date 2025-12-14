function toggleMenu() {
  document.getElementById("nav-menu").classList.toggle("active");
}

/* Scroll Animation */
window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});

const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("dots");

let index = 0;

/* Create dots */
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.addEventListener("click", () => moveToSlide(i));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dots span");
dots[0].classList.add("active");

function moveToSlide(i) {
  index = i;
  slider.style.transform = `translateX(-${i * (slides[0].offsetWidth + 20)}px)`;
  updateDots();
}

function updateDots() {
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

/* Auto slide */
setInterval(() => {
  index = (index + 1) % slides.length;
  moveToSlide(index);
}, 2500);


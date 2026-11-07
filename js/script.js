// CMatrix-inspired falling code background
const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");

let width, height, columns, drops;
const chars = "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&<>/{}[]";

function resizeMatrix() {
  width = canvas.width = window.innerWidth * devicePixelRatio;
  height = canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  const fontSize = 16 * devicePixelRatio;
  columns = Math.floor(width / fontSize);
  drops = Array.from({ length: columns }, () => Math.random() * -60);
}

function drawMatrix() {
  const fontSize = 16 * devicePixelRatio;
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#00ff41";
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillText(char, x, y);

    if (y > height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i] += 0.65;
  }
}

resizeMatrix();
window.addEventListener("resize", resizeMatrix);
setInterval(drawMatrix, 45);

// Terminal typing effect
const typingText = document.getElementById("typing-text");
const messages = [
  "initializing portfolio...",
  "loading IT support experience...",
  "loading Google Workspace administration...",
  "loading NCC Computing qualifications...",
  "system ready."
];

let messageIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = messages[messageIndex];

  if (!deleting) {
    typingText.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      deleting = true;
      setTimeout(typeLoop, 1100);
      return;
    }
  } else {
    typingText.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      deleting = false;
      messageIndex = (messageIndex + 1) % messages.length;
      charIndex = 0;
    }
  }

  setTimeout(typeLoop, deleting ? 25 : 55);
}

typeLoop();

// Highlight the active navigation item while scrolling
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove("active"));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add("active");
    }
  });
}, { rootMargin: "-30% 0px -60% 0px" });

sections.forEach(section => observer.observe(section));

// Close mobile navbar after selecting a section
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    const nav = document.getElementById("mainNav");
    if (nav.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(nav).hide();
    }
  });
});

// Back to top
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 500);
});
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

document.getElementById("year").textContent = new Date().getFullYear();

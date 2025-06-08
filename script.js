gsap.registerPlugin(ScrollTrigger);

// Theme Toggle
const toggle = document.getElementById("theme-toggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
});
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
}

// Mobile Menu
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Smooth Scroll
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
    mobileMenu.classList.add("hidden");
  });
});

// Three.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("three-canvas"), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

const particleCount = 1000;
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
}
const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
const material = new THREE.PointsMaterial({ color: 0x1db954, size: 0.1 });
const points = new THREE.Points(geometry, material);
scene.add(points);

function animate() {
  requestAnimationFrame(animate);
  points.rotation.y += 0.001;
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Albums
const albums = [
  { id: "4aawyAB9vmqoyE99jRzvBK", title: "The Tortured Poets Department" },
  { id: "1Mo4aZ8pdj6L1jx8zSwJnt", title: "The Weeknd" },
  { id: "6IW2yn1vSBRl0nU3iQ5g7v", title: "Cowboy Carter" },
  { id: "25Uddgldy3slnChqKqHsIM", title: "Album 4" },
];

const albumGrid = document.getElementById("album-grid");
albums.forEach((album) => {
  const card = document.createElement("div");
  card.className = "bg-gray-700 p-4 rounded-lg shadow-lg transition transform hover:scale-105 album-card";
  card.innerHTML = `
    <h2 class="text-xl font-semibold text-center mb-4">${album.title}</h2>
    <iframe src="https://open.spotify.com/embed/album/${album.id}" class="w-full h-80 rounded" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    <div class="mt-4 text-center">
      <a href="https://open.spotify.com/album/${album.id}" target="_blank" class="inline-block px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition">Listen</a>
    </div>
  `;
  albumGrid.appendChild(card);

  gsap.from(card, {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
    },
  });

  VanillaTilt.init(card, {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
  });
});
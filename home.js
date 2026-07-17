import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";
const scene = new THREE.Scene();
const starsContainer = document.querySelector(".stars");
for (let i = 0; i < 400; i++){
    const star = document.createElement("span");
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.opacity = Math.random();
    star.style.animationDelay = Math.random() * 3 + "s";
    const size = Math.random() * 2 + 0.5;
    star.style.width = size + "px";
    star.style.height = size + "px";
    starsContainer.appendChild(star);
}
const earthContainer = document.querySelector(".earth-container");
const camera = new THREE.PerspectiveCamera(75, earthContainer.clientWidth / earthContainer.clientHeight, 0.1, 1000);
camera.position.z = 1.7;
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(earthContainer.clientWidth, earthContainer.clientHeight);
earthContainer.appendChild(renderer.domElement);
const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
const atmosphereGeometry = new THREE.SphereGeometry(1.02, 64, 64);
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load("https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg");
const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
const atmosphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x4da6ff,
    transparent: true,
    opacity: 0.15,
    side: THREE.BackSide
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);
const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
scene.add(atmosphere);
const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(5, 3, 5);
scene.add(light);
renderer.render(scene, camera);
let previousMouse = {
    x: 0,
    y: 0
}
let isDragging = false;
renderer.domElement.addEventListener("mousedown", (event) => {
    isDragging = true;
    previousMouse.x = event.clientX;
    previousMouse.y = event.clientY;
});
window.addEventListener("mouseup", () => {
    isDragging = false;
});
renderer.domElement.addEventListener("mousemove", (event) => {
    if (!isDragging) return;
    const movementX = event.clientX - previousMouse.x;
    const movementY = event.clientY - previousMouse.y;
    earth.rotation.y += movementX * 0.001;
    earth.rotation.x += movementY * 0.001;
    previousMouse.x = event.clientX;
    previousMouse.y = event.clientY;
});

function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.001;
    atmosphere.rotation.y =
    earth.rotation.y;
    atmosphere.rotation.x =
    earth.rotation.x;
    renderer.render(scene, camera);
}
animate();
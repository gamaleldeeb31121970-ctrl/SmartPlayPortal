// مشهد
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a);

// كاميرا
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 20, 25);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// إضاءة
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const light = new THREE.DirectionalLight(0xffffff, 0.6);
light.position.set(20, 30, 20);
scene.add(light);

// طاولة
const table = new THREE.Mesh(
  new THREE.BoxGeometry(25, 1, 15),
  new THREE.MeshPhongMaterial({ color: 0x006400 })
);
table.position.y = -0.5;
scene.add(table);

// حواف سوداء
const border = new THREE.Mesh(
  new THREE.BoxGeometry(25.3, 0.5, 15.3),
  new THREE.MeshPhongMaterial({ color: 0x000000 })
);
border.position.y = -0.25;
scene.add(border);

// حجر دومينو
function createDomino(x) {
  const domino = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.3, 1),
    new THREE.MeshPhongMaterial({ color: 0xfff8dc })
  );
  domino.position.set(x, 0.15, 0);
  scene.add(domino);
}

// عرض حجارة
for (let i = 0; i < 7; i++) {
  createDomino(-6 + i * 2);
}

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

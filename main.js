
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
camera.position.set(0, 15, 25);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// تحكم
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// إضاءة
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const light = new THREE.DirectionalLight(0xffffff, 0.8);
light.position.set(10, 20, 10);
scene.add(light);

// طاولة كازينو
const table = new THREE.Mesh(
  new THREE.BoxGeometry(25, 1, 15),
  new THREE.MeshStandardMaterial({ color: 0x006400 })
);
table.position.y = -0.5;
scene.add(table);

// حواف سوداء
const border = new THREE.Mesh(
  new THREE.BoxGeometry(25.4, 0.6, 15.4),
  new THREE.MeshStandardMaterial({ color: 0x000000 })
);
border.position.y = -0.25;
scene.add(border);

// حجر دومينو واحد
const domino = new THREE.Mesh(
  new THREE.BoxGeometry(2, 0.4, 1),
  new THREE.MeshStandardMaterial({ color: 0xfff8dc })
);
domino.position.set(0, 0.2, 0);
scene.add(domino);

// تعديل حجم الشاشة عند تغيير الأبعاد
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

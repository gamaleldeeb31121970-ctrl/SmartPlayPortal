
// main.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/js/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.set(0, 20, 25);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// الإضاءة
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(20, 30, 20);
scene.add(dirLight);

// الطاولة
const tableGeometry = new THREE.BoxGeometry(25, 1, 15);
const tableMaterial = new THREE.MeshPhongMaterial({color: 0x006400});
const table = new THREE.Mesh(tableGeometry, tableMaterial);
table.position.y = -0.5;
scene.add(table);

// حواف سوداء
const edgeGeometry = new THREE.BoxGeometry(25.2, 0.5, 15.2);
const edgeMaterial = new THREE.MeshPhongMaterial({color: 0x000000});
const edges = new THREE.Mesh(edgeGeometry, edgeMaterial);
edges.position.y = -0.25;
scene.add(edges);

// حجارة دومينو
const dominoes = [];
const dominoGeometry = new THREE.BoxGeometry(2, 0.3, 1);
const dominoMaterial = new THREE.MeshPhongMaterial({color: 0xfff8dc});

// أرقام الحجارة (نصفين لكل حجر)
const dominoNumbers = [
  [0,1],[1,1],[2,3],[3,3],[4,4],[5,5],[6,6],[0,6],[1,5],[2,4]
];

// توزيع النقاط لكل حجر بشكل صحيح
function addDots(domino, leftNumber, rightNumber){
  const dotGeometry = new THREE.SphereGeometry(0.15, 16, 16);
  const dotMaterial = new THREE.MeshPhongMaterial({color:0x000000});

  const positions = {
    1:[[0,0]],
    2:[[-0.3,0.3],[0.3,-0.3]],
    3:[[-0.3,0.3],[0,0],[0.3,-0.3]],
    4:[[-0.3,0.3],[0.3,0.3],[-0.3,-0.3],[0.3,-0.3]],
    5:[[-0.3,0.3],[0.3,0.3],[0,0],[-0.3,-0.3],[0.3,-0.3]],
    6:[[-0.3,0.3],[0.3,0.3],[-0.3,0],[0.3,0],[-0.3,-0.3],[0.3,-0.3]]
  };

  positions[leftNumber].forEach(pos=>{
    const dot = new THREE.Mesh(dotGeometry, dotMaterial);
    dot.position.set(pos[0]-0.5,0.18,pos[1]);
    domino.add(dot);
  });

  positions[rightNumber].forEach(pos=>{
    const dot = new THREE.Mesh(dotGeometry, dotMaterial);
    dot.position.set(pos[0]+0.5,0.18,pos[1]);
    domino.add(dot);
  });
}

dominoNumbers.forEach((numbers, i)=>{
  const domino = new THREE.Mesh(dominoGeometry, dominoMaterial);
  domino.position.set(-8 + i*2, 0.15, 0);
  addDots(domino, numbers[0], numbers[1]);
  scene.add(domino);
  dominoes.push(domino);
});

window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate(){
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

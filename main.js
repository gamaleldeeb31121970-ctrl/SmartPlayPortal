
// مشهد
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a);

// كاميرا
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.set(0, 15, 25);

// Renderer
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// تحكم بالكاميرا
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// إضاءة
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const light = new THREE.DirectionalLight(0xffffff, 0.8);
light.position.set(10, 20, 10);
scene.add(light);

// طاولة كازينو
const table = new THREE.Mesh(
    new THREE.BoxGeometry(25,1,15),
    new THREE.MeshStandardMaterial({color:0x006400})
);
table.position.y = -0.5;
scene.add(table);

// حواف سوداء
const border = new THREE.Mesh(
    new THREE.BoxGeometry(25.4,0.6,15.4),
    new THREE.MeshStandardMaterial({color:0x000000})
);
border.position.y = -0.25;
scene.add(border);

// دالة لإنشاء حجارة دومينو
function createDomino(x,z,number1,number2){
    const domino = new THREE.Mesh(
        new THREE.BoxGeometry(2,0.4,1),
        new THREE.MeshStandardMaterial({color:0xfff8dc})
    );
    domino.position.set(x,0.2,z);
    
    // النقط في المنتصف
    const loader = new THREE.TextureLoader();
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#b8860b'; // ذهبي للنقاط
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${number1} | ${number2}`, 32,16);

    const texture = new THREE.CanvasTexture(canvas);
    const mat = new THREE.MeshStandardMaterial({map: texture});
    
    // سطح علوي للنقاط
    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(2,1),
        mat
    );
    plane.rotation.x = -Math.PI/2;
    plane.position.y = 0.21;
    plane.position.x = x;
    plane.position.z = z;
    scene.add(domino, plane);
}

// توليد كل حجارة الدومينو (28 حجر)
const dominoSet = [
    [0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],
    [1,1],[1,2],[1,3],[1,4],[1,5],[1,6],
    [2,2],[2,3],[2,4],[2,5],[2,6],
    [3,3],[3,4],[3,5],[3,6],
    [4,4],[4,5],[4,6],
    [5,5],[5,6],
    [6,6]
];

let startX = -12;
let startZ = -6;
let offsetX = 4;
let offsetZ = 2;
let rowCount = 0;

for(let i=0;i<dominoSet.length;i++){
    const [a,b] = dominoSet[i];
    createDomino(startX + (rowCount%7)*offsetX, startZ + Math.floor(rowCount/7)*offsetZ, a,b);
    rowCount++;
}

// تعديل حجم الشاشة
window.addEventListener("resize", ()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animate
function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene,camera);
}
animate();

import * as THREE from 
"https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";


import { OrbitControls } from 
"https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/controls/OrbitControls.js";


import { GLTFLoader } from 
"https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/loaders/GLTFLoader.js";



let scene, camera, renderer;
let modelo;

let mouse = new THREE.Vector2();
let raycaster = new THREE.Raycaster();


const info = document.getElementById("info");



init();
animate();



function init(){


scene = new THREE.Scene();

scene.background = new THREE.Color(0x222222);



camera = new THREE.PerspectiveCamera(
45,
window.innerWidth/window.innerHeight,
0.1,
1000
);


camera.position.set(
0,
2,
5
);



renderer = new THREE.WebGLRenderer({
antialias:true
});


renderer.setSize(
window.innerWidth,
window.innerHeight
);


document.body.appendChild(renderer.domElement);



const controls = new OrbitControls(
camera,
renderer.domElement
);


controls.enableDamping=true;



// luz

const luz = new THREE.DirectionalLight(
0xffffff,
3
);

luz.position.set(3,5,5);

scene.add(luz);



scene.add(
new THREE.AmbientLight(
0xffffff,
1
)
);




// carregar modelo

const loader = new GLTFLoader();


loader.load(

"modelos/anatomia.glb",

(gltf)=>{


modelo = gltf.scene;


scene.add(modelo);



modelo.traverse((obj)=>{


if(obj.isMesh){

console.log(
"Peça encontrada:",
obj.name
);


// deixa cada peça selecionável

obj.userData.nome =
obj.name;


}


});



},

undefined,

(error)=>{

console.log(error);

}

);



window.addEventListener(
"click",
selecionar
);



window.addEventListener(
"resize",
redimensionar
);


}






function selecionar(event){


mouse.x =
(event.clientX /
window.innerWidth)*2-1;


mouse.y =
-(event.clientY /
window.innerHeight)*2+1;



raycaster.setFromCamera(
mouse,
camera
);



const objetos=[];


modelo.traverse((obj)=>{

if(obj.isMesh)
objetos.push(obj);

});



const colisao =
raycaster.intersectObjects(
objetos
);



if(colisao.length>0){


const objeto =
colisao[0].object;



info.innerHTML =
`
<b>Estrutura:</b><br>
${objeto.name}
`;



destacar(objeto);


}


}






function destacar(obj){


modelo.traverse((mesh)=>{


if(mesh.isMesh){

mesh.material.emissive.set(
0x000000
);

}

});



obj.material.emissive.set(
0xff0000
);


}







function redimensionar(){


camera.aspect =
window.innerWidth /
window.innerHeight;


camera.updateProjectionMatrix();


renderer.setSize(
window.innerWidth,
window.innerHeight
);


}






function animate(){

requestAnimationFrame(
animate
);


renderer.render(
scene,
camera
);


}

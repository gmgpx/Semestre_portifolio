// Importe a biblioteca THREE.js
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";

// Para permitir que a câmera se mova ao redor da cena
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

// Para permitir a importação do arquivo .gltf
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Cria uma cena Three.JS
const scene = new THREE.Scene();

// Cria uma nova câmera com posições e ângulos,
// 75 se refere ao FOV
// Razão de aspecto da câmera, que é a largura da janela dividida pela altura da janela. 
// Essa proporção é importante para garantir que a cena seja exibida corretamente em diferentes tamanhos de janela ou tela.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Mantém o controle da posição do mouse, para que possamos fazer o olho mover
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// Mantém o objeto 3D em uma variável global para acessá-lo posteriormente
let object;

// OrbitControls permitem que a câmera se mova ao redor da cena
let controls;

// Define qual objeto renderizar dentro das pastas
let objToRender = 'eye';

// Instancia um carregador para o arquivo .gltf
const loader = new GLTFLoader();

// Carrega o arquivo
loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    // Se o arquivo for carregado, adicione-o à cena
    object = gltf.scene;
    scene.add(object);

    // Posicionamento inicial da câmera ao lado do carro
    //camera.position.set(10, 10, 15); // Posição x=10, y=10, z=10
    //camera.fov = 20; // Valor do campo de visão (FOV) em graus
    //camera.updateProjectionMatrix(); // Atualiza a matriz de projeção da câmera
    
    // Direção da câmera para olhar para o carro de lado
    const carPosition = new THREE.Vector3(0, 0, 0); // Posição do centro do carro
    camera.lookAt(carPosition); // Faz a câmera olhar para o centro do carro

    // Renderiza a cena
    renderer.render(scene, camera);
  },
  function (xhr) {
    // Enquanto estiver carregando, registra o progresso
    console.log((xhr.loaded / xhr.total * 100) + '% carregado');
  },
  function (error) {
    // Se houver um erro, registra-o
    console.error(error);
  }
);

// Instancia um novo renderizador e define seu tamanho
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

// Adiciona o renderizador ao DOM
document.getElementById("container3D").appendChild(renderer.domElement);

// Define a distância da câmera para o modelo 3D a partir de proporção
 camera.position.z = objToRender === "kia" ? 5 : 500;

// Adiciona luzes à cena para que possamos ver o modelo 3D
const topLight = new THREE.DirectionalLight(0xffffff, 1); // (cor, intensidade)
topLight.position.set(500, 500, 500) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "dino" ? 5 : 1);
scene.add(ambientLight);

// Isso adiciona controles à câmera, então podemos girá-la / ampliá-la com o mouse
if (objToRender === "eye") {
  controls = new OrbitControls(camera, renderer.domElement);
}

// Renderiza a cena
function animate() {
  requestAnimationFrame(animate);
  // Aqui poderíamos adicionar código para atualizar a cena, adicionando algum movimento automático

  //Move o elemento conforme o mouse
  if (object && objToRender === "eye") {
    //Movi as constantes aqui até "encaixar" a com a pupila
    object.rotation.y = -3 + mouseX / window.innerWidth * 3;
    object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
  }
  renderer.render(scene, camera);
}

// Adiciona um ouvinte à janela para que possamos redimensionar a janela e a câmera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Adiciona um ouvinte para a posição do mouse, para que possamos fazer o olho se mover
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

// Inicia a renderização 3D
animate();

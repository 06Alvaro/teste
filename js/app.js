import { createScene } from "./scene.js";
import { loadModel } from "./loader.js";

console.clear();

console.log("====================================");
console.log(" Atlas Anatômico 3D");
console.log("====================================");

// ==========================
// Container (UMA SÓ VEZ)
// ==========================
const container = document.getElementById("canvasContainer");

if (!container) {
    throw new Error("canvasContainer não encontrado no HTML.");
}

// ==========================
// Criar cena
// ==========================
const app = createScene(container);

console.log("Cena criada com sucesso.");

// ==========================
// Carregar modelo
// ==========================
loadModel(app);

// ==========================
// Pesquisa
// ==========================
const searchBox = document.getElementById("searchBox");

if (searchBox) {
    searchBox.addEventListener("input", (event) => {

        const value = event.target.value.toLowerCase();

        console.log("Pesquisar:", value);

        // Futuro: filtro de ossos

    });
}

// ==========================
// Botões do menu
// ==========================
const menuButtons = document.querySelectorAll(".menuButton");

menuButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const group = button.dataset.group;

        console.log("Grupo selecionado:", group);

        // Futuro: filtro por região anatômica

    });

});

// ==========================
// Loop base (reservado)
// ==========================
function update() {
    requestAnimationFrame(update);

    // Futuro:
    // - raycaster (clique em ossos)
    // - animações
    // - highlights

}

update();

console.log("Aplicação iniciada com sucesso.");

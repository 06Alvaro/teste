import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export function loadModel(app) {

    console.log("Iniciando carregamento do modelo...");

    const loader = new GLTFLoader();

    loader.load(

        "models/model.glb",

        (gltf) => {

            console.log("Modelo carregado com sucesso!");

            const model = gltf.scene;

            // ===========================
            // Sombras
            // ===========================

            model.traverse((child) => {

                if (child.isMesh) {

                    child.castShadow = true;
                    child.receiveShadow = true;

                    if (child.material) {

                        child.material.side = THREE.FrontSide;

                    }

                }

            });

            // ===========================
            // Centralizar modelo
            // ===========================

            const box = new THREE.Box3().setFromObject(model);

            const center = box.getCenter(new THREE.Vector3());

            model.position.sub(center);

            // ===========================
            // Ajustar câmera
            // ===========================

            const box = new THREE.Box3().setFromObject(model);

const center = new THREE.Vector3();
box.getCenter(center);

const size = new THREE.Vector3();
box.getSize(size);

const maxDim = Math.max(size.x, size.y, size.z);

camera.position.copy(center);

camera.position.x += maxDim * 1.5;
camera.position.y += maxDim * 0.7;
camera.position.z += maxDim * 2.2;
camera.near = 0.01;
camera.far = maxDim * 100;

camera.updateProjectionMatrix();

camera.lookAt(center);
controls.target.copy(center);
controls.update();
            app.controls.update();

            app.scene.add(model);

            console.log(model);

        },

        (xhr) => {

            if (xhr.total > 0) {

                const percent = (
                    xhr.loaded / xhr.total * 100
                ).toFixed(1);

                console.log(`Carregando: ${percent}%`);

            } else {

                console.log(`Carregados ${xhr.loaded} bytes`);

            }

        },

        (error) => {

            console.error("ERRO AO CARREGAR O MODELO");
            console.error(error);

            alert(
                "Não foi possível carregar o modelo 3D.\n\n" +
                "Verifique:\n" +
                "- se o arquivo model.glb existe;\n" +
                "- se está na pasta models;\n" +
                "- se o Live Server está iniciado."
            );

        }

    );

}

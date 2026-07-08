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

            const size = box.getSize(new THREE.Vector3());

            const maxDimension = Math.max(
                size.x,
                size.y,
                size.z
            );

            const distance = maxDimension * 2.0;

            app.camera.position.set(
                0,
                maxDimension * 0.3,
                distance
            );

            app.camera.near = 0.01;
            app.camera.far = 1000;
            app.camera.updateProjectionMatrix();

            app.controls.target.set(0, 0, 0);
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

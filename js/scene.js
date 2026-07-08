import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function createScene(container) {

    console.clear();
    console.log("Criando cena...");

    // ==========================
    // CENA
    // ==========================
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);

    // ==========================
    // CÂMERA
    // ==========================
    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );

    camera.position.set(0, 1.5, 4);

    // ==========================
    // RENDERER
    // ==========================
    const renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    console.log("CANVAS ADICIONADO");

    // ==========================
    // CONTROLES
    // ==========================
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;

    // ==========================
    // LUZES
    // ==========================
    const ambient = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambient);

    const directional = new THREE.DirectionalLight(0xffffff, 3);
    directional.position.set(5, 10, 7);
    scene.add(directional);

    // ==========================
    // GRID (TESTE VISUAL)
    // ==========================
    const grid = new THREE.GridHelper(10, 20, 0x3b82f6, 0x374151);
    scene.add(grid);

    // ==========================
    // CUBO DE TESTE (IMPORTANTE)
    // ==========================
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: 0x00ff00 })
    );

    scene.add(cube);

    console.log("Cubo adicionado");

    // ==========================
    // ANIMAÇÃO
    // ==========================
    function animate() {

        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        controls.update();

        renderer.render(scene, camera);
    }

    animate();

    // ==========================
    // RESIZE
    // ==========================
    window.addEventListener("resize", () => {

        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(
            container.clientWidth,
            container.clientHeight
        );

    });

    // ==========================
    // RETURN (IMPORTANTE)
    // ==========================
    return {
        scene,
        camera,
        renderer,
        controls
    };
}

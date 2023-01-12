import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeDItem = ({ imageUrl }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();

    const FOV = 40;
    const AR = 1 / 1;
    const NEAR = 0.1;
    const FAR = 1000;
    const camera = new THREE.PerspectiveCamera(FOV, AR, NEAR, FAR);
    camera.position.setZ(30);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvasRef.current.parentNode.clientWidth, 500);

    const texture = new THREE.TextureLoader().load(imageUrl);

    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    const controls = new OrbitControls(camera, renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.005;
      cube.rotation.z += 0.005;
      controls.update();

      renderer.render(scene, camera);
    };

    animate();

    renderer.render(scene, camera);
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default ThreeDItem;

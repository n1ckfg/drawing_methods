"use strict";

var renderer, scene, camera;

function init() {
    renderer = new THREE.WebGLRenderer({antialias: false});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x7f7f7f, 1);

    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000); // fov, aspect, near, far
    camera.position.set(window.innerWidth / 2, window.innerHeight / 2, 0);

    window.addEventListener("resize", onResize);
}

function render() {
    renderer.render(scene, camera);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();    
    renderer.setSize(window.innerWidth, window.innerHeight);
}
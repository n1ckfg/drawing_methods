"use strict";

var renderer, scene, camera, controls, effect, clock, light;
var boxWidth, params, manager, lastRender;
//var room;

function init() {
    renderer = new THREE.WebGLRenderer({antialias: false});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x7f7f7f, 1);

    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

    /*
    room = new THREE.Mesh(
        new THREE.BoxGeometry(6, 6, 6, 10, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0x202020, wireframe: true })
    );
    room.position.y = 0;//3;
    scene.add(room);
    */
    
    clock = new THREE.Clock;
}

function render() {
    renderer.render(scene, camera);
}


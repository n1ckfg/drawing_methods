"use strict";

var renderer, scene, camera, controls, effect, clock, light;
var boxWidth, params, manager, lastRender;

var sprites = [];
var colliders = [];

var isWalking = false;
var isFlying = false;
var flyingThreshold = 0.15;
var movingSpeed = 0;
var movingSpeedMax = 0.25;
var movingDelta = 0.02;
var floor = 0;
var gravity = 0.01;
var cameraGaze;
var room;

var armSaveJson = false;
var armFrameForward = false;
var armFrameBack = false;
var armTogglePause = false;

function init() {
    renderer = new THREE.WebGLRenderer({antialias: false});
    renderer.setPixelRatio(window.devicePixelRatio);

    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

    room = new THREE.Mesh(
        new THREE.BoxGeometry(6, 6, 6, 10, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0x202020, wireframe: true })
    );
    room.position.y = 0;//3;
    scene.add(room);
    
    clock = new THREE.Clock;

    lastRender = 0;
}

function render(timestamp) {
    var delta = Math.min(timestamp - lastRender, 500);
    lastRender = timestamp;

    manager.render(scene, camera, timestamp);
}

/*
function setupControls() {
    window.addEventListener("touchstart", function(event) {
        isWalking = true;
    });

    window.addEventListener("touchend", function(event) {
        isWalking = false;
    })
}
*/


"use strict";

var isDrawing=false;
var mouse3D = new THREE.Vector3(0,0,0);
var debug = true;
var tempStroke;
var tempStrokeGeometry;
var tempPoints = [];
var minDistance = 0.001;
var useMinDistance = false;
var roundValues = true;
var numPlaces = 7;
var strokeCounter = 0;
var defaultColor = [0.667, 0.667, 1];
var defaultOpacity = 0.85;
var defaultLineWidth = 0.05;
var brushPath = "./images/brush.png";
var texture;
var special_mtl;
var strokes = [];

var laScale = 10;
var laOffset = new THREE.Vector3(0, 0, 0);//100, -20, 150);//95, -22, 50);//(100, -20, 150);
var laRot = new THREE.Vector3(0, 0, 0);//145, 10, 0);

var useScaleAndOffset = true;
var globalScale = new THREE.Vector3(0.01, 0.01, 0.01);
var globalOffset = new THREE.Vector3(0, 0, 0);

function createMtl(color, opacity, lineWidth) {
    var mtl = new THREE.MeshLineMaterial({
        useMap: 1,
        map: texture,
        transparent: true,
        color: new THREE.Color(color[0],color[1],color[2]),
        opacity: opacity, 
        lineWidth: lineWidth,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending
    });
    return mtl;
}

function onMouseDown(event) {                
    updateMousePos(event);
    beginStroke(mouse3D.x, mouse3D.y, mouse3D.z);
}

function onMouseUp(event) {
    endStroke();
}

function onMouseMove(event) {
    if (isDrawing) {
        updateMousePos(event);
        updateStroke(mouse3D.x, mouse3D.y, mouse3D.z);
    }
}

function onTouchStart(event) {                
    updateMousePos(event);
    beginStroke(mouse3D.x, mouse3D.y, mouse3D.z);
}

function onTouchEnd(event) {
    endStroke();
}

function onTouchMove(event) {
    if (isDrawing) {
        updateMousePos(event);
        updateStroke(mouse3D.x, mouse3D.y, mouse3D.z);
    }
}

function updateMousePos(event) {
    mouse3D = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
    mouse3D.unproject(camera);   
    if (debug) console.log(mouse3D);
}

// ~ ~ ~ 
function beginStroke(x, y, z) {
    isDrawing = true;
    //isPlaying = false;
    tempPoints = [];
    //clearTempStroke();
    createTempStroke(x, y, z);
    if (debug) console.log("Begin " + tempStroke.name + ".");
}

function updateStroke(x, y, z) {
    var p = new THREE.Vector3(x, y, z);

    if (p.distanceTo(tempPoints[tempPoints.length-1]) > minDistance) {
        clearTempStroke();
        createTempStroke(x, y, z);
        if (debug) console.log("Update " + tempStroke.name + ": " + tempStrokeGeometry.vertices.length + " points."); 
    }
}

function endStroke() {  // TODO draw on new layer
    isDrawing = false;
    strokes.push(tempStroke);
    //~
    clearTempStroke();
    refreshFrameLast();
    strokeCounter++;
}

function refreshFrameLast() {  // TODO draw on new layer
    scene.add(strokes[strokes.length-1]);
}

function addTempPoints(x, y, z) {
    tempPoints.push(new THREE.Vector3(x, y, z));
    tempStrokeGeometry = new THREE.Geometry();
    tempStrokeGeometry.dynamic = true;
    for (var i=0; i<tempPoints.length; i++) {
        tempStrokeGeometry.vertices.push(tempPoints[i]);
    }
    tempStrokeGeometry.verticesNeedUpdate = true;
    tempStrokeGeometry.__dirtyVertices = true; 
}

function createTempStroke(x, y , z) {
    addTempPoints(x, y, z);
    var line = new THREE.MeshLine();
    line.setGeometry(tempStrokeGeometry);
    tempStroke = new THREE.Mesh(line.geometry, special_mtl);
    tempStroke.name = "stroke" + strokeCounter;
    scene.add(tempStroke);
}

function clearTempStroke() {
    try {
        scene.remove(tempStroke);
        if (debug) console.log("Removed temp stroke.")
    } catch (e) { }       
}

function animate() {
    render();
    requestAnimationFrame(animate);         
}

function main() {
	texture = THREE.ImageUtils.loadTexture(brushPath);
    special_mtl = createMtl(defaultColor, defaultOpacity, defaultLineWidth/1.5);

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    document.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);

    init();

    animate();
}

window.onload = main;
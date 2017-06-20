
"use strict";

var isDrawing=false;
var mouse3D = new THREE.Vector3(0,0,0);
var debug = false;
var minDistance = 0.001;
var useMinDistance = true;
var strokeCounter = 0;
var brushColor = [1,1,1];
var brushOpacity = 0.8;
var brushSize = 0.01;
var brushPath = "./images/brush_inv.png";
var brush_tex = THREE.ImageUtils.loadTexture(brushPath);
var brush_mtl = createMtl(brushColor, brushOpacity, brushSize);
var strokes = [];

function createMtl(color, opacity, lineWidth) {
    var mtl = new THREE.MeshLineMaterial({
        useMap: 1,
        map: brush_tex,
        transparent: true,
        color: new THREE.Color(color[0],color[1],color[2]),
        opacity: opacity, 
        lineWidth: lineWidth,
        depthWrite: false,
        depthTest: false,
        blending: THREE.MultiplyBlending
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

function updateMousePos(event) {
    mouse3D = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
    mouse3D.unproject(camera);   
    if (debug) console.log(mouse3D);
}

function onTouchStart(event) {                
    updateTouchPos(event);
    beginStroke(mouse3D.x, mouse3D.y, mouse3D.z);
}

function onTouchEnd(event) {
    endStroke();
}

function onTouchMove(event) {
    if (isDrawing) {
        updateTouchPos(event);
        updateStroke(mouse3D.x, mouse3D.y, mouse3D.z);
    }
}

function updateTouchPos(event) {
    if (event.targetTouches.length > 0) {
        var touch = event.targetTouches[0];
        mouse3D = new THREE.Vector3((touch.pageX / window.innerWidth) * 2 - 1, -(touch.pageY / window.innerHeight) * 2 + 1, 0.5);
        mouse3D.unproject(camera);   
        if (debug) console.log(mouse3D);    
    }
}

// ~ ~ ~ 

function beginStroke(x, y, z) {
    isDrawing = true;
    strokes.push(new Stroke(x, y, z));
    if (debug) console.log("Begin " + stroke.name + ".");
}

function updateStroke(x, y, z) {
    var p = new THREE.Vector3(x, y, z);

    if (!useMinDistance || p.distanceTo(strokes[strokes.length-1].points[strokes[strokes.length-1].points.length-1]) > minDistance) {
        strokes[strokes.length-1].updateMesh(x, y, z);
    	if (debug) console.log("Update " + strokes[strokes.length-1].name + ": " + strokes[strokes.length-1].geometry.vertices.length + " points."); 
    }
}

function endStroke() {
    isDrawing = false;
    strokes[strokes.length-1].refine();
    strokeCounter++;
}

function animate() {
    render();
    requestAnimationFrame(animate);         
}

function main() {
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

class Stroke {

    constructor(x, y, z) {
        this.points = [];
        this.smoothReps = 10;
        this.splitReps = 2;
        this.geometry;
        this.mesh;
   	    this.addPoints(x, y, z);
        this.createStroke();
    }

	rebuildGeometry() {
	    this.geometry = new THREE.Geometry();
	    this.geometry.dynamic = true;
	    for (var i=0; i<this.points.length; i++) {
	        this.geometry.vertices.push(this.points[i]);
	    }
	    this.geometry.verticesNeedUpdate = true;
	    this.geometry.__dirtyVertices = true; 
	}

	addPoints(x, y, z) {
	    this.points.push(new THREE.Vector3(x, y, z));
	    this.rebuildGeometry();
	}

	clearStroke() {
	    try {
	        scene.remove(this.mesh);
	    } catch (e) { }       
	}

	createStroke() {
	    var line = new THREE.MeshLine();
	    line.setGeometry(this.geometry);
	    this.mesh = new THREE.Mesh(line.geometry, brush_mtl);
	    this.mesh.name = "stroke" + strokeCounter;
	    scene.add(this.mesh);
	}

	updateMesh(x, y, z) {
        this.clearStroke();
	    this.addPoints(x, y, z);
        this.createStroke();
	}

	refreshMesh() {
        this.clearStroke();
        this.rebuildGeometry();
        this.createStroke();   
	}

    smoothStroke() {
        var weight = 18;
        var scale = 1.0 / (weight + 2);
        var nPointsMinusTwo = this.points.length - 2;
        var lower, upper, center;

        for (var i = 1; i < nPointsMinusTwo; i++) {
            lower = this.points[i-1];
            center = this.points[i];
            upper = this.points[i+1];

            center.x = (lower.x + weight * center.x + upper.x) * scale;
            center.y = (lower.y + weight * center.y + upper.y) * scale;
            center.z = (lower.z + weight * center.z + upper.z) * scale;
        }
    }

    splitStroke() {
        for (var i = 1; i < this.points.length; i+=2) {
            var x = (this.points[i].x + this.points[i-1].x) / 2;
            var y = (this.points[i].y + this.points[i-1].y) / 2;
            var z = (this.points[i].z + this.points[i-1].z) / 2;
            var p = new THREE.Vector3(x, y, z);
            this.points.splice(i, 0, p);
        }
    }

    refine() {
        for (var i=0; i<this.splitReps; i++){
            this.splitStroke();   
            this.smoothStroke();  
        }
        for (var i=0; i<this.smoothReps - this.splitReps; i++){
            this.smoothStroke();      
        }
		this.refreshMesh();   
    }

}
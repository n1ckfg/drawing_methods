
"use strict";

let isDrawing=false;
let mouse3D = new THREE.Vector3(0,0,0);
let debug = false;
let minDistance = 0.001;
let useMinDistance = true;
let strokeCounter = 0;
let brushColor = [1,1,1];
let brushOpacity = 0.8;
let brushSize = 0.01;
let brushPath = "./images/brush_inv.png";
let brush_tex = THREE.ImageUtils.loadTexture(brushPath);
let brush_mtl = createMtl(brushColor, brushOpacity, brushSize);
let strokes = [];

function createMtl(color, opacity, lineWidth) {
    let mtl = new THREE.MeshLineMaterial({
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
        let touch = event.targetTouches[0];
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
    let p = new THREE.Vector3(x, y, z);

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
	    for (let i=0; i<this.points.length; i++) {
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
	    let line = new THREE.MeshLine();
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
        let weight = 18;
        let scale = 1.0 / (weight + 2);
        let nPointsMinusTwo = this.points.length - 2;
        let lower, upper, center;

        for (let i = 1; i < nPointsMinusTwo; i++) {
            lower = this.points[i-1];
            center = this.points[i];
            upper = this.points[i+1];

            center.x = (lower.x + weight * center.x + upper.x) * scale;
            center.y = (lower.y + weight * center.y + upper.y) * scale;
            center.z = (lower.z + weight * center.z + upper.z) * scale;
        }
    }

    splitStroke() {
        for (let i = 1; i < this.points.length; i+=2) {
            let x = (this.points[i].x + this.points[i-1].x) / 2;
            let y = (this.points[i].y + this.points[i-1].y) / 2;
            let z = (this.points[i].z + this.points[i-1].z) / 2;
            let p = new THREE.Vector3(x, y, z);
            this.points.splice(i, 0, p);
        }
    }

    refine() {
        for (let i=0; i<this.splitReps; i++){
            this.splitStroke();   
            this.smoothStroke();  
        }
        for (let i=0; i<this.smoothReps - this.splitReps; i++){
            this.smoothStroke();      
        }
		this.refreshMesh();   
    }

}
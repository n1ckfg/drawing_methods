"use strict";

let bgColor;
let brushColor;
let brushSize = 10;
let brushOpacity = 0.8;
let strokes = [];

function setup() {
	pixelDensity(1);
	createCanvas(displayWidth, displayHeight);

	bgColor = color(127);
	brushColor = color(0, brushOpacity * 255);
	strokeCap(ROUND);
	strokeJoin(ROUND);
}

function draw() {
    background(bgColor);

	if (mouseIsPressed) {
		strokes[strokes.length-1].points.push(createVector(mouseX, mouseY));
	}

	for (let i=0; i<strokes.length; i++) {
		strokes[i].run();
	}
}

function mousePressed() {
	strokes.push(new Stroke(brushColor, brushSize));
}

function mouseReleased() {
	strokes[strokes.length-1].refine();
}

function touchStarted() {
	strokes.push(new Stroke(brushColor, brushSize));
}

function touchMoved() {
    try {
    	if (touchX != 0 && touchY!= 0) {
			strokes[strokes.length-1].points.push(createVector(touchX, touchY));
    	}
    } catch (e) { }
}

function touchEnded() {
	strokes[strokes.length-1].refine();
}

class Stroke {

	constructor(brushColor, brushSize) {
		this.points = [];
		this.brushColor = brushColor;
		this.brushSize = brushSize;
		this.smoothReps = 10;
		this.splitReps = 2;
	}

	draw() {
		noFill();
		stroke(this.brushColor);
		strokeWeight(this.brushSize);
		beginShape();
		for (let i=0; i<this.points.length; i++) {
			vertex(this.points[i].x, this.points[i].y);
		}
		endShape();
	}

	run() {
		this.draw();
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
        }
	}

	splitStroke() {
		for (let i = 1; i < this.points.length; i+=2) {
			let x = (this.points[i].x + this.points[i-1].x) / 2;
			let y = (this.points[i].y + this.points[i-1].y) / 2;
			let p = createVector(x, y);
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
	}

}
"use strict";

var img;
var lastImg;

var blockDrawing = false;
var bgColor, currentColor;

var brushSizeMax = 40;
var brushSizeMin = 2;
var brushScale = 0.25;
var brushSizeCurrent = brushSizeMax * brushScale;
var brushOpacity = 0.75;
var brushScaleStep = 0.05;

function setup() {
	pixelDensity(1);
	createCanvas(displayWidth, displayHeight);

	img = createGraphics(width, height);
	lastImg = createGraphics(width, height);

	bgColor = color(127);
	currentColor = color(0);

	img.background(bgColor);
    lastImg.background(bgColor);
}

function draw() {
    image(img, 0, 0, width, height);

	 if (mouseIsPressed && !blockDrawing) {
        img.strokeWeight(brushSizeCurrent);
        img.stroke(color(red(currentColor), green(currentColor), blue(currentColor), 255 * brushOpacity));
        img.line(mouseX, mouseY, pmouseX, pmouseY);
	}		
}

function mousePressed() {
    lastImg.image(img, 0, 0, width, height);
    console.log("undo state saved");
}

function mouseReleased() {
    blockDrawing = false;
}

function touchStarted() {
    lastImg.image(img, 0, 0, width, height);
    console.log("undo state saved");
}

function touchMoved() {
    if (!blockDrawing && (ptouchX != 0 && ptouchY!= 0)) {
    	img.strokeWeight(brushSizeCurrent);
        img.stroke(color(red(currentColor), green(currentColor), blue(currentColor), 255 * brushOpacity));
        img.line(touchX, touchY, ptouchX, ptouchY);
        
        return false;
    }
}

function touchEnded() {
    blockDrawing = false;
}
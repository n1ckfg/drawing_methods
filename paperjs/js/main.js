"use strict";

paper.install(window);

function main() {

    // Get a reference to the canvas object
    let canvas = document.getElementById("canvas1"); 
    
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);
    
    let tool = new Tool();
    let path;

    tool.onMouseDown = function(event) { 
        // If we produced a path before, deselect it:
        if (path) {
            path.selected = false;
        }

        // Create a new path and set its stroke color to black:
        path = new paper.Path({
            segments: [event.point],
            strokeColor: "black",
            strokeCap: "round",
            strokeWidth: 10,
            opacity: 0.8 
        });
        paper.view.draw();
    }

    // While the user drags the mouse, points are added to the path
    // at the position of the mouse:
    tool.onMouseDrag = function(event) {
        path.add(event.point);
        path.smooth();
        paper.view.draw();
    }

    // When the mouse is released, we simplify the path:
    tool.onMouseUp = function(event) {
        path.smooth();
        path.simplify(1);
        paper.view.draw();
    }

    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        paper.view.viewSize = new Size(canvas.width, canvas.height);
        drawBg();
        paper.view.draw();
    }

    function drawBg() {
        let rect = new Rectangle(new Point(0, 0), paper.view.viewSize);
        let rectPath = new Path.Rectangle(rect);
        rectPath.fillColor = "#7f7f7f";  
        rectPath.sendToBack();  
    }

}

window.onload = main;
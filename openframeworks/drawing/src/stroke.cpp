#include "stroke.h"

stroke :: stroke() {
    strokeSize = 10;
    strokeColor = ofColor(0);
    smoothReps = 10;
    splitReps = 2;
}

stroke :: stroke(ofColor c) {
    strokeColor = c;
    strokeSize = 10;
    smoothReps = 10;
    splitReps = 2;
}

stroke :: stroke(float s) {
    strokeColor = ofColor(0);
    strokeSize = s;
    smoothReps = 10;
    splitReps = 2;
}

stroke :: stroke(ofColor c, float s) {
    strokeColor = c;
    strokeSize = s;
    smoothReps = 10;
    splitReps = 2;
}

void stroke :: update() {
    //
}

void stroke :: draw() {
    ofNoFill();
    ofBeginShape();
    for (int i=0; i<points.size(); i++) {
        ofSetLineWidth(strokeSize);
        ofSetColor(strokeColor);
        ofVertex(points[i] -> x, points[i] -> y, points[i] -> z);
    }
    ofEndShape();
}

void stroke :: run() {
    update();
    draw();
}

void stroke :: splitStroke() {
    for (int i = 1; i < points.size(); i+=2) {
        ofVec3f center = *points[i];
        ofVec3f lower = *points[i-1];
        float x = (center.x + lower.x) / 2;
        float y = (center.y + lower.y) / 2;
        float z = (center.z + lower.z) / 2;
        ofVec3f p = ofVec3f(x, y, z);
        //points.insert(points.begin() + i, &p);
    }
}

void stroke :: smoothStroke() {
    float weight = 18;
    float scale = 1.0 / (weight + 2);
    int nPointsMinusTwo = points.size() - 2;
    ofVec3f lower, upper, center;
    
    for (int i = 1; i < nPointsMinusTwo; i++) {
        lower = *points[i-1];
        center = *points[i];
        upper = *points[i+1];
        
        center.x = (lower.x + weight * center.x + upper.x) * scale;
        center.y = (lower.y + weight * center.y + upper.y) * scale;
        center.z = (lower.z + weight * center.z + upper.z) * scale;
        *points[i] = center;
    }
}

void stroke :: refine() {
    for (int i=0; i<splitReps; i++) {
        splitStroke();
        smoothStroke();
    }
    for (int i=0; i<smoothReps - splitReps; i++) {
        smoothStroke();
    }
}

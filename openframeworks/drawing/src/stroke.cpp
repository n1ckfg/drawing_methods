#include "stroke.h"

stroke :: stroke() {
    //
}

stroke :: stroke(ofColor c) {
    strokeColor = c;
}

stroke :: stroke(float s) {
    strokeSize = s;
}

stroke :: stroke(ofColor c, float s) {
    strokeColor = c;
    strokeSize = s;
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
    vector<ofVec3f *> newPoints;
    for (int i = 1; i < points.size(); i += 2) {
        ofVec3f center = *points[i];
        ofVec3f lower = *points[i-1];
        float x = (center.x + lower.x) / 2;
        float y = (center.y + lower.y) / 2;
        float z = (center.z + lower.z) / 2;
        newPoints.push_back(points[i-1]);
        newPoints.push_back(new ofVec3f(x, y, z));
        newPoints.push_back(points[i]);
    }
    points.assign(newPoints.begin(), newPoints.end());
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

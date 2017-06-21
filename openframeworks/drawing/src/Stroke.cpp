#include "Stroke.h"

Stroke :: Stroke() {
    //
}

Stroke :: Stroke(ofColor c) {
    strokeColor = c;
}

Stroke :: Stroke(float s) {
    strokeSize = s;
}

Stroke :: Stroke(ofColor c, float s) {
    strokeColor = c;
    strokeSize = s;
}

void Stroke :: update() {
    //
}

void Stroke :: draw() {
    ofNoFill();
    ofSetLineWidth(strokeSize);
    ofSetColor(strokeColor);
    if (drawMesh) {
        ofMesh mesh;
        mesh.setMode(OF_PRIMITIVE_TRIANGLE_STRIP);
        for (int i=1; i<points.size(); i++) {
            ofVec3f thisPoint = points[i-1];
            ofVec3f nextPoint = points[i];
            
            ofVec3f direction = (nextPoint - thisPoint);
            float distance = direction.length();
            ofVec3f unitDirection = direction.getNormalized();
            ofVec3f toTheLeft = unitDirection.getRotated(-90, ofVec3f(0,0,1));
            ofVec3f toTheRight = unitDirection.getRotated(90, ofVec3f(0,0,1));
            
            float thickness = ofMap(distance, 0, 60, strokeSize, 2, true);
            ofVec3f leftPoint = thisPoint + toTheLeft * thickness;
            ofVec3f rightPoint = thisPoint + toTheRight * thickness;
            
            mesh.addVertex(ofVec3f(leftPoint.x, leftPoint.y, leftPoint.z));
            mesh.addVertex(ofVec3f(rightPoint.x, rightPoint.y, rightPoint.z));
        }
        mesh.draw();
    } else {
        ofBeginShape();
        for (int i=0; i<points.size(); i++) {
            ofVertex(points[i].x, points[i].y, points[i].z);
        }
        ofEndShape();
    }
}

void Stroke :: run() {
    update();
    draw();
}

void Stroke :: splitStroke() {
    vector<ofVec3f> newPoints;
    for (int i = 1; i < points.size(); i += 2) {
        ofVec3f center = points[i];
        ofVec3f lower = points[i-1];
        float x = (center.x + lower.x) / 2;
        float y = (center.y + lower.y) / 2;
        float z = (center.z + lower.z) / 2;
        newPoints.push_back(points[i-1]);
        newPoints.push_back(ofVec3f(x, y, z));
        newPoints.push_back(points[i]);
    }
    points.assign(newPoints.begin(), newPoints.end());
}

void Stroke :: smoothStroke() {
    float weight = 18;
    float scale = 1.0 / (weight + 2);
    int nPointsMinusTwo = points.size() - 2;
    ofVec3f lower, upper, center;
    
    for (int i = 1; i < nPointsMinusTwo; i++) {
        lower = points[i-1];
        center = points[i];
        upper = points[i+1];
        
        center.x = (lower.x + weight * center.x + upper.x) * scale;
        center.y = (lower.y + weight * center.y + upper.y) * scale;
        center.z = (lower.z + weight * center.z + upper.z) * scale;
        
        points[i] = center;
    }
}

void Stroke :: refine() {
    for (int i=0; i<splitReps; i++) {
        splitStroke();
        smoothStroke();
    }
    for (int i=0; i<smoothReps - splitReps; i++) {
        smoothStroke();
    }
}

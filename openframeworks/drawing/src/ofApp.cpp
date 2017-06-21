#include "ofApp.h"

//--------------------------------------------------------------
void ofApp :: setup() {
    //
}

//--------------------------------------------------------------
void ofApp :: update() {
    //
}

//--------------------------------------------------------------
void ofApp :: draw() {
    ofBackground(bgColor);
    if (ofGetMousePressed()) {
        if (strokes[strokes.size()-1].points.size() < 1 || ofDist(mouseX, mouseY, pmouseX, pmouseY) > 2) {
            if (pmouseX !=0 && pmouseY != 0) {
                strokes[strokes.size()-1].points.push_back(ofVec3f(mouseX, mouseY, 0));
            }
        }
    }
    
    for (int i=0; i<strokes.size(); i++) {
        strokes[i].run();
    }
    
    frameRateTitle();
    pmouseX = mouseX;
    pmouseY = mouseY;
}

//--------------------------------------------------------------
void ofApp :: frameRateTitle() {
    string s = ofToString(ofGetFrameRate(), 2) + "fps";
    ofSetWindowTitle(s);
}

//--------------------------------------------------------------
void ofApp :: keyPressed(int key) {
    strokes.clear();
}

//--------------------------------------------------------------
void ofApp :: keyReleased(int key) {

}

//--------------------------------------------------------------
void ofApp :: mouseMoved(int x, int y ) {

}

//--------------------------------------------------------------
void ofApp :: mouseDragged(int x, int y, int button) {

}

//--------------------------------------------------------------
void ofApp :: mousePressed(int x, int y, int button) {
    strokes.push_back(Stroke(fgColor));
}

//--------------------------------------------------------------
void ofApp :: mouseReleased(int x, int y, int button) {
    strokes[strokes.size()-1].refine();
}

//--------------------------------------------------------------
void ofApp :: mouseEntered(int x, int y) {

}

//--------------------------------------------------------------
void ofApp :: mouseExited(int x, int y) {

}

//--------------------------------------------------------------
void ofApp :: windowResized(int w, int h) {

}

//--------------------------------------------------------------
void ofApp :: gotMessage(ofMessage msg) {

}

//--------------------------------------------------------------
void ofApp :: dragEvent(ofDragInfo dragInfo) { 

}

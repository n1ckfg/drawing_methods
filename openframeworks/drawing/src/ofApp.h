#pragma once

#include "ofMain.h"
#include "Stroke.h"

class ofApp : public ofBaseApp {

	public:
		void setup();
		void update();
		void draw();

		void keyPressed(int key);
		void keyReleased(int key);
		void mouseMoved(int x, int y );
		void mouseDragged(int x, int y, int button);
		void mousePressed(int x, int y, int button);
		void mouseReleased(int x, int y, int button);
		void mouseEntered(int x, int y);
		void mouseExited(int x, int y);
		void windowResized(int w, int h);
		void dragEvent(ofDragInfo dragInfo);
		void gotMessage(ofMessage msg);
		
        void frameRateTitle();
    
        int pmouseX = 0;
        int pmouseY = 0;
    
        vector<Stroke> strokes;
    
        ofColor bgColor = ofColor(127);
        ofColor fgColor = ofColor(0, 200);
    
};

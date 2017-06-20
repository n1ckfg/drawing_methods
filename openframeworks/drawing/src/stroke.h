#pragma once
#include "ofMain.h"

class stroke {
    
    public:
        stroke();
        stroke(ofColor c);
        stroke(float s);
        stroke(ofColor c, float s);
        virtual ~stroke(){};

        void update();
        void draw();
        void run();
        void splitStroke();
        void smoothStroke();
        void refine();
    
        vector <ofVec3f *> points;
        float strokeSize = 10.0;
        ofColor strokeColor = ofColor(0);
        int splitReps = 2;
        int smoothReps = 10;
        bool drawMesh = true;

};

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
        float strokeSize;
        ofColor strokeColor;
        int splitReps;
        int smoothReps;

};

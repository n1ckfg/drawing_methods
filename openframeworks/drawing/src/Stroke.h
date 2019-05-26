#pragma once
#include "ofMain.h"

class Stroke {
    
    public:
        Stroke();
        Stroke(ofColor c);
        Stroke(float s);
        Stroke(ofColor c, float s);
        Stroke(ofTexture &_tex);
        Stroke(ofColor c, ofTexture &_tex);
        Stroke(float s, ofTexture &_tex);
        Stroke(ofColor c, float s, ofTexture &_tex);
        virtual ~Stroke(){};

        void run();
        void splitStroke();
        void smoothStroke();
        void refine();
    
        vector <ofVec3f> points;
        float strokeSize = 10.0;
        ofColor strokeColor = ofColor(0);
        int splitReps = 2;
        int smoothReps = 10;
        bool drawMesh = true;
        bool useTexture = true;
        ofTexture tex;

};

class Stroke {

  ArrayList<PVector> points;
  float strokeSize = 10;
  color strokeColor = color(0);
  int smoothReps = 10;
  int splitReps = 2;
  
  Stroke() {
    points = new ArrayList<PVector>();
  }

  Stroke(color c) {
    points = new ArrayList<PVector>();
    strokeColor = c;
  }

  Stroke(float s) {
    points = new ArrayList<PVector>();
    strokeSize = s;
  }
  
  Stroke(color c, float s) {
    points = new ArrayList<PVector>();
    strokeColor = c;
    strokeSize = s;
  }
  
  void update() {
    //
  }

  void draw() {
    noFill();
    beginShape();
    for (int i=0; i<points.size(); i++) {
      PVector p = points.get(i);
      strokeWeight(strokeSize);
      stroke(strokeColor);
      vertex(p.x, p.y, p.z);
    }
    endShape();
  }

  void run() {
    update();
    draw();
  }

  void smoothStroke() {
        float weight = 18;
        float scale = 1.0 / (weight + 2);
        int nPointsMinusTwo = points.size() - 2;
        PVector lower, upper, center;

        for (int i = 1; i < nPointsMinusTwo; i++) {
            lower = points.get(i-1);
            center = points.get(i);
            upper = points.get(i+1);

            center.x = (lower.x + weight * center.x + upper.x) * scale;
            center.y = (lower.y + weight * center.y + upper.y) * scale;
        }
  }

  void splitStroke() {
    for (int i = 1; i < points.size(); i+=2) {
      PVector center = points.get(i);
      PVector lower = points.get(i-1);
      float x = (center.x + lower.x) / 2;
      float y = (center.y + lower.y) / 2;
      float z = (center.z + lower.z) / 2;
      PVector p = new PVector(x, y, z);
      points.add(i, p);
    }
  }

  void refine() {
    for (int i=0; i<splitReps; i++) {
      splitStroke();  
      smoothStroke();  
    }
    for (int i=0; i<smoothReps - splitReps; i++) {
      smoothStroke();    
     }
  }
  
}
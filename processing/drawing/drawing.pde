ArrayList<Stroke> strokes = new ArrayList<Stroke>();

color bgColor = color(127);
color fgColor = color(0);

void setup() {
  size(1280, 720, P3D);
  strokeJoin(ROUND);
  strokeCap(ROUND);
}

void draw() {
  background(bgColor);
  if (mousePressed) {
    Stroke s = strokes.get(strokes.size()-1);
    if (s.points.size() < 1 || dist(mouseX, mouseY, pmouseX, pmouseY) > 2) {
      s.points.add(new PVector(mouseX, mouseY, 0));
    }
  }

  for (int i=0; i<strokes.size(); i++) {
    strokes.get(i).run();
  }

  surface.setTitle(""+frameRate);
}


void keyPressed() {
  strokes = new ArrayList<Stroke>();
}

void mousePressed() {
  strokes.add(new Stroke(fgColor));
}

void mouseReleased() {
  strokes.get(strokes.size()-1).refine();
}
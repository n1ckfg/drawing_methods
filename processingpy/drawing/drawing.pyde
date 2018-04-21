from Stroke import *

strokes = []
bgColor = color(127)
fgColor = color(0)

def setup():
  size(1280, 720, P3D)
  strokeJoin(ROUND)
  strokeCap(ROUND)

def draw():
  background(bgColor)
  if (mousePressed):
    s = strokes[len(strokes)-1]
    if (len(s.points) < 1 or dist(mouseX, mouseY, pmouseX, pmouseY) > 2):
      s.points.append(PVector(mouseX, mouseY, 0))

  for st in strokes:
    st.run()

  #surface.setTitle(""+frameRate)



def keyPressed():
  strokes = []


def mousePressed():
  strokes.append(Stroke(fgColor))


def mouseReleased():
  strokes[len(strokes)-1].refine()

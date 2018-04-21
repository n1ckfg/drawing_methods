class Stroke(object):

  '''
  Stroke():
    points = new ArrayList<PVector>()
  '''
  
  def __init__(self, c):
    self.points = []
    self.strokeSize = 10
    self.strokeColor = color(0)
    self.smoothReps = 10
    self.splitReps = 2
    self.strokeColor = c

  '''
  Stroke(s):
    points = new ArrayList<PVector>()
    strokeSize = s
  
  Stroke(color c, s):
    points = new ArrayList<PVector>()
    strokeColor = c
    strokeSize = s
  '''
    
  def update(self):
    pass

  def draw(self):
    noFill()
    beginShape()
    for i in range(0, len(self.points)):
      p = self.points[i]
      strokeWeight(self.strokeSize)
      stroke(self.strokeColor)
      vertex(p.x, p.y, p.z)
    
    endShape()

  def run(self):
    self.update()
    self.draw()

  def smoothStroke(self):
        weight = 18
        scale = 1.0 / (weight + 2)
        nPointsMinusTwo = len(self.points) - 2
        lower = 0
        upper = 0
        center = 0

        for i in range(1, nPointsMinusTwo):
            lower = self.points[i-1]
            center = self.points[i]
            upper = self.points[i+1]

            center.x = (lower.x + weight * center.x + upper.x) * scale
            center.y = (lower.y + weight * center.y + upper.y) * scale
        
  def splitStroke(self):
    for i in range(1, len(self.points), 2):
      center = self.points[i]
      lower = self.points[i-1]
      x = (center.x + lower.x) / 2
      y = (center.y + lower.y) / 2
      z = (center.z + lower.z) / 2
      p = PVector(x, y, z)
      self.points.insert(i, p)

  def refine(self):
    for i in range(0, self.splitReps):
      self.splitStroke()  
      self.smoothStroke()  
    
    for i in range(0, self.smoothReps - self.splitReps):
      self.smoothStroke()    
     
  
  

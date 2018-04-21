class Stroke(object):

  def __init__(self, c=color(0), s=10):
    self.points = []
    self.strokeSize = s
    self.smoothReps = 10
    self.splitReps = 2
    self.strokeColor = c
   
  def update(self):
    pass

  def draw(self):
    noFill()
    beginShape()
    for pt in self.points:
      strokeWeight(self.strokeSize)
      stroke(self.strokeColor)
      vertex(pt.x, pt.y, pt.z)
    
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
     
  
  

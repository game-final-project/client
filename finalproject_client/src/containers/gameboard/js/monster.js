export default function monster(p, x, y) {
     let cordX = x
     let cordY = y
  
    p.display = function () {
      p.stroke(0,255,0)
      p.ecllipse(255, 100)
      p.image( p.image1, cordX, cordY, 48, 48)
    }
  
    p.update = function () {
      cordY = cordY + 1
    }
  }

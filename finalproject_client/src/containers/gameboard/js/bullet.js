export default function bullet(p, x, y) {
  let cordX = x
  let cordY = y

  p.display = function() {
    p.stroke(255)
    p.fill(255, 0, 0)
    p.ellipse(cordX, cordY, 2, 2)
  }

  p.update = function() {
    cordY -= 20
  }
}

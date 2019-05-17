export default function Particles(p, x, y, xDir, yDir) {
  let cordX = x
  let cordY = y
  let dirX = xDir
  let dirY = yDir

  p.display = function() {
    p.stroke(255)
    p.fill(255, 0, 0)
    p.ellipse(cordX, cordY, 1, 1)
  }

  p.update = function() {
    if (dirX === 'PLUS') {
      cordX += p.random(0, 100)
    } else if (dirX === 'MIN') {
      cordX -= p.random(0, 100)
    }
    if (dirY === 'PLUS') {
      cordY += p.random(0, 100)
    } else if (dirY === 'MIN') {
      cordY -= p.random(0, 100)
    }
  }
}

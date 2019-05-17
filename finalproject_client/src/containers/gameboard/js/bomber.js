export default function Bomber(p, x, y) {
  let cordX = x
  let cordY = y

  p.display = function() {
    p.image(p.image2, cordX, cordY, 48, 48)
  }

  p.update = function(moveX, moveY) {
    cordX = moveX
    cordY = moveY
  }
}

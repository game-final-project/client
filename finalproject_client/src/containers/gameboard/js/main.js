export default function sketch (p) {
  const width = window.screen.width / 2
  const heigth = 400
  let direction = ''

  const monsters = []
  const bullets = []

  class Monster {
    constructor(x, y) {
      this.x = x
      this.y = y
    }
  
    display() {
      p.stroke(0, 255, 0)
      p.fill(255, 100)
      p.ellipse( this.x, this.y, 48, 48)
    }
  
    update() {
      this.y = this.y + 1
    }
  }

  class Bullet {
    constructor(x, y) {
      this.x = x
      this.y = y
    }
  
    display() {
      p.stroke(255)
      p.fill(255,0,0)
      p.ellipse(this.x, this.y, 2, 2)
    }
  
    update() {
      this.y -= 20
    }
  }

  class Hero {
    constructor(x, y) {
      this.x = x
      this.y = y
    }

    display() {
      p.fill(255,255,0)
      p.rect(this.x, this.y, 48, 48)
    }

    update(x) {
      if(x === 'RIGHT') {
        this.x += 1
      } else if( x === 'LEFT') {
        this.x -= 1
      }
    }
  }

  const hero = new Hero(width/ 2, heigth - 60)

  p.setup = () => {
    p.createCanvas(width, heigth)

    p.myCustomRedrawAccordingToNewPropsHandler = function(newProps){
      if (newProps.ready) {
        if(newProps.direction){
           direction = newProps.direction
        }
      }
  }

  }

  p.mousePressed = () => {

    // monsters.push(new Monster(p.random(10, width-10), 25))

   

    console.log(bullets)
  }

  p.draw = () => {

    if(direction === 'UP') {
      bullets.push(new Bullet(hero.x + 24, hero.y))

    }


    p.background(0)
    monsters.forEach( (monster, idxMonster) => {
      monster.update()
      monster.display()
      if(monster.y >= heigth) {
        monsters.splice(idxMonster, 1)
      }
    })


    bullets.forEach( (bullet, bulletIdx) => {
      monsters.forEach( (mon, monIdx) => {
        const d = p.dist(mon.x, mon.y, bullet.x, bullet.y)
        if( d < 24) {
          console.log(mon)
          console.log(d)
          monsters.splice(monIdx, 1)
          bullets.splice(bulletIdx, 1)
        }
      })
      if(bullet.y <= 0) {
        bullets.splice(bulletIdx,1)
      }
      bullet.update()
      bullet.display()
    })

    hero.display()
    hero.update(direction)

  }  
}
import monster1 from '../images/mon1.gif'
import monster2 from '../images/mon2.png'
import hero1 from '../images/hero.png'

export default function sketch(p) {
  const width = window.screen.width / 2
  const heigth = 400
  let direction = ''
  let life = 3

  const monsters = []
  const bullets = []
  let time = 0
  let gameOver = false

  // game time
  let timer = function() {
    let interval = setInterval(() => {
      time++
      if (time % 10 === 0) {
        let totalEnemy = time / 10
        for (let i = 0; i <= totalEnemy; i++) {
          monsters.push(new Monster(p.random(10, width - 10)))
        }
      }
      if (gameOver) {
        clearInterval(interval)
      }
    }, 1000)
  }

  //class Monster
  class Monster {
    constructor() {
      this.x = p.random(10, width-10)
      this.y = 10
    }

    display() {
      p.stroke(0, 255, 0)
      p.fill(255, 100)
      p.image(p.image1, this.x, this.y, 48, 48)
    }

    update() {
      this.y += 0.5
    }
  }

  class Bullet {
    constructor(x, y) {
      this.x = x
      this.y = y
    }

    display() {
      p.stroke(255)
      p.fill(255, 0, 0)
      p.ellipse(this.x, this.y, 2, 2)
    }

    update() {
      this.y -= 5
    }
  }

  class Hero {
    constructor(x, y) {
      this.x = x
      this.y = y
    }

    display() {
      p.fill(255, 255, 0)
      p.image(p.image3, this.x, this.y, 48, 48)
    }

    // Hero direction with tensorflow 
    update(x) {
      if (x === 'RIGHT' && this.x <= 672) {
        this.x += 5
        console.log(width)
      } else if (x === 'LEFT' && this.x >= 0) {
        this.x -= 5
      }
    }
  }

  const hero = new Hero(width / 2, heigth - 60)

  p.preload = () => {
    // preload image
    p.image1 = p.loadImage(monster1)
    p.image2 = p.loadImage(monster2)
    p.image3 = p.loadImage(hero1)
  }

  p.setup = () => {
    // setting canvas width and height
    p.createCanvas(width, heigth)
    let state = false

    p.myCustomRedrawAccordingToNewPropsHandler = function(newProps) {
      if (newProps.ready) {
        if (newProps.direction) {
          direction = newProps.direction
        }
        if (!state) {
          state = true
          timer()
        }
      }
    }
  }

  p.draw = () => {
    if (life <= 0) {
      gameOver = true
      p.clear()
    }

    if (direction === 'UP') {
      bullets.push(new Bullet(hero.x + 24, hero.y))
    }
    p.background(0)
    if (monsters.length >= 30) {
      life = 0
      gameOver = true
    }
    monsters.forEach((monster, idxMonster) => {
      monster.update()
      monster.display()
      if (monster.y >= heigth) {
        monsters.splice(idxMonster, 1)
        life--
      }
    })

    bullets.forEach((bullet, bulletIdx) => {
      monsters.forEach((mon, monIdx) => {
        const d = p.dist(mon.x, mon.y, bullet.x, bullet.y)
        if (d < 24) {
          monsters.splice(monIdx, 1)
          bullets.splice(bulletIdx, 1)
        }
      })
      if (bullet.y <= 0) {
        bullets.splice(bulletIdx, 1)
      }
      bullet.update()
      bullet.display()
    })

    hero.display()
    hero.update(direction)
  }
}

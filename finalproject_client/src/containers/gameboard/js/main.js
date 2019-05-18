import monster1 from '../images/monster.png'
import monster2 from '../images/mon2.png'
import hero1 from '../images/hero.png'
import background1 from '../images/background.png'
import gameOver1 from '../images/gameover1.jpg'
import background2 from '../images/1390836051vzTCOXL.png'
import sword1 from '../images/sword.png'
import laser1Sound from '../sounds/laser1.wav'
import stab1Sound from '../sounds/stab1.wav'


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
    monsters.push(new Monster(p.random(10, width - 10)))
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
      p.stroke(255)
      p.fill(255)
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
      p.image(p.image4 ,this.x, this.y, 20, 30)
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
      } else if (x === 'LEFT' && this.x >= 0) {
        this.x -= 5
      }
      // this.x = p.mouseX
    }
  }

  // testing with mouse pressed
  // p.mousePressed = () => {
  //   bullets.push(new Bullet(hero.x, hero.y - 20))
  //   p.sound1.play()
  // }

  const hero = new Hero(width / 2, heigth - 60)

  p.preload = () => {
    //sounds
    p.sound1 = new Audio(laser1Sound)
    p.sound2 = new Audio(stab1Sound)


    //image
    p.image1 = p.loadImage(monster1)
    p.image2 = p.loadImage(monster2)
    p.image3 = p.loadImage(hero1)
    p.image4 = p.loadImage(sword1)
    p.image5 = p.loadImage(gameOver1)
  }

  p.setup = () => {
    // setting canvas width and height
    p.createCanvas(width, heigth)
    p.bg = p.loadImage(background2)
    let state = false

    p.myCustomRedrawAccordingToNewPropsHandler = function(newProps) {
      if(gameOver) {
        setTimeout(() => {
          newProps.replace('/endgame')
        }, 5000);
      }
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
    p.background(p.bg)
    if (life <= 0) {
      gameOver = true
      p.clear()
    }

    if (direction === 'UP' && !gameOver) {
      bullets.push(new Bullet(hero.x + 24, hero.y))
      p.sound1.play()
    }
    if (monsters.length >= 30) {
      life = 0
      gameOver = true
    }

    if(gameOver) {
      p.background(p.image5)
      monsters.splice(0, monsters.length)
      bullets.slice(0, bullets.length)
    }
    monsters.forEach((monster, idxMonster) => {
      bullets.forEach( (bull, idxBull) => {
        let d = p.dist(monster.x+24, monster.y, bull.x, bull.y)
        if( d <= 24) {
          monsters.splice(idxMonster, 1)
          bullets.splice(idxBull,1)
          p.sound2.play()
        }
      })
      monster.update()
      monster.display()
      if (monster.y >= heigth) {
        monsters.splice(idxMonster, 1)
        life--
      }
    })

    bullets.forEach((bullet, bulletIdx) => {
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

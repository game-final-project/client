//image
import monster1 from '../images/monster.png'
import monster2 from '../images/mon2.png'
import hero1 from '../images/hero.png'
import gameOver1 from '../images/gameover1.jpg'
import background2 from '../images/1390836051vzTCOXL.png'
import sword1 from '../images/sword.png'
import heart1 from '../images/heart2.png'
import monsterBoss1 from '../images/mon1.gif'
import bombImage from '../images/bomb.png'

//sound
import laser1Sound from '../sounds/laser1.wav'
import stab1Sound from '../sounds/stab1.wav'
import bossSound from '../sounds/boss2.wav'
import bossCome from '../sounds/bossCome.wav'
import healthSound1 from '../sounds/health1.wav'
import explodeBomb from '../sounds/explode1.mp3'
import timeBomb from '../sounds/timebomb.mp3'

//backsound
import backgroundSound from '../sounds/backsound1.mp3'

import axios from 'axios'


export default function sketch(p) {
  const width = 940
  const heigth = 650
  let direction = ''
  let life = 3
  let swordTime = 0
  const monsters = []
  const bosses = []
  const bullets = []
  let time = 0
  let gameOver = false
  let score = 0
  const baseUrl = 'http://35.247.190.168'
  let bosKill = 0
  let totalEnemy = 1
  let particleReady = 0

  // variable for shoot game
  let shoot = false
  let props = {}

  // game time
  let timer = function () {
    monsters.push(new Monster(p.random(10, width - 10)))
    let interval = setInterval(() => {
      time++
      if (time % 7 === 0) {
        totalEnemy++
        for (let i = 0; i < totalEnemy; i++) {
          monsters.push(new Monster(p.random(10, width - 10)))
        }
      }
      if (time % 13 === 0) {
        monsters.push(new Monster2(p.random(10, width - 10)))
      }
      if (time % 20 === 0) {
        p.sound8.play()
        bosses.push(new Boss(p.random(10, width - 10)))
      }
      if (time % 60 === 0) {
        dropLife.push(new LifeDrop(p.random(10, width - 10)))
      }

      if (gameOver) {
        clearInterval(interval)
      }
    }, 1000)
  }

  // class LifeDrop

  class LifeDrop {
    constructor(x) {
      this.x = x
      this.y = 60
    }

    display() {
      p.image(p.image6, this.x, this.y, 50, 50)
    }

    update() {
      this.y += 2.2
    }
  }

  class Particle {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.time = 0
    }

    lifeTime() {
      this.time++
    }

    display() {
      p.fill(255, 0, 0)
      p.stroke(255, 0, 0)
      p.rect(this.x, this.y, 1, 1)
    }

    update(dirX, dirY) {
      if (dirX === 'plus') {
        this.x += 5
      } else if (dirX === 'minus') {
        this.x += -5
      }

      if (dirY === 'plus') {
        this.y += 5
      } else if (dirY === 'minus') {
        this.y += -5
      }
    }
  }

  //class Monster
  class Monster {
    constructor() {
      this.x = p.random(30, width - 30)
      this.y = 40
      this.name = 'normal'
      this.score = 100
    }

    display() {
      p.image(p.image1, this.x, this.y, 48, 48)
    }

    update() {
      this.y += 0.09
    }
  }

  class Monster2 {
    constructor() {
      this.x = p.random(30, width - 30)
      this.y = 40
      this.name = 'blue monster'
      this.score = 500
    }

    display() {
      p.stroke(255)
      p.fill(255)
      p.image(p.image2, this.x, this.y, 48, 48)
    }

    update() {
      this.y += 1
    }
  }

  class Bomb {
    constructor(x, y) {
      this.x = x
      this.y = y
    }

    display() {
      p.image(p.image8, this.x, this.y, 20, 20)
    }

    update() {
      this.y -= 2
    }
  }

  class ShowBomb {
    constructor(x, y) {
      this.x = x
      this.y = y
    }

    display() {
      p.image(p.image8, this.x, this.y, 20, 20)
    }
  }

  class Boss {
    constructor() {
      this.x = p.random(30, width - 30)
      this.y = 40
      this.name = 'boss'
      this.health = 30
      this.score = 2000
    }

    display() {
      p.stroke(255)
      p.fill(255)
      p.image(p.image7, this.x, this.y, 48 * 3, 48 * 3)
    }

    update() {
      if (this.x <= 48 * 3) {
        this.x += p.random(0, 30)
      } else if (this.x >= width - 48 * 3) {
        this.x += p.random(-30, 0)
      } else {
        this.x += p.random(-5, 5)
      }

      this.y += 0.12
    }
  }

  class Life {
    constructor(x) {
      this.x = x
      this.y = 10
    }

    display() {
      p.image(p.image6, this.x, this.y, 20, 20)
    }
  }

  // container for lifes
  const totalLife = []

  //container drop Life
  const dropLife = []


  //container particles
  const particles = []

  //container bombs
  const boms = []

  //container show bombs
  const bombsShow = []

  for (let i = 0; i < particleReady; i++) {
    bombsShow.push(new ShowBomb((15 * i) + 65, heigth - 28))
  }

  //Sword class
  class Bullet {
    constructor(x, y) {
      this.x = x
      this.y = y
    }

    display() {
      p.stroke(255)
      p.fill(255, 0, 0)
      p.image(p.image4, this.x, this.y, 20, 30)
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
      if (x === 'RIGHT' && this.x <= width - 50) {
        this.x += 5
      } else if (x === 'LEFT' && this.x >= 0) {
        this.x -= 5
      }
      //Testing with mouse movement
      // this.x = p.mouseX
    }
  }

  // Testing with mouse pressed
  // p.mousePressed = () => {
  // bullets.push(new Bullet(hero.x, hero.y - 20))
  // bombsShow.pop()
  // }

  const hero = new Hero(width / 2, heigth - 110)

  p.preload = () => {
    //sounds
    p.sound1 = new Audio(laser1Sound)
    p.sound2 = new Audio(stab1Sound)
    p.sound3 = new Audio(backgroundSound)
    p.sound4 = new Audio(bossSound)
    p.sound5 = new Audio(healthSound1)
    p.sound6 = new Audio(explodeBomb)
    p.sound7 = new Audio(timeBomb)
    p.sound8 = new Audio(bossCome)

    //image
    p.image1 = p.loadImage(monster1)
    p.image2 = p.loadImage(monster2)
    p.image3 = p.loadImage(hero1)
    p.image4 = p.loadImage(sword1)
    p.image5 = p.loadImage(gameOver1)
    p.image6 = p.loadImage(heart1)
    p.image7 = p.loadImage(monsterBoss1)
    p.image8 = p.loadImage(bombImage)
  }

  p.setup = () => {

    setTimeout(() => {
      p.sound3.play()
    }, 2000);


    // setting canvas width and height
    p.createCanvas(width, heigth)
    p.bg = p.loadImage(background2)
    let state = false

    p.myCustomRedrawAccordingToNewPropsHandler = async (newProps) => {
      props = newProps
      try {
        if (gameOver) {
          let state = false
          let myScore = localStorage.getItem('score')
          if (score > myScore && !state) {
            state = true
            await axios({
              method: 'put',
              url: baseUrl + '/users/' + localStorage.getItem('id'),
              data: {
                username: localStorage.getItem('username'),
                email: localStorage.getItem('email'),
                password: localStorage.getItem('password'),
                score: score
              },
              headers: {
                token: localStorage.getItem('token')
              }
            })
            await localStorage.setItem('score', score)
          }
          setTimeout(() => {
            props.disposeClass()
            p.sound3.pause()
            p.sound3.currentTime = 0
            newProps.replace('/Leaderboard')
          }, 3000);
        }
        if (newProps.ready) {
          if (newProps.direction) {
            direction = newProps.direction
          }
          if (!state) {
            state = true
            timer()
          }

          // audio game
          if (newProps.prediction === 'UP') {
            shoot = true
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    for (let i = 1; i <= life; i++) {
      totalLife.push(new Life(i * 20))
    }
  }

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const randomDirection = () => {
    const direction = ['plus', 'minus']
    return direction[randomNumber(0, direction.length)]
  }


  p.draw = () => {
    // background Image

    p.background(p.bg)
    p.textFont('Bangers')
    p.textSize(16)
    p.fill(0)
    p.text('Monsters : ' + monsters.length, 20, heigth - 30)

    p.textFont(32)
    p.text(time, width / 2, 30)

    p.textSize(32);
    p.fill(0);
    p.text('score : ' + score, width - 50 - (score.toString().length * 10), 30);

    p.textSize(32)
    p.fill(0)
    p.text(particleReady === 0 ? ('BOMB : 0') : ('BOMB : '), 20, heigth - 10);

    bombsShow.forEach(bomb => {
      bomb.display()
    })


    //start here
    particles.forEach((part, idx) => {
      monsters.forEach((mon, monIdx) => {
        let d = p.dist(part.x, part.y, mon.x + 24, mon.y)
        if (d < 24) {
          particles.splice(idx, 1)
          score += mon.score
          monsters.splice(monIdx, 1)
        }
      })

      part.update(randomDirection(), randomDirection())
      part.lifeTime()
      part.display()
      if (part.time >= 25) {
        particles.splice(idx, 1)
      }
    })

    totalLife.forEach(userLife => {
      if (life < totalLife.length) {
        totalLife.pop()
      }
      userLife.display()
    })

    dropLife.forEach((lifeEl, lifeIdx) => {
      let d = p.dist(hero.x, hero.y, lifeEl.x, lifeEl.y)

      if (d < 20) {
        dropLife.splice(lifeIdx, 1)
        life++
        totalLife.push(new Life(life * 20))
        p.sound5.play()
      }

      if (life.y >= heigth) {
        dropLife.splice(lifeIdx, 1)
      }

      lifeEl.update()
      lifeEl.display()
    })

    if (life <= 0) {
      bosses.splice(0)
      gameOver = true
      p.clear()
    }

    boms.forEach((bomb, bomIdx) => {
      monsters.forEach((mons, idxMon) => {
        let d = p.dist(mons.x + 24, mons.y, bomb.x, bomb.y)
        let distSound = p.dist(mons.x + 24, mons.y, bomb.x, bomb.y - 80)

        if (distSound < 24) {
          p.sound7.play()
        }
        if (d <= 24) {
          boms.splice(bomIdx, 1)
          for (let i = 0; i < 50; i++) {
            particles.push(new Particle(mons.x + 24, mons.y))
          }
          p.sound6.play()
        }
      })

      if (bomb.y <= 0) {
        boms.splice(bomIdx, 1)
      }

      bomb.update()
      bomb.display()
    })

    let range = new Date()
    let n = range.getMilliseconds()
    let goShoot = true
    if (n % 2 === 0 && goShoot) {
      if (direction === 'UP' && !gameOver && swordTime === 0) {
        goShoot = false
        bullets.push(new Bullet(hero.x + 24, hero.y))
        p.sound1.play()
      }
      if (shoot === true && !gameOver && particleReady >= 1) {
        particleReady--
        boms.push(new Bomb(hero.x + 24, hero.y))
        bombsShow.pop()
        p.sound1.play()
        shoot = false
        props.resetState()
      }
    }

    if (monsters.length >= 60) {
      life = 0
      gameOver = true
    }

    if (gameOver) {
      p.background(p.image5)
      monsters.splice(0, monsters.length)
      bullets.slice(0, bullets.length)
    }
    monsters.forEach((monster, idxMonster) => {
      bullets.forEach((bull, idxBull) => {
        let d = p.dist(monster.x + 24, monster.y, bull.x, bull.y)
        if (d <= 24) {
          monsters.splice(idxMonster, 1)
          score += monster.score
          p.sound2.play()
          bullets.splice(idxBull, 1)
        }

        let distWithHero = p.dist(monster.x + 24, monster.y, hero.x, hero.y)
        if (distWithHero <= 24) {
          life--
        }

      })

      if (monster.y >= heigth - 110) {
        monsters.splice(idxMonster, 1)
        life--
      }

      monster.update()
      monster.display()
    })

    bosses.forEach((bos, idx) => {
      if (bos.y >= heigth - 110) {
        bosses.splice(idx, 1)
        life--
      }
      bullets.forEach((bull, jdx) => {
        let d = p.dist(bos.x + 48, bos.y, bull.x, bull.y)
        if (d < 48) {
          bos.health -= 1
          bullets.splice(jdx, 1)
          p.sound4.play()
          if (bos.health <= 0) {
            score += bos.score
            bosses.splice(idx, 1)
            bosKill++
            if (bosKill >= 3) {
              bosKill = 0
              particleReady++
              bombsShow.push(new ShowBomb((15 * bombsShow.length + 1) + 65, heigth - 28))
              props.setParticle()
            }
          }
        }
      })

      bos.update()
      bos.display()
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

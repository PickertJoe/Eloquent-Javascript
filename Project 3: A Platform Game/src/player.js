import Vec from './vec'

class Player {
  constructor(position, speed) {
    Object.assign(this, { position, speed })
    this.playerXSpeed = 7
    this.gravity = 30
    this.jumpSpeed = 17
  }

  get type() {
    return 'player'
  }

  static create(position) {
    return new Player(position.plus(new Vec(0, -0.5)), new Vec(0, 0))
  }

  update(time, state, keys) {
    let xSpeed = 0
    if (keys.ArrowLeft) xSpeed -= this.playerXSpeed
    if (keys.ArrowRight) xSpeed += this.playerXSpeed
    let position = this.position
    let movedX = position.plus(new Vec(xSpeed * time, 0))
    if (!state.level.touches(movedX, this.size, 'wall')) {
      position = movedX
    }
    let ySpeed = this.speed.y + time * this.gravity
    let movedY = position.plus(new Vec(0, ySpeed * time))
    if (!state.level.touches(movedY, this.size, 'wall')) {
      position = movedY
    } else if (keys.ArrowUp && ySpeed > 0) {
      ySpeed = -this.jumpSpeed
    } else {
      ySpeed = 0
    }
    return new Player(position, new Vec(xSpeed, ySpeed))
  }
}

Player.prototype.size = new Vec(0.8, 1.5)

export default Player

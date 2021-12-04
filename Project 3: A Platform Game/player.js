import Vec from './vec'

class Player {
  constructor(position, speed) {
    Object.assign(this, { position, speed })
  }

  get type() {
    return 'player'
  }

  static create(position) {
    return new Player(position.plus(new Vec(0, -0.5)), new Vec(0, 0))
  }
}

Player.prototype.size = new Vec(0.8, 1.5)

export default Player

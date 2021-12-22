import Vec from './vec'
import State from './state'
class Coin {
  constructor(position, basePosition, wobble) {
    Object.assign(this, { position, basePosition, wobble })
    this.wobbleSpeed = 8
    this.wobbleDist = 0.07
  }

  get type() {
    return 'coin'
  }

  static create(position) {
    const basePosition = position.plus(new Vec(0.2, 0.1))
    return new Coin(basePosition, basePosition, Math.random() * Math.PI * 2)
  }

  collide(state) {
    const filtered = state.actors.filter((a) => a != this)
    let { status } = state
    if (!filtered.some((a) => a.type === 'coin')) status = 'won'
    return new State(state.level, filtered, status)
  }

  update(time) {
    const wobble = this.wobble + time * this.wobbleSpeed
    const wobblePosition = Math.sin(wobble) * this.wobbleDist
    return new Coin(
      this.basePosition.plus(new Vec(0, wobblePosition)),
      this.basePosition,
      wobble
    )
  }
}

Coin.prototype.size = new Vec(0.6, 0.6)

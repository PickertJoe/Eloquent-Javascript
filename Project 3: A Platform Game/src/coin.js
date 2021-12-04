import Vec from './vec'

class Coin {
  constructor(pos, basePos, wobble) {
    Object.assign(this, { pos, basePos, wobble })
  }

  get type() {
    return 'coin'
  }

  static create(pos) {
    const basePos = pos.plus(new Vec(0.2, 0.1))
    return new Coin(basePos, basePos, Math.random() * Math.PI * 2)
  }
}

Coin.prototype.size = new Vec(0.6, 0.6)

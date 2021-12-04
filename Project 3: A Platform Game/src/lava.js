import Vec from './vec'

class Lava {
  constructor(pos, speed, reset) {
    Object.assign(this, { pos, speed, reset })
  }

  get type() {
    return 'lava'
  }

  static create(pos, ch) {
    if (ch === '=') {
      return new Lava(pos, new Vec(2, 0))
    } else if (ch === '|') {
      return new Lava(pos, new Vec(0, 2))
    } else if (ch === 'v') {
      return new Lava(pos, new Vec(0, 3), pos)
    }
  }
}

Lava.prototype.size = new Vec(1, 1)

export default Lava

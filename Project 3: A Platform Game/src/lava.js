import State from './state'
import Vec from './vec'

class Lava {
  constructor(positition, speed, reset) {
    Object.assign(this, { positition, speed, reset })
  }

  get type() {
    return 'lava'
  }

  static create(positition, ch) {
    if (ch === '=') {
      return new Lava(positition, new Vec(2, 0))
    } else if (ch === '|') {
      return new Lava(positition, new Vec(0, 2))
    } else if (ch === 'v') {
      return new Lava(positition, new Vec(0, 3), positition)
    }
  }

  collide(state) {
    return new State(state.level, state.actors, 'lost')
  }

  update(time, state) {
    const newPosition = this.positition.plus(this.speed.times(time))
    if (!state.level.touches(newPosition, this.size, 'wall')) {
      return new Lava(newPosition, this.speed, this.reset)
    } else if (this.reset) {
      return new Lava(this.reset, this.speed, this.reset)
    } else {
      return new Lava(this.positition, this.speed.times(-1))
    }
  }
}

Lava.prototype.size = new Vec(1, 1)

export default Lava

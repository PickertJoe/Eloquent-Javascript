import { overlap } from './helpers'

class State {
  constructor(level, actors, status) {
    Object.assign(this, { level, actors, status })
  }

  static start(level) {
    return new State(level, level.starActors, 'playing')
  }

  get player() {
    return this.actors.find((actor) => actor.type === 'player')
  }

  update(time, keys) {
    const actors = this.actors.map((actor) => {
      actor.update(time, this, keys)
    })

    let newState = new State(this.level, actors, this.status)

    if (newState.status != 'playing') return newState

    const player = newState.player
    if (this.level.touches(player.position, player.size, 'lava')) {
      return new State(this.level, actors, 'lost')
    }

    actors.forEach((actor) => {
      if (actor != player && overlap(actor, player)) {
        newState = actor.collide(newState)
      }
    })
    return newState
  }
}

export default State

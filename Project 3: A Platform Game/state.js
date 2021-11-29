class State {
  constructor (level, actors, status) {
    Object.assign(this, { level, actors, status })
  }

  static start (level) {
    return new State(level, level.starActors, 'playing')
  }

  get player () {
    return this.actors.find(actor => actor.type === 'player')
  }
}

export default State

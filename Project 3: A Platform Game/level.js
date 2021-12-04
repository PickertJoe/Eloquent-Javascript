import Vec from './vec'

class Level {
  constructor(plan) {
    const rows = plan
      .trim()
      .split('\n')
      .map((line) => [...line])
    this.height = rows.length
    this.width = rows[0].length
    this.startActors = []
    this.rows = rows.map((row, y) =>
      row.map((ch, x) => {
        const type = levelChars[ch]
        if (typeof type === 'string') return type
        this.startActors.push(type.create(new Vec(x, y), ch))
        return 'empty'
      })
    )
  }
}

export default Level

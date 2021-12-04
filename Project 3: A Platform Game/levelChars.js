import Lava from './lava'
import Coin from './coin'
import Player from './player'

const levelChars = {
  '.': 'empty',
  '#': 'wall',
  '+': 'lava',
  '@': Player,
  o: Coin,
  '=': 'Lava',
  '|': Lava,
  v: Lava
}

export default levelChars

export default {
  true: true,
  false: false,
  print: value => {
    console.log(value)
    return value
  },
  '+': (a, b) => {
    return a + b
  },
  '-': (a, b) => {
    return a - b
  },
  '*': (a, b) => {
    return a * b
  },
  '/': (a, b) => {
    return a / b
  },
  '==': (a, b) => {
    return a === b
  },
  '<': (a, b) => {
    return a < b
  },
  '>': (a, b) => {
    return a > b
  },
  array: (...values) => {
    return new Array(...values)
  },
  length: array => {
    return array.length
  },
  element: (array, n) => {
    return array[n]
  }
}

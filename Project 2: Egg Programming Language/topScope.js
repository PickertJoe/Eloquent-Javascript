export default {
  true: true,
  false: false,
  print: value => {
    console.log(value)
    return value
  },
  "+": (a, b) => {
    return a + b
  },
  "-": (a, b) => {
    return a - b
  },
  "*": (a, b) => {
    return a * b
  },
  "/": (a, b) => {
    return a / b
  },
  "==": (a, b) => {
    return a == b
  },
  "<": (a, b) => {
    return a < b
  },
  ">": (a, b) => {
    return a > b
  }
}
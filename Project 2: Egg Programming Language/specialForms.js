import { evaluate } from './evaluator.js'

export default {
  if: (args, scope) => {
    if (args.length !== 3) {
      throw new SyntaxError('Wrong number of args to if')
    } else if (evaluate(args[0], scope !== false)) {
      return evaluate(args[1], scope)
    } else {
      return evaluate(args[2], scope)
    }
  },
  while: (args, scope) => {
    if (args.length !== 2) {
      throw new SyntaxError('Wrong number of args to while')
    }
    while (evaluate(args[0], scope) !== false) {
      evaluate(args[1], scope)
    }

    return false
  },
  do: (args, scope) => {
    let value = false
    for (const arg of args) {
      value = evaluate(arg, scope)
    }
    return value
  },
  define: (args, scope) => {
    if (args.length !== 2 || args[0].type !== 'word') {
      throw new SyntaxError('Incorrect use of define')
    }
    const value = evaluate(args[1], scope)
    scope[args[0].name] = value
    return value
  },
  fun: (args, scope) => {
    if (!args.length) {
      throw new SyntaxError('Functions need a body')
    }
    const body = args[args.length - 1]
    const params = args.slice(0, args.length - 1).map(expr => {
      if (expr.type != 'word') {
        throw new SyntaxError('Paramaters must be words')
      }
      return expr.name
    })

    return function () {
      if (arguments.length !== params.length) {
        throw new TypeError('Wrong number of arguments')
      }
      const localScope = Object.create(scope)
      for (let i = 0; i < arguments.length; i++) {
        localScope[params[i]] = arguments[i]
      }
      return evaluate(body, localScope)
    }
  }
}

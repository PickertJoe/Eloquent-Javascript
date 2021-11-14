import specialForms from './specialForms.js'
import { parse } from './parser.js'
import topScope from './topScope.js'

export function evaluate (expr, scope) {
  if (expr.type === 'value') {
    return expr.value
  } else if (expr.type === 'word') {
    if (expr.name in scope) {
      return scope[expr.name]
    } else {
      throw new ReferenceError(`Undefined binding: ${expr.name}`)
    }
  } else if (expr.type === 'apply') {
    const { operator, args } = expr
    if (operator.type === 'word' && operator.name in specialForms) {
      return specialForms[operator.name](expr.args, scope)
    } else {
      const op = evaluate(operator, scope)
      if (typeof op === 'function') {
        return op(...args.map(arg => evaluate(arg, scope)))
      } else {
        throw new TypeError('Applying a non-function.')
      }
    }
  }
}

function run (program) {
  return evaluate(parse(program), Object.create(topScope))
}

const basicCodeToEvaluate = `
do(define(total, 0),
define(count, 1),
while(<(count, 11),
do(define(total, +(total, count)),
define(count, +(count, 1)))),
print(total))
`

const arrayCodeToEvaluate = `
do(define(myArray, array(1,2,3,4,5)),
print(myArray),
print(length(myArray)),
print(element(myArray, 2))
)
`

run(basicCodeToEvaluate)
run(arrayCodeToEvaluate)

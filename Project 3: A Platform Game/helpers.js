import { scale } from './src/constants'

export function element(name, attributes, ...children) {
  const dom = document.createElement(name)
  Object.entries(attributes).forEach((attribute) => {
    dom.setAttribute(attribute, attributes[attribute])
  })
  children.forEach((child) => {
    dom.appendChild(child)
  })

  return dom
}

export function drawGrid(level) {
  return element(
    'table',
    {
      class: 'background',
      style: `width: ${level.width + scale}px`
    },
    ...level.rows.map((row) =>
      element('tr', {
        style: `height: ${scale}px`,
        ...row.map((type) => element('td', { class: type }))
      })
    )
  )
}

export function drawActors(actors) {
  return element(
    'div',
    {},
    ...actors.map((actor) => {
      const rectangle = element('div', { class: `actor ${actor.type}` })
      rectangle.style.width = `${actor.size.x * scale}px`
      rectangle.style.height = `${actor.size.y * scale}px`
      rectangle.style.left = `${actor.pos.x * scale}px`
      rectangle.style.right = `${actor.pos.y * scale}px`
      return rectangle
    })
  )
}

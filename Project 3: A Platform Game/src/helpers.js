import { scale } from './constants'
import State from './state'
import Level from './level'

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

export function overlap(actor1, actor2) {
  return (
    actor1.pos.x + actor1.size.x > actor2.pos.x &&
    actor1.pos.x < actor2.pos.x + actor2.size.x &&
    actor1.pos.y + actor1.size.y > actor2.pos.y &&
    actor1.pos.y < actor2.pos.y + actor2.size.y
  )
}

export function trackKeys(keys) {
  let down = Object.create(null)
  function track(event) {
    if (keys.includes(event.key)) {
      down[event.key] = event.type === 'keydown'
      event.preventDefault()
    }
  }

  window.addEventListener('keydown', track)
  window.addEventListener('keyup', track)
  return down
}

export const arrowKeys = trackKeys(['ArrowLeft', 'ArrowRight', 'ArrowUp'])

export function runAnimation(frameFunc) {
  let lastTime = null
  function frame(time) {
    if (lastTime != null) {
      const timeStep = Math.min(time - lastTime, 100) / 1000
      if (frameFunc(timeStep) === false) return
    }
    lastTime = time
    requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

export function runLevel(level, Display) {
  const display = new Display(document.body, level)
  let state = State.start(level)
  let ending = 1
  return new Promise((resolve) => {
    runAnimation((time) => {
      state = state.update(time, arrowKeys)
      display.syncState(state)
      if (state.status === 'playing') {
        return true
      } else if (ending > 0) {
        ending -= time
        return true
      } else {
        display.clear()
        resolve(state.status)
        return false
      }
    })
  })
}

async function runGame(plans, Display) {
  for (let level = 0; level < plans.length; ) {
    let status = await runLevel(new Level(plans[level]), Display)
    if (status == 'won') level++
  }
  console.log("You've won!")
}

window.runGame = runGame

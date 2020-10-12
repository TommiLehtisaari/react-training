import facepaint from 'facepaint'

export const breakpoints = [480, 800, 960, 1200]

export const mq = facepaint(breakpoints.map((bp) => `@media(min-width: ${bp}px)`))

export type TransitionPoint = number | string

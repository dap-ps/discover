const humanise = (value, joiner = ' ') => {
  if (!value) {
    return ''
  }

  return value
    .split('_')
    .map(word => `${word[0]}${word.slice(1).toLowerCase()}`)
    .join(joiner)
}

export default humanise

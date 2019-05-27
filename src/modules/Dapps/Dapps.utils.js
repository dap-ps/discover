export const headerElements = () =>
  Array.from(document.querySelectorAll('.category-header'))

export const getYPosition = element => {
  let el = element
  let yPosition = 0

  while (el) {
    yPosition += el.offsetTop - el.scrollTop + el.clientTop
    el = el.offsetParent
  }

  return yPosition
}

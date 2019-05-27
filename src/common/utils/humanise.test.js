import humanise from './humanise'

describe('humanise', () => {
  test('it should transform a constant string for human reading', () => {
    const first = 'TEST'
    const second = 'ANOTHER_TEST'

    expect(humanise(first)).toEqual('Test')
    expect(humanise(second)).toEqual('Another Test')
  })

  test('it should handle being passed a null', () => {
    expect(humanise(null)).toEqual('')
  })

  test('it should handle being passed undefined', () => {
    expect(humanise()).toEqual('')
  })
})

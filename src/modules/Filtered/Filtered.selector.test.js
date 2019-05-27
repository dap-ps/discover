import filteredDapps from './Filtered.selector'

describe('filteredDapps', () => {
  const dapps = [
    {
      name: 'DAPP_1',
      category: 'CATEGORY_1',
    },
    {
      name: 'DAPP_2',
      category: 'CATEGORY_2',
    },
  ]

  test('it should return all the dapps when the category is not set', () => {
    // Given a state where the selected category is null
    const state = {
      dapps,
      selectedCategory: null,
    }

    // We expect to get back all the dapps
    expect(filteredDapps(state)).toEqual(dapps)
  })

  test('it should return only the matching dapps when the category is set', () => {
    // Given a state where the selected category is set
    const state = {
      dapps,
      selectedCategory: 'CATEGORY_1',
    }

    // We expect to get back only the matching dapps
    expect(filteredDapps(state)).toEqual([
      { name: 'DAPP_1', category: 'CATEGORY_1' },
    ])
  })
})

import * as Categories from '../data/categories'
import humanise from './humanise'

export default Object.entries(Categories).map(entry => ({
  key: entry[1],
  value: humanise(entry[1]),
}))

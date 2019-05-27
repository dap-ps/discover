import React from 'react'
import PropTypes from 'prop-types'
import categories from '../../common/utils/categories'
import styles from './Categories.module.scss'
import categoryImage from './Categories.utils'
import ViewAll from '../../common/components/ViewAll'

const Categories = props => {
  const { select } = props
  const handleClick = category => select(category)

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.headline}>Categories</h2>
        <ViewAll size="large" />
      </div>
      <div className={styles.categories}>
        {categories.map(category => (
          <button
            className={
              styles[category.key]
                ? [styles.category, styles[category.key]].join(' ')
                : styles.category
            }
            key={category.key}
            type="button"
            onClick={handleClick.bind(this, category.key)}
          >
            <img
              className={styles.icon}
              src={categoryImage(category.key)}
              alt="Category icon"
            />
            <p>{category.value}</p>
          </button>
        ))}
      </div>
    </>
  )
}

Categories.propTypes = {
  select: PropTypes.func.isRequired,
}

export default Categories

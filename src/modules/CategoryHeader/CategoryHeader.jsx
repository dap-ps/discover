import React from 'react'
import PropTypes from 'prop-types'
import humanise from '../../common/utils/humanise'
import styles from './CategoryHeader.module.scss'
import CategoryIcon from '../../common/components/CategoryIcon'

const CategoryHeader = props => {
  const { text, active } = props
  return (
    <div
      className={
        active ? [styles.header, styles.active].join(' ') : styles.header
      }
    >
      <div className={styles.icon}>
        <CategoryIcon category={text} />
      </div>
      <h2 className={styles.text}>{humanise(text)}</h2>
    </div>
  )
}

CategoryHeader.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
}

CategoryHeader.defaultProps = {
  active: false,
}

export default CategoryHeader

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './ViewAll.module.scss'

const ViewAll = props => {
  const { size } = props

  return (
    <Link className={[styles.url, styles[size]].join(' ')} to="/all">
      View all&nbsp;&rarr;
    </Link>
  )
}

ViewAll.propTypes = {
  size: PropTypes.string.isRequired,
}

export default ViewAll

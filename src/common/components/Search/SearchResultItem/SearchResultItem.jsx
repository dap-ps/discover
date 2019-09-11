import React from 'react'
import PropTypes from 'prop-types'
import ReactImageFallback from 'react-image-fallback'
import { DappModel } from '../../../utils/models'
import styles from './SearchResultItem.module.scss'
import icon from '../../../assets/images/icon.svg'

const SearchResultItem = props => {
  const { dapp } = props

  const { name, description, image, url } = dapp

  return (
    <div className={`${styles.container}`}>
      <div className={styles.imgWrapper}>
        <ReactImageFallback
          className={styles.image}
          src={image}
          fallbackImage={icon}
          alt="App icon"
        />
      </div>
      <div className={styles.column}>
        <>
          <h2 className={styles.header}>{name}</h2>
          <p
            className={styles.description}
            style={{ WebkitBoxOrient: 'vertical' }}
          >
            {description}
          </p>
          <a className={styles.link} href={{ url }}>
            {url}
            &nbsp;&rarr;
          </a>
        </>
      </div>
    </div>
  )
}

SearchResultItem.defaultProps = {
  visible: true,
}

SearchResultItem.propTypes = {
  dapp: PropTypes.shape(DappModel).isRequired,
  visible: PropTypes.bool,
}

export default SearchResultItem

import React from 'react'
import ReactImageFallback from 'react-image-fallback'
import styles from './FeatureDapps.module.scss'
import fallbackBanner from '../../assets/images/fallback.svg'
import icon from '../../assets/images/icon.svg'

const FeatureDapps = props => {
  return (
    <>
      <div className={styles.grid}>
        {props.featured.map((dapp, index) => (
          <a className={styles.dapp} key={index} href={dapp.url}>
            <div className={styles.bannerWrapper}>
              <ReactImageFallback
                src={dapp.banner}
                className={styles.banner}
                alt={`${dapp.name} banner`}
                fallbackImage={fallbackBanner}
              />
            </div>
            <div className={styles.dapp_details}>
              <ReactImageFallback
                className={styles.dapp_details__image}
                src={dapp.icon}
                alt={`${dapp.name} icon`}
                fallbackImage={icon}
              />
              <div>
                <p className={styles.dapp_details__header}>{dapp.name}</p>
                <span className={styles.dapp_details__description}>
                  {dapp.description}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  )
}

export default FeatureDapps

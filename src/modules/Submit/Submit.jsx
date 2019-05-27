import React from 'react'
import PropTypes from 'prop-types'
import ReactImageFallback from 'react-image-fallback'
import styles from './Submit.module.scss'
import Modal from '../../common/components/Modal'
import CategorySelector from '../CategorySelector/CategorySelector.picker'
import Slider from '../../common/components/Slider/Slider'
import CategoriesUtils from '../Categories/Categories.utils'
import Categories from '../../common/utils/categories'
import icon from '../../common/assets/images/icon.svg'
import sntIcon from '../../common/assets/images/SNT.svg'
import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css'

const getCategoryName = category =>
  Categories.find(x => x.key === category).value

class Submit extends React.Component {
  constructor(props) {
    super(props)
    this.imgCanvas = React.createRef()
    this.previousMoveX = 0
    this.previousMoveY = 0
    this.onInputName = this.onInputName.bind(this)
    this.onInputDesc = this.onInputDesc.bind(this)
    this.onInputUrl = this.onInputUrl.bind(this)
    this.onChangeImage = this.onChangeImage.bind(this)
    this.onChangeZoom = this.onChangeZoom.bind(this)
    this.onStartMove = this.onStartMove.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onEndMove = this.onEndMove.bind(this)
    this.onImgDone = this.onImgDone.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleSNTChange = this.handleSNTChange.bind(this)
  }

  componentDidUpdate() {
    const { img, imgControlZoom, imgControlX, imgControlY } = this.props
    if (img === '') return

    const canvas = this.imgCanvas.current
    if (canvas === null) return

    const ctx = canvas.getContext('2d')
    const imgNode = new Image()
    imgNode.onload = () => {
      const s = parseInt(
        Math.min(imgNode.width, imgNode.height) /
          ((imgControlZoom + 100) / 100),
        10,
      )
      const k = canvas.width / s
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(
        imgNode,
        0,
        0,
        imgNode.width,
        imgNode.height,
        imgControlX + (s - imgNode.width) * 0.5 * k,
        imgControlY + (s - imgNode.height) * 0.5 * k,
        imgNode.width * k,
        imgNode.height * k,
      )
    }
    imgNode.src = img
  }

  onInputName(e) {
    const { onInputName } = this.props
    onInputName(e.target.value)
  }

  onInputDesc(e) {
    const { onInputDesc } = this.props
    onInputDesc(e.target.value)
  }

  onInputUrl(e) {
    const { onInputUrl } = this.props
    onInputUrl(e.target.value)
  }

  onChangeImage(e) {
    const input = e.target
    const { files } = e.target
    if (files === 0) return

    const file = files[0]
    const fileReader = new FileReader()
    fileReader.onload = ev => {
      const { onImgRead } = this.props
      input.value = ''
      onImgRead(ev.target.result)
    }
    fileReader.readAsDataURL(file, 'UTF-8')
  }

  onChangeZoom(value) {
    const { onImgZoom } = this.props
    onImgZoom(value)
  }

  onStartMove() {
    const { onImgMoveControl } = this.props
    this.previousMoveX = -1
    this.previousMoveY = -1
    onImgMoveControl(true)
  }

  onMouseMove(e) {
    const { imgControlMove, imgControlX, imgControlY, onImgMove } = this.props
    if (!imgControlMove) return
    const x = imgControlX + e.movementX
    const y = imgControlY + e.movementY
    requestAnimationFrame(() => {
      onImgMove(x, y)
    })
  }

  onTouchMove(e) {
    const { imgControlMove, imgControlX, imgControlY, onImgMove } = this.props
    if (!imgControlMove) return

    const touch = e.touches[0]
    if (this.previousMoveX !== -1 && this.previousMoveY !== -1) {
      const x = imgControlX - (this.previousMoveX - touch.screenX)
      const y = imgControlY - (this.previousMoveY - touch.screenY)
      requestAnimationFrame(() => {
        onImgMove(x, y)
      })
    }

    this.previousMoveX = touch.screenX
    this.previousMoveY = touch.screenY
  }

  onEndMove() {
    const { onImgMoveControl } = this.props
    onImgMoveControl(false)
  }

  onImgDone() {
    const { onImgDone } = this.props
    const canvas = this.imgCanvas.current
    const imgBase64 = canvas.toDataURL('image/jpg')
    onImgDone(imgBase64)
  }

  onSubmit() {
    const { onSubmit, name, desc, url, img, category, sntValue } = this.props
    const dapp = {
      name,
      url,
      img,
      category,
      desc,
    }

    onSubmit(dapp, parseInt(sntValue, 10))
  }

  handleSNTChange(e) {
    const { value } = e.target
    if (value !== '' && /^[1-9][0-9]*$/.test(value) === false) return

    const intValue = value === '' ? 0 : parseInt(value, 10)
    if (intValue > 1571296) return

    const { onInputSntValue } = this.props
    onInputSntValue(value)
  }

  title() {
    const { visible_submit, imgControl } = this.props
    if (visible_submit)
      return imgControl ? 'Position and size your image' : 'Submit a Ðapp'
    return 'Ðapp rating'
  }

  render() {
    const {
      dapps,
      visible_submit,
      visible_rating,
      onClickClose,
      name,
      desc,
      url,
      img,
      category,
      imgControl,
      imgControlZoom,
      onImgCancel,
      onClickTerms,
      switchToRating,
      sntValue,
    } = this.props

    const canSubmit =
      name !== '' && desc !== '' && url !== '' && img !== '' && category !== ''

    const visible = visible_submit || visible_rating

    /* rating */
    let currentSNTamount = 0
    let dappsByCategory = []
    let catPosition = 0
    let afterVoteRating = null
    let afterVoteCategoryPosition = null

    if (visible_rating) {
      dappsByCategory = dapps.filter(dapp_ => dapp_.category === category)

      catPosition = dappsByCategory.length + 1
      if (sntValue !== '') {
        afterVoteRating = parseInt(sntValue, 10)
        afterVoteCategoryPosition = 1
        for (let i = 0; i < dappsByCategory.length; ++i) {
          if (dappsByCategory[i].sntValue < afterVoteRating) break
          afterVoteCategoryPosition++
        }
      }
    }

    return (
      <Modal
        visible={visible && window.location.hash === '#submit'}
        onClickClose={onClickClose}
        windowClassName={styles.modalWindow}
        contentClassName={
          imgControl || visible_rating ? styles.modalContentFullScreen : ''
        }
      >
        <div className={styles.title}>{this.title()}</div>
        {visible_submit && (
          <div className={imgControl ? styles.cntWithImgControl : ''}>
            <div className={imgControl ? styles.withImgControl : ''}>
              <div className={styles.block}>
                <div className={styles.labelRow}>
                  <span>Name of your Ðapp</span>
                </div>
                <input
                  className={styles.input}
                  placeholder="Name"
                  value={name}
                  onChange={this.onInputName}
                />
              </div>
              <div className={styles.block}>
                <div className={styles.labelRow}>
                  <span>A short description</span>
                  <span>{desc.length}/140</span>
                </div>
                <textarea
                  className={styles.input}
                  placeholder="Max 140 characters"
                  value={desc}
                  onChange={this.onInputDesc}
                />
              </div>
              <div className={styles.block}>
                <div className={styles.labelRow}>
                  <span>URL</span>
                </div>
                <input
                  className={styles.input}
                  placeholder="https://your.dapp.cool"
                  value={url}
                  onChange={this.onInputUrl}
                />
              </div>
              <div className={styles.block}>
                <div className={styles.labelRow}>
                  <span>Upload the logo or icon of your Ðapp</span>
                </div>
                <div className={styles.imgCnt}>
                  <span>Choose image</span>
                  <div
                    className={styles.imgHolder}
                    style={{ backgroundImage: `url(${img})` }}
                  />
                  <input
                    className={styles.uploader}
                    type="file"
                    onChange={this.onChangeImage}
                    accept=".jpg, .png"
                  />
                </div>
                <div className={styles.imgInfo}>
                  The image should be a square 1:1 ratio JPG or PNG file,
                  minimum size is 160 × 160 pixels. The image will be placed in
                  a circle
                </div>
              </div>
              <div className={styles.block}>
                <div className={styles.labelRow}>
                  <span>Category</span>
                </div>
                <CategorySelector
                  category={category === '' ? null : category}
                  className={`${styles.categorySelector} ${
                    category === '' ? styles.categorySelectorEmpty : ''
                  }`}
                />
              </div>
              <div className={`${styles.block} ${styles.blockSubmit}`}>
                <div className={styles.terms}>
                  By continuing you agree to our
                  <a onClick={onClickTerms}> Terms and Conditions.</a>
                </div>
                <button
                  className={styles.submitButton}
                  type="submit"
                  disabled={!canSubmit}
                  onClick={switchToRating}
                >
                  Continue
                </button>
              </div>
            </div>
            {imgControl && (
              <div className={styles.imgControl}>
                <div
                  className={styles.imgCanvasCnt}
                  onMouseDown={this.onStartMove}
                  onMouseMove={this.onMouseMove}
                  onMouseUp={this.onEndMove}
                  onMouseLeave={this.onEndMove}
                  onTouchStart={this.onStartMove}
                  onTouchMove={this.onTouchMove}
                  onTouchEnd={this.onEndMove}
                  onTouchCancel={this.onEndMove}
                >
                  <canvas
                    ref={this.imgCanvas}
                    className={styles.imgCanvas}
                    width="160"
                    height="160"
                  />
                </div>
                <div className={styles.controls}>
                  <div className={styles.slider}>
                    <div className={styles.minZoom} />
                    <Slider
                      min={0}
                      max={300}
                      value={imgControlZoom}
                      onChange={this.onChangeZoom}
                    />
                    <div className={styles.maxZoom} />
                  </div>
                  <div className={styles.actionsCnt}>
                    <button
                      className={`${styles.button} ${styles.cancelButton}`}
                      onClick={onImgCancel}
                    >
                      Cancel
                    </button>
                    <button
                      className={`${styles.button} ${styles.doneButton}`}
                      onClick={this.onImgDone}
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {visible_rating && (
          <>
            <div className={styles.dapp}>
              <ReactImageFallback
                className={styles.image}
                src={img}
                fallbackImage={icon}
                alt="App icon"
                width={24}
                height={24}
              />
              {name}
            </div>
            <div className={styles.items}>
              <div className={styles.itemRow}>
                <span className={styles.item}>
                  <img src={sntIcon} alt="SNT" width="24" height="24" />
                  {currentSNTamount.toLocaleString()}
                </span>
                {afterVoteRating !== null &&
                  afterVoteRating !== currentSNTamount && (
                    <span className={styles.greenBadge}>
                      {`${afterVoteRating.toLocaleString()} ↑`}
                    </span>
                  )}
              </div>
              <div className={styles.itemRow}>
                <span className={styles.item}>
                  <img
                    src={CategoriesUtils(category)}
                    alt={getCategoryName(category)}
                    width="24"
                    height="24"
                  />
                  {`${getCategoryName(category)} №${catPosition}`}
                </span>
                {afterVoteCategoryPosition !== null &&
                  afterVoteCategoryPosition !== catPosition && (
                    <span className={styles.greenBadge}>
                      {`№${afterVoteCategoryPosition} ↑`}
                    </span>
                  )}
              </div>
            </div>
            <div className={`${styles.inputArea} ${styles.inputAreaBorder}`}>
              <input
                type="text"
                value={sntValue}
                onChange={this.handleSNTChange}
                style={{ width: `${21 * Math.max(1, sntValue.length)}px` }}
              />
            </div>
            <div className={styles.footer}>
              <p className={styles.disclaimer}>
                SNT you spend to rank your DApp is locked in the store. You can
                earn back through votes, or withdraw, the majority of this SNT
                at any time.
              </p>
              <button type="submit" onClick={this.onSubmit}>
                {!sntValue || sntValue === '0'
                  ? 'Publish'
                  : 'Stake and Publish'}
              </button>
            </div>
          </>
        )}
      </Modal>
    )
  }
}

Submit.propTypes = {
  visible_submit: PropTypes.bool.isRequired,
  visible_rating: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  imgControl: PropTypes.bool.isRequired,
  imgControlZoom: PropTypes.number.isRequired,
  imgControlMove: PropTypes.bool.isRequired,
  imgControlX: PropTypes.number.isRequired,
  imgControlY: PropTypes.number.isRequired,
  sntValue: PropTypes.string.isRequired,
  onClickClose: PropTypes.func.isRequired,
  onInputName: PropTypes.func.isRequired,
  onInputDesc: PropTypes.func.isRequired,
  onInputUrl: PropTypes.func.isRequired,
  onImgRead: PropTypes.func.isRequired,
  onImgZoom: PropTypes.func.isRequired,
  onImgMoveControl: PropTypes.func.isRequired,
  onImgMove: PropTypes.func.isRequired,
  onImgCancel: PropTypes.func.isRequired,
  onImgDone: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onInputSntValue: PropTypes.func.isRequired,
  onClickTerms: PropTypes.func.isRequired,
  switchToRating: PropTypes.func.isRequired,
}

export default Submit

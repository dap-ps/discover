import React from 'react'
import PropTypes from 'prop-types'
import RCSlider from 'rc-slider'

import './Slider.scss'

const Slider = props => {
  const { min, max, value, onChange } = props

  return (
    <div className="slider">
      <RCSlider min={min} max={max} value={value} onChange={onChange} />
    </div>
  )
}

Slider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Slider

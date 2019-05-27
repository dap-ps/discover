import PropTypes from 'prop-types'

export const DappModel = {
  name: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.string,
  dateAdded: PropTypes.string,
  sntValue: PropTypes.number,
  categoryPosition: PropTypes.number,
}

export const DappListModel = PropTypes.arrayOf(PropTypes.shape(DappModel))

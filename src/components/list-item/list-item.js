import React from 'react'
import PropTypes from 'prop-types'
import { Item } from './list-item.css'

const ListItem = ({ children, as = 'span', size }) => {
  return (
    <Item size={size}>
      {children}
    </Item>
  )
}

Item.propTypes = {
  children: PropTypes.object.isRequired,
  size: PropTypes.oneOf(['large']),
}

export default ListItem

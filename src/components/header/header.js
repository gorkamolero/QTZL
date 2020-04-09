import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Container } from './header.css'
import Logo from 'components/logo'
import Nav from 'components/header/nav'
import AtlasNav from 'components/header/nav/atlasnav'

const Header = ({ title, variant }) => (
  <Container>
    <Link to="/">
      <Logo />
    </Link>

    {!variant ? (<Nav />) : null}

    {variant === 'atlas' && <AtlasNav />}
  </Container>
)

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header

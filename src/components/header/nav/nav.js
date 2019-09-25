import React from 'react'
import { Link } from 'gatsby'
import { Container } from './nav.css'

const Nav = () => (
  <Container>
    <ul>
      <li>
        <Link to="/">Music</Link>
      </li>
      <li>
        <Link to="/people">People</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
  </Container>
)

export default Nav

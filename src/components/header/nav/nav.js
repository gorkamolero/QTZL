import React from 'react'
import { Link } from 'gatsby'
import { Container } from './nav.css'

const Nav = () => (
  <Container>
    <ul>
      <li style={{
        opacity: '.3',
        pointerEvents: 'none'
      }}><span>(Work in Progress)</span></li>
      <li>
        <Link to="/artists">Artists</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
  </Container>
)

export default Nav

import React from 'react'
import { Link } from 'gatsby'
import { Container } from './nav.css'

const Nav = () => (
  <Container>
    <ul>
      <li>
        <Link to="/atlas">Atlas by QTZL</Link>
      </li>
      <li>
        <Link to="/">Music</Link>
      </li>
      <li>
        <Link to="/people">People</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <a href="https://connect.qtzl.space" rel="external">
          Connect
        </a>
      </li>
    </ul>
  </Container>
)

export default Nav

import React from 'react'
import { Link } from 'gatsby'
import { Container } from './nav.css'

const AtlasNav = () => (
  <Container>
    <ul>
      <li>
        <Link to="/atlas">← Back to Atlas</Link>
      </li>
      <li>
        <Link to="/">← Back to QTZL</Link>
      </li>
    </ul>
  </Container>
)

export default AtlasNav

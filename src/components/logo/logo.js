import React from 'react'
import styled from 'styled-components'
import MEDIA from 'helpers/mediaTemplates'
import qtzl from './QTZL_logo.png'

const LogoItem = styled.img`
  max-width: 5em;
`

const Logo = () => <LogoItem src={qtzl} />

export default Logo

import React from 'react'
import styled from 'styled-components'
import logo from './logoatlassin.png'
import { RingSpinner } from 'components/ringspinner'

const FullContainer = styled.main`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0; top: 0;
  background: rgba(15, 15, 15);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`

const Spinner = styled.div`
  position: absolute;
  left: 50%; top: 50%;
  transform: translate(-50%, -50%);
`

export default function loadingScreen() {
  return (
    <FullContainer>
      <img src={logo} alt="Atlas by QTZL" width="400" />
      <Spinner>
        <RingSpinner size={300} color="rgba(255, 255, 255, .02)" />
      </Spinner>
    </FullContainer>
  )
}

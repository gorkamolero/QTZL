import React from 'react'
import styled from 'styled-components'
import Top from 'images/MarcoMovil/Top.png'
import Left from 'images/MarcoMovil/Left.png'
import Right from 'images/MarcoMovil/Right.png'
import Bottom from 'images/MarcoMovil/Bottom.png'


const Marco = ({setIsLoaded}) => {

  // React.useEffect(() => setIsLoaded(), [])

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <img style={{ width: '100%' }} src={Top} alt="Top" />
        </div>

        <div
          style={{
            position: 'fixed',
            right: 0,
            top: '50%',
            height: '100%',
            transform: 'translateY(-50%)',
          }}
        >
          <img style={{ height: '100%' }} src={Right} alt="Right" />
        </div>
        <div
          style={{
            position: 'fixed',
            bottom: '-10px',
            width: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <img style={{ width: '100%' }} src={Bottom} alt="Bottom" />
        </div>
        <div
          style={{
            position: 'fixed',
            left: 0,
            top: '50%',
            height: '100%',
            transform: 'translateY(-50%)',
          }}
        >
          <img style={{ height: '100%' }} src={Left} alt="Left" />
        </div>
      </div>
    </>
  )
}

const AtlasLogo = styled.div`
  position: fixed;
  /* top: 6em; */
  left: 50vw;
  transform: translate(-45%,50%);
`

export default Marco
